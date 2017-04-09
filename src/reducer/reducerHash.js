import identity    from 'lodash.identity';
import isFunction  from 'lodash.isfunction';
import verify      from '../util/verify';

/**
 * Create a higher-order reducer by combining a set of sub-reducer
 * functions that are indexed by the standard action.type.  When no
 * action.type is acted on, the original state is merely
 * passed-through (using the [identity
 * function](https://lodash.com/docs#identity)).
 *
 * This is one of the more prevalent composition reducers, and
 * provides an alternative to the switch statement (commonly used to
 * provide this control mechanism).
 * 
 * The **Dev Guide** discusses reducerHash() in more detail (see
 * {{book.guide.conceptHash}}), and additional examples can be found in
 * {{book.guide.conceptJoin}} and {{book.guide.fullExample}}.
 *
 * **NOTE**: Because reducerHash is so central to the rudimentary
 * aspect of reduction, it is a common practice to extend it,
 * promoting a 
 * [`centralized reducer-based logging capability`](/extending/logExt.md), 
 * with an ability to correlate logging levels to state changes
 * *(providing a means to filter logs at a high level with minimal
 * output)*.
 *
 * @param {ActionReducerHash} actionHandlers - a hash of reducer functions,
 * indexed by the standard redux action.type.
 *
 * @param {InitialState} [initialState] - the optional fall-back state
 * value used during the state initialization boot-strap process.
 * 
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function reducerHash(actionHandlers, initialState) {

  // validate params
  const check = verify.prefix('AstxReduxUtil.reducerHash() parameter violation: ');

  check(actionHandlers,
        'actionHandlers is required');

  // ... AI: this check may be too intrusive if the client's actionHandlers object is used for OTHER things?
  const invalidHashEntry = Object.getOwnPropertyNames(actionHandlers).reduce( (firstBadEntry, type) => {
    return firstBadEntry || isFunction(actionHandlers[type]) ? null : type;
  }, null);
  check(!invalidHashEntry,
        `actionHandlers['${invalidHashEntry}'] is NOT a function ... expecting reducer function indexed by action type`);

  check(!actionHandlers['undefined'],
        "actionHandlers contains an 'undefined' entry ... suspect a misspelled constant");


  // internal function: locate handler from actionHandlers action.type hash lookup
  //                    ... default: identity pass-through
  const locateHandler = (action) => actionHandlers[action.type] || identity;

  // expose the new reducer fn, which resolves according the the supplied actionHandlers
  return (state=initialState, action, originalReducerState) => {

    // maintain the originalReducerState as the immutable state
    // at the time of the start of the reduction process
    // ... in support of joinReducers()
    // ... for more info, refer to the Dev Guide {{book.guide.originalReducerState}}
    if (originalReducerState === undefined) {
      originalReducerState = state;
    }

    // execute the handler indexed by the action.type (or the identity pass-through)
    return locateHandler(action)(state, action, originalReducerState);
  };
}


//***
//*** Specification: ActionReducerHash
//***

/**
 * @typedef {Object} ActionReducerHash
 *
 * A hash of reducer functions, indexed by the standard redux
 * action.type.
 *
 * @property {reducerFn} actionType1 - The reducer function servicing: 'actionType1'.
 * @property {reducerFn} actionType2 - The reducer function servicing: 'actionType2'.
 * @property {reducerFn} ...more - ...etc.
 */
