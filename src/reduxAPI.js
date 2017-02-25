//***
//*** This file contains NO executable code, rather "JSDoc tags only", 
//*** providing more concise API documentation for redux expectations.
//***

'use strict';


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
