import isFunction from 'lodash.isfunction';
import isArray    from 'lodash.isarray';
import verify     from '../util/verify';


/**
 * Wrap the supplied creatorFn (an HOF), **making all functions it
 * creates "patchable"**.  In essence, this provides the ability for a
 * patch to be applied to a series of functions (all functions created
 * by an HOF).
 *
 * This utility is used by authors to make their HOF's "patchable",
 * verses consumers who use the HOF "patching" API to apply patches
 * (see below).
 *
 * Higher-order functions (HOF) are classified as those that either
 * accept functional arguments, or return a function.  The latter is
 * what this utility is focused on.  For clarity, the following
 * terminology is used:
 *   - HOF:       higher-order function (a creatorFn alias)
 *   - creatorFn: a function that creates createdFns (an HOF alias)
 *   - createdFn: a function created by it's creatorFn
 * 
 * The HOF "patching" API is publicly available to the consumer by
 * functions located directly on the HOF (as properties of the function
 * itself).  The "patching" API includes:
 * 
 *  + hof.patchCreatedFns(newImpl): patchId
 *        WHERE:
 *         - newImpl(priorImpl, ...createdArgs): *
 *           ... a function implementing the patch, supplied:
 *                 - priorImpl .... a function representing the prior
 *                                  implementation (typically invoked in newImpl)
 *                 - createdArgs .. the run-time args supplied to the createdFn
 *         - return  .............. a patchId used to selectively clear patches
 * 
 *  + hof.patchCreatedFnsClear([patchId]): boolean
 *         WHERE:
 *          - patchId ............. the optional patchId to clear
 *                                  - can be an array of patchIds
 *                                  - if omitted, clears ALL patches
 *          - return  ............. a boolean indicator
 *                                  - true:  successful clear
 *                                  - false: patchId NOT found
 *
 * NOTES:
 *
 *  - Multiple patches are supported by using a function chaining
 *    process.
 *
 *  - Patches are applied to ALL createdFns regardless of when they
 *    were created.  In other words, an injected patch impacts
 *    functions created in the past and future.
 *
 *  - Clearing patches are accomplished in such a way as if they never
 *    existed. In other words, a mid-stream patch that is cleared (say
 *    2 out of 3) will cause the 3rd patch to reference the 1st
 *    patches priorImpl.
 * 
 * @param {hof} creatorFn - the higher-order creator function to make
 * "patchable" (see above).
 * 
 * @returns {hof} a wrapped creatorFn (HOF) that is "patchable" (see
 * above).
 * 
 * @private
 */
export default function makePatchableHOF(creatorFn) {

  //***
  //*** validate params
  //***

  const check = verify.prefix('makePatchableHOF() parameter violation: ');
  check(creatorFn,             'creatorFn argument is required');
  check(isFunction(creatorFn), 'creatorFn argument is NOT a function');


  //***
  //*** carve out state needed for our utility
  //***

  // next patch identifier
  let _nextPatchId = 1;

  // array of patches registered via patchCreatedFns()
  // ... NOTE: This is the "raw" patches, WITHOUT any createdFn applied.
  //           The createdFn is applied in the _rootedStackCache.
  // ... STRUCTURE:
  //       [
  //         {
  //           patchId: unique-identifier-for-this-patch,
  //           newImpl: (priorImpl, ...createdArgs): *
  //         },
  //         ...
  //       ]
  const _patches = [];

  // cache of fully resolved stack chain patches for EACH of our registered createdFn
  // ... keyed by createdFn.sym (a Symbol uniquely identifying rootFn)
  // ... STRUCTURE:
  //       _rootedStackCache[createdFn.sym]: (...createdArgs) => {funct-with-back-refs to priorImpl}
  let _rootedStackCache = {};


  //***
  //*** applyPatch(rootFn, ...rootArgs) ... internal helper that executes the supplied
  //***                                     rootFn (at run-time), dynamically applying
  //***                                     self's patches.
  //***    WHERE: 
  //***      - rootFn:   the base function to execute, and apply patches
  //***                  (same as createdFn)
  //***      - rootArgs: the run-time arguments passed to rootFn
  //***    RETURNS:
  //***      the result of rootFn invocation, with applied patches.
  //***

  const applyPatch = (rootFn, ...rootArgs) => {

    // locate our rootedStackCache, dynamically create/catalog on first usage
    let rootedStackCache = _rootedStackCache[rootFn.sym];
    if (!rootedStackCache) {
      // build up our entire stack chain of patches (seeded with the supplied rootFn)
      rootedStackCache = _rootedStackCache[rootFn.sym] = 
        _patches.reduce( (priorImpl, patch) => (...args) => patch.newImpl(priorImpl, ...args),
                         rootFn);
      // console.log('CREATING CACHE (PatchableHOF.applyPatch() crude VISUAL optimization check)');
    }
    // else {
    //   console.log('USING CACHE (PatchableHOF.applyPatch() crude VISUAL optimization check)');
    // }

    // indirectly invoke the supplied rootFn, after applying any registered patches
    return rootedStackCache(...rootArgs);
  };


  //***
  //*** wrap the supplied creatorFn, applying our patches to it's returned createdFn
  //***

  const creatorFnWrapper = (...creatorArgs) => {

    // execute our original creatorFn
    const createdFn = creatorFn(...creatorArgs);
    
    // insuring it returns a function
    const check = verify.prefix('makePatchableHOF ... run-time invocation of higher-order function is expected to ');
    check(isFunction(createdFn), `return a function ... but returned: ${createdFn}`);

    // wrap (and return) the newly createdFn to apply our patches
    createdFn.sym = Symbol(); // register a Symbol, which uniquely identifies this fn occurance
    return (...createdArgs) => applyPatch(createdFn, ...createdArgs);
  };


  //***
  //*** augment our creatorFn wrapper with the publicly accessible "patching" API
  //*** ... cataloged as properties of the creatorFnWrapper itself
  //*** ... see: docs (above)
  //***

  creatorFnWrapper.patchCreatedFns = (newImpl) => {
    const patchId = `patchId_${_nextPatchId++}`;
    _patches.push({ patchId, newImpl });
    _rootedStackCache = {}; // clear rootedStackCache, allowing it to be re-built with new patch
    return patchId;
  };

  creatorFnWrapper.patchCreatedFnsClear = (patchId) => {
    const patchIds = !patchId 
                   ? _patches.map((patch)=>patch.patchId)
                   : (isArray(patchId) ? patchId : [patchId]);
    let success = true;
    for (const patchId of patchIds) {
      const removeIndx = _patches.findIndex( (patch) => patch.patchId===patchId);
      if (removeIndx === -1) {
        success = false;
      }
      else {
        _patches.splice(removeIndx, 1); // remove entry
      }
    }
    // clear rootedStackCache, allowing it to be re-built, removing  patch(s)
    // ... do this 100% because our clear may be a partial success (i.e. some entries removed)
    _rootedStackCache = {};
    return success;
  };


  //***
  //*** expose our newly created creatorFn wrapper
  //***

  // beam me up Scotty!
  return creatorFnWrapper;
}




//***
//*** Specification: hof
//***

/**
 * A Higher-Order Function (the creatorFn), that when invoked returns
 * a function (the createdFn).
 *
 * @callback hof
 * 
 * @param {...*} [creatorArgs] - The arguments (if any) expected by the HOF.
 * 
 * @returns {function} The createdFn exposed by this HOF.
 * 
 * @private
 */



//***
//*** FUTURE User Guide Words (for astx-patch)
//***

/*
NOTE: This discussion is broader scoped than makePatchableHOF, and
      is intended to seed the User Guide of a (soon to be published)
      astx-patch utility.


Monkey Patching
===============

This utility employs a technique called "monkey patching" ... which is
the ability to alter the characteristics of an external component:

  - globally ... in the sense that the external component itself
    "appears to" promote the enhancement out-of-the-box, without the
    need to layer it in another wrapper

  - and without access to the internal implementation of the component

Patching is commonly used in in cross-cutting concerns ... such as
logging, or timing, etc.  This is natural, as it can really only
apply logic before/after the invocation of the original function.

Patching is considered by some as an anti-pattern, in that it can
be abused in altering behavior, and even bypassing the original
function altogether.  


Patching Basics
===============

In general, all patches are implemented by supplying a "newImpl"
function which is provided the "priorImpl" (along with the functions
run-time arguments):

  newImpl(priorImpl, ...args): *
    WHERE:
     - priorImpl ... a function representing the prior
                     implementation (typically invoked in newImpl)
     - args ........ the run-time arguments
     - return ...... the return of priorImpl (possibly augmented in some way)

AI: Discuss best practices
    - typically should invoke priorImpl
    - avoid side effects (elaborate)
    - more more more


Features
========

Features of astx-patch include:

 - Multiple patches are supported by using a function chaining
   process.
 
 - Patches are applied to ALL createdFns regardless of when they
   were created.  In other words, an injected patch impacts
   functions created in the past and future.
   AI: this may be only applicable to "makePatchableHOF"
 
 - Clearing of patches is supported ... accomplished in such a way as
   if they never existed. In other words, a mid-stream patch that is
   cleared (say 2 out of 3) will cause the 3rd patch to reference the
   1st patches priorImpl.


Patching Methods
================

Typically, in JavaScript, patching is associated to class methods.

Because methods are cataloged within the class's prototype, it
provides a central place to inject patches that globally alters the
behavior of all object instances of that class.

As a result, method patching (of objects) can be accomplished without any
"extension hook" being provided by the external component.

The astx-patch library provides a convenience utility to patch class
methods.
  AI: flesh this out further:
  + patchMethod(class, "methodName", newImpl(priorImpl, ...args))
    ... see what others are doing for this
        - ? allow methodName to be an array, or some indicator of itterable methods
        - ? support patchMethodClear(patchId)


Patchable Functions
===================

That however is not the case with functional utilities.  There is no
out-of-the-box way to globally patch a function.  Of course you can
promote a utility wrapper, but that is not global (i.e. you must use a
different "wrapped" utility).

In order for functional utilities to be "patchable", the author must
provide a hook that defines a "functional catalog" which can be
reset/patched.  This provides the same "patchable" characteristic of
the class prototype ... that is an extra level of indirection where
the function is cataloged, and can be reset to apply patches.

The makePatchable() utility is used by authors to make their exposed
functions patchable by consumers.

  AI: expand this when it is written (similar to Patchable HOFs - below).
  + makePatchable(fn): fn

It publicly exposes a "patching" API directly on the exposed
function (as properties of the function itself).  The "patching" API
includes:
 
 + fn.patch(newImpl): patchId
       WHERE:  AI: may want to reference newImpl discussion (above)
        - newImpl(priorImpl, ...args): *
          ... a function implementing the patch, supplied:
                - priorImpl ... a function representing the prior
                                implementation (typically invoked in newImpl)
                - args ........ the run-time args supplied to the function
        - return  ............. a patchId used to selectively clear patches
 
 + fn.patchClear([patchId]): boolean
        WHERE:
         - patchId ............. the optional patchId to clear
                                 - can be an array of patchIds
                                 - if omitted, clears ALL patches
         - return  ............. a boolean indicator
                                 - true:  successful clear
                                 - false: patchId NOT found


AI: provide examples


Patchable Higher-Order Functions
================================

Some functions are classified as Higher-Order Functions (HOF) in the
sense that they either accept functional arguments, or return a
function.  The latter is what we are interested in for this discussion.

HOFs add yet another twist to our patchable equation.  That is: How do
you globally patch the functions that are created from the HOF?

AI: do we need to pull in background discussion (currently found in
the discussion below)?

The makePatchableHOF() utility is used by authors to make the
functions created by their HOFs patchable by consumers.  In essence,
this provides the ability for a patch to be applied to a series of
functions (all functions created by an HOF).

  AI: clean this up
  + makePatchable(creatorFn): hof

It publicly exposes a "patching" API directly on the exposed HOF (as
properties of the function itself).  This "patching" API includes:

 + hof.patchCreatedFns(newImpl): patchId
       WHERE:
        - newImpl(priorImpl, ...createdArgs): * AI: may want to reference newImpl discussion (above)
          ... a function implementing the patch, supplied:
                - priorImpl .... a function representing the prior
                                 implementation (typically invoked in newImpl)
                - createdArgs .. the run-time args supplied to the createdFn
        - return  .............. a patchId used to selectively clear patches

 + hof.patchCreatedFnsClear([patchId]): boolean
        WHERE:
         - patchId ............. the optional patchId to clear
                                 - can be an array of patchIds
                                 - if omitted, clears ALL patches
         - return  ............. a boolean indicator
                                 - true:  successful clear
                                 - false: patchId NOT found


AI: provide examples

*/
