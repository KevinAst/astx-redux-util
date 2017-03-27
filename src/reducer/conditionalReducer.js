import identity   from 'lodash.identity';
import isFunction from 'lodash.isfunction';
import verify     from '../util/verify';

/**
 * Create a higher-order reducer that conditionally executes one of
 * the supplied reducerFns, based on the conditionalFn() return
 * directive.
 * 
 * The **Dev Guide** discusses conditionalReducer() in more detail
 * (see {@tutorial conceptConditional}), and additional examples can
 * be found in {@tutorial conceptJoin} and {@tutorial fullExample}.
 *
 * @param {conditionalReducerCB} conditionalFn - a callback function
 * whose return value determines which reducerFn is executed
 * ... truthy: thenReducerFn(), falsy: elseReducerFn().
 *
 * @param {reducerFn} thenReducerFn - the "wrapped" reducer invoked
 * when conditionalFn returns truthy.
 *
 * @param {reducerFn} [elseReducerFn=identity] - the
 * optional "wrapped" reducer invoked when conditionalFn returns
 * falsy.  DEFAULT: [identity function](https://lodash.com/docs#identity)
 *
 * @param {InitialState} [initialState] - the optional fall-back state
 * value used during the state initialization boot-strap process.
 * 
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function conditionalReducer(conditionalFn, thenReducerFn, elseReducerFn=identity, initialState) {

  // validate params
  const check = verify.prefix('AstxReduxUtil.conditionalReducer() parameter violation: ');

  check(conditionalFn,             'conditionalFn argument is required');
  check(isFunction(conditionalFn), 'conditionalFn argument is NOT a function');
  check(thenReducerFn,             'thenReducerFn argument is required');
  check(isFunction(thenReducerFn), 'thenReducerFn argument is NOT a function');
  check(isFunction(elseReducerFn), 'elseReducerFn argument is NOT a function');

  // expose our new higher-order reducer
  // NOTE: For more info on he originalReducerState parameter, refer to the Dev Guide {@tutorial originalReducerState}
  return (state=initialState, action, originalReducerState) => {

    // maintain the originalReducerState as the immutable state
    // at the time of the start of the reduction process
    // ... in support of joinReducers()
    // ... for more info, refer to the Dev Guide {@tutorial originalReducerState}
    if (originalReducerState === undefined) {
      originalReducerState = state;
    }

    // execute either thenReducerFn or elseReducerFn, based on conditionalFn
    return conditionalFn(state, action, originalReducerState)
             ? thenReducerFn(state, action, originalReducerState)
             : elseReducerFn(state, action, originalReducerState);
  };

}



//***
//*** Specification: conditionalReducerCB
//***

/**
 * A callback function (used in {@link conditionalReducer}) whose
 * return value determines which reducerFn is executed.
 *
 * @callback conditionalReducerCB
 *
 * @param {*} state - The current immutable state that is the
 * reduction target.
 *
 * @param {Action} action - The standard redux Action object that
 * drives the reduction process.
 *
 * @param {*} originalReducerState - The immutable state at the time
 * of the start of the reduction process.
 *
 * This is useful in determining whether state has changed within a
 * series of reductions {@link joinReducers} ... because each
 * individual reducer only has visibility of the state within it's own
 * reduction process.
 * 
 * Further information can be found in the {@tutorial
 * originalReducerState} discussion of the Dev Guide.
 * 
 * @returns {truthy} A truthy value indicating which reducerFn is
 * executed ... truthy: thenReducerFn(), falsy: elseReducerFn().
 */
