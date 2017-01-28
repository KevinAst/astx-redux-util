/*
 * @file
 * @author Kevin Bridges ({@link https://github.com/KevinAst/})
 * @copyright Copyright (c) 2017 Kevin Bridges
 * @license MIT (see: LICENSE project file)
 */

'use strict';

import reducerPassThrough  from './reducerPassThrough';

/**
 * Create a higher-order reducer through the set of reducer functions
 * supplied in the actionHandlers parameter.
 *
 * This provides a more elegant solution to the switch statement,
 * commonly used to provide this control mechanism.
 *
 * *So instead of this:*
 * ```javascript
 *   export default function widget(widget=null, action) {
 *     switch (action.type) {
 *       case ActionType.widget.edit:
 *         return action.widget;
 *       case ActionType.widget.edit.close:
 *         return null;
 *       default:
 *         return state;
 *     }
 *   }
 * ```
 *
 * *You can simply do this:*
 * ```
 *   const myReducer = reducerHash({
 *           [ActionType.widget.edit]       (widget, action) => action.widget,
 *           [ActionType.widget.edit.close] (widget, action) => null,
 *         });
 *   export default function widget(widget=null, action) {
 *     return myReducer(widget, action);
 *   }
 * ```
 * 
 * **NOTE**: 
 * - <i>Because of the central nature of this utility, it is a common
 *   practice to inject logging probes by extending this function.
 *   Not only are these probes centrally located in a common spot, but
 *   they can easily correlate logging levels to state changes,
 *   providing a means to filter logs at a high level with minimal
 *   output (for example: filter the logs to named reducers that
 *   actually change the state).  You can find an example of this at
 *   TODO</i>
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
