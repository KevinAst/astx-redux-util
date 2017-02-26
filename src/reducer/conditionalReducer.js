'use strict';

import identity from 'lodash.identity';


/**
 * Create a higher-order reducer that conditionally executes one of
 * the supplied reducerFns, based on the conditionalFn() return
 * directive.
 * 
 * The **User Guide** discusses conditionalReducer() in more detail
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
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function conditionalReducer(conditionalFn, thenReducerFn, elseReducerFn=identity) {

  // TODO: consider validation of conditionalReducer() params

  // expose our new higher-order reducer
  // NOTE: For more info on he originalReducerState parameter, refer to the User Guide {@tutorial originalReducerState}
  return (state, action, originalReducerState) => conditionalFn(state, action, originalReducerState)
                                                    ? thenReducerFn(state, action, originalReducerState)
                                                    : elseReducerFn(state, action, originalReducerState);
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
 * originalReducerState} discussion of the User Guide.
 * 
 * @returns {truthy} A truthy value indicating which reducerFn is
 * executed ... truthy: thenReducerFn(), falsy: elseReducerFn().
 */
