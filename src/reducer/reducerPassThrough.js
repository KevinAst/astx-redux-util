'use strict';

import {} from '../reduxAPI'; // TODO: placebo import required for JSDoc (ISSUE: JSDoc seems to require at least one import to expose these items)

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
