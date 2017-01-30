'use strict';

import poop from './nonExistant'; // ?? for some reason jsdoc will not output the doc for this module WITHOUT an import ... MAKES NO SENSE AT ALL

/**
 * Create a higher-order reducer that conditionally executes the
 * supplied reducerFn, when the conditionalFn returns truthy.
 *
 * **Examples** of conditionalReducer can be found in {@tutorial
 * conceptJoin} and {@tutorial fullExample}.
 *
 * @param {conditionalReducerCB} conditionalFn - a callback function
 * which determines when the supplied reducerFn will be executed.
 *
 * @param {reducerFn} reducerFn - the "wrapped" reducer function that
 * is conditionally executed.
 * 
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function conditionalReducer(conditionalFn, reducerFn) {

  // TODO: consider validation of conditionalReducer() params

  // expose our new higher-order reducer
  // ... which conditionally executes reducerFn(), when directed by conditionalFn()
  //     NOTE: For more info on he originalReducerState parameter, refer to the User Guide {@tutorial originalReducerState}
  return (state, action, originalReducerState) => conditionalFn(state, action, originalReducerState)
                                                    ? reducerFn(state, action, originalReducerState)
                                                    : state;
}



//***
//*** Specification: conditionalReducerCB
//***

/**
 * A callback function (used in {@link conditionalReducer}) which
 * conditionally determines whether it's supplied reducerFn will be
 * executed.
 *
 * @callback conditionalReducerCB
 *
 * @param {*} state - The current immutable state that is the reduction target.
 *
 * @param {Action} action - The standard redux Action object that
 * drives the reduction process.
 *
 * @param {*} originalReducerState - The immutable state at the time
 * of the start of the reduction process.
 *
 * This is useful in determining whether state has changed within a
 * series of reductions ... because each individual reducer only has
 * visibility of the state within it's own reduction process.
 * 
 * Further information can be found in the {@tutorial
 * originalReducerState} discussion of the User Guide.
 * 
 * @returns {truthy} A truthy value indicating whether the reducerFn
 * should be executed or not.
 */
