/*
 * @file
 * @author Kevin Bridges ({@link https://github.com/KevinAst/})
 * @copyright Copyright (c) 2017 Kevin Bridges
 * @license MIT (see: LICENSE project file)
 */

'use strict';

import reducerPassThrough  from './reducerPassThrough';

/**
 * Create a higher-order reducer by combining a set of sub-reducer
 * functions that are indexed by the standard action.type.  
 *
 * A default pass-through heuristic is automatically applied - passing
 * the original state when no action.type is acted on.
 *
 * This is the more prevalent composition reducer, and provides an
 * elegant alternative to the switch statement (commonly used to
 * provide this control mechanism).
 *
 * Please refer to the <a href='tutorial-usage.html#reducerHash'>Eradicate the Switch</a>
 * section of the User Guide for examples and more information.
 *
 * **NOTE**: 
 *    Because of the central nature of this utility, it is a common
 *    practice to inject logging probes by extending this function.
 *    Please refer to the {@tutorial logExt} discussion for more information.
 *
 * @param {Hash} actionHandlers - a hash of reducer functions,
 * indexed by the standard redux action.type (see examples ??).
 * 
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function reducerHash(actionHandlers) {

  // TODO: consider validation of actionHandlers param.

  const locateHandler = (action) => actionHandlers[action.type] || reducerPassThrough;

  // expose the new reducer fn, which resolves according the the supplied hash
  return (state, action) => locateHandler(action)(state, action);
}
