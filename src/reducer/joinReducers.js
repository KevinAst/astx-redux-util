'use strict';

import {} from '../reduxAPI'; // TODO: placebo import required for JSDoc (ISSUE: JSDoc seems to require at least one import to expose these items)

/**
 * Create a higher-order reducer by combining two or more reducers,
 * logically executing each in sequence (in essence combining their
 * functionality into one).  This is useful when combining various
 * reducer types into one logical construct.
 *
 * **Examples** of joinReducers can be found in {@tutorial
 * conceptJoin} and {@tutorial fullExample}.
 *
 * @param {...reducerFn} reducerFns two or more reducer functions to join
 * together.
 * 
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function joinReducers(...reducerFns) {

  // TODO: consider validation of joinReducers() params ... two or more reducerFns

  // expose our new higher-order reducer
  return (state, action, originalReducerState) => {

    // maintain the originalReducerState as the immutable state
    // at the time of the start of the reduction process.
    // ... please refer to the User Guide {@tutorial originalReducerState}
    if (originalReducerState === undefined) {
      originalReducerState = state;
    }

    // execute each reducerFn in sequence
    return reducerFns.reduce( (nextState, reducerFn) => {
                                 return reducerFn(nextState, action, originalReducerState);
                               },
                               state);

  }
}
