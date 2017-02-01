'use strict';

// ??? import poop from './nonExistant'; // ?? for some reason jsdoc will not output the doc for this module WITHOUT an import ... MAKES NO SENSE AT ALL

/**
 * A "placebo" reducer that passes through it's supplied state as-is.
 * 
 * @param {*} state - The current immutable state that is the reduction target.
 * @param {Action} action - The standard redux Action object that drives the reduction process.
 * 
 * @returns {*} The resulting state after reduction *(in this case the supplied state as-is)*.
 */
export default function reducerPassThrough(state, action) {
  return state;
}
