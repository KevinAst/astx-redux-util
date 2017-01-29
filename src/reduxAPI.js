//***
//*** This file contains NO executable code, rather "JSDoc tags only", 
//*** providing more concise API documentation for redux expectations.
//***

'use strict';


//***
//*** Specification: reducerFn
//***

// TODO: consider reducerFn: defined with @function instead of @callback 
//       - @callback is hidden [NOT indexed] in GLOBAL, and appears under Type definitions
//       - while @function is promoted in the GLOBAL index, and appears with all other functions

/**
 * A standard [redux reducer function]{@link http://redux.js.org/docs/basics/Reducers.html}
 * that is responsible for state changes.
 *
 * @callback reducerFn
 * 
 * @param {*} state - The current immutable state that is the reduction target.
 * @param {Action} action - The standard redux action which drives the reduction process.
 * 
 * @returns {*} The resulting state after reduction.
 */



//***
//*** Specification: Action
//***

// TODO: consider Action: defined with @namespace/@property (promoted as NAMESPACES)
//                        - only bad thing is it insists on placing description at bottom
//                          (even when using @description)

/**
 * A standard [redux Action object]{@link http://redux.js.org/docs/basics/Actions.html}
 * that drives the reduction process.
 *
 * @namespace Action
 * @type Object
 *
 * @property {string|Symbol} type - The action type.
 * @property {*} whatever - Additional app-specific payload (as needed).
 */


// TODO: consider Action: defined with @interface (promoted as INTERFACES)

/*
 * A standard [redux Action object]{@link http://redux.js.org/docs/basics/Actions.html}
 * that drives the reduction process.
 * @interface Action
 */

/*
 * The action type.
 * @name Action#type
 * @type string|Symbol
 */

/*
 * Additional app-specific payload (as needed).
 * @name Action#whatever
 * @type *
 */
