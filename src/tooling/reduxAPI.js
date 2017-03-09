// NOTE: This file contains NO executable code, rather "JSDoc tags only", 
//       providing more concise API documentation for redux expectations.

// NOTE: This file tucked away in a spec/ directory, so as to NOT be included
//       in published npm source (it can be anywhere as long as it is seen by JSDoc).


//***
//*** Specification: reducerFn
//***

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

/**
 * @typedef {Object} Action
 *
 * A standard [redux Action object]{@link http://redux.js.org/docs/basics/Actions.html}
 * that drives the reduction process.
 *
 * @property {string|Symbol} type - The action type.
 * @property {*} whatever - Additional app-specific payload (as needed).
 */



//***
//*** Specification: InitialState
//***

/**
 * @typedef {*} InitialState
 *
 * All astx-redux-util reducer creators, expose an `initialState`
 * parameter which optionally provides a fall-back state value to use
 * during the state initialization boot-strap process.
 * 
 * In general, redux expects your state to have concrete values
 * (i.e. something other than `undefined`).  This means that the
 * reduction entry point to each state element should define a
 * default.  Keeping this in mind, the `initialState` parameter is
 * optional, because some reducers are "by design" (when combined in a
 * composition) intended to be mid-stream processors (i.e. NOT the
 * reduction entry point).
 */
