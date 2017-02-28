'use strict';

import expect  from 'expect';
import widget  from './widget'; // sample reducer

function performTestSeries(reducer) {
  let state = undefined;
          //   runningState, action,                                       reducer, expectedNextState
          //          =====  ============================================  =======  =================
  state = performTest(state, {type:'app.bootstrap.init'},                  reducer, {}); // NOTE: proves condidition reducer did NOT execute (because no x/y properties)
  state = performTest(state, {type:'widget.edit'},                         reducer, {x:0, y:0});
  state = performTest(state, {type:'other.action'},                        reducer, {x:0, y:0});
  state = performTest(state, {type:'widget.edit.x.increment'},             reducer, {x:1, y:0});
  state = performTest(state, {type:'widget.edit.x.increment'},             reducer, {x:2, y:0});
  state = performTest(state, {type:'widget.edit.y.increment'},             reducer, {x:2, y:1});
  state = performTest(state, {type:'widget.edit.x.decrement'},             reducer, {x:1, y:1});
  state = performTest(state, {type:'other.action'},                        reducer, {x:1, y:1});
}

function performTest(state, action, reducer, expectedNextState) {
  const nextState = reducer(state, action);
  it(`process: '${action.type}'`, () => {
    expect(nextState).toEqual(expectedNextState);
  });
  return nextState;
}

describe('example conditionalReducer(): verify sample code found in documentation', () => {
  performTestSeries(widget);
});
