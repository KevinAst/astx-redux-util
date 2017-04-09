import isFunction from 'lodash.isfunction';
import last       from 'lodash.last';
import verify     from '../util/verify';

/**
 * Create a higher-order reducer by combining two or more reducers,
 * logically executing each in sequence (in essence combining their
 * functionality into one).  This is useful when combining various
 * reducer types into one logical construct.
 * 
 * **Please Note:** Because each reducer is able to build on what has
 * been accomplished by a prior reducer, joinReducers cumulatively
 * passes the state parameter that was returned from any prior reducer
 * (in the chain of reducers to execute).  In essence this is an
 * accumulative process.  While this does NOT relax the immutable
 * constraint of the reducer's state parameter, it is possible for a
 * down-stream reducer to receive a state parameter that is a
 * different instance from the start of the reduction process (because
 * an up-stream reducer needed to alter it in some way).
 * 
 * The **Dev Guide** discusses joinReducers() in more detail
 * (see {{book.guide.conceptJoin}}), and additional examples can
 * be found in {{book.guide.fullExample}}.
 *
 * @param {...reducerFn} reducerFns two or more reducer functions to join
 * together.
 *
 * @param {InitialState} [initialState] - the optional fall-back state
 * value used during the state initialization boot-strap process.
 * 
 * @returns {reducerFn} a newly created reducer function (described above).
 */
export default function joinReducers(...reducerFns) {

  // define our initialState parameter (optionally, the last parameter)
  // NOTE: We have to do this programatically because our function 
  //       accepts variable number of arguments.
  const initialState = isFunction(last(reducerFns)) ? undefined : reducerFns.pop();

  // validate params
  const check = verify.prefix('AstxReduxUtil.joinReducers() parameter violation: ');

  check(reducerFns && reducerFns.length >= 2,
        'two or more reducerFn arguments are required');

  // ... each arg MUST be a function (reducerFn)
  const badArgNum = reducerFns.reduce( (firstBadArgNum, reducerFn, indx) => {
    return firstBadArgNum || (isFunction(reducerFn) ? 0 : indx+1);
  }, 0);
  check(!badArgNum,
        `argument position number ${badArgNum} is NOT a function ... expecting two or more reducerFns to join together`);

  // expose our new higher-order reducer
  return (state=initialState, action, originalReducerState) => {

    // maintain the originalReducerState as the immutable state
    // at the time of the start of the reduction process
    // ... in support of joinReducers()
    // ... for more info, refer to the Dev Guide {{book.guide.originalReducerState}}
    if (originalReducerState === undefined) {
      originalReducerState = state;
    }

    // execute each reducerFn in sequence
    return reducerFns.reduce( (nextState, reducerFn) => {
                                 return reducerFn(nextState, action, originalReducerState);
                               },
                               state);

  };
}
