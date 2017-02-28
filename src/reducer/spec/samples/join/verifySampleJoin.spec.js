'use strict';

import expect     from 'expect';
import widgetOld  from './widgetOld'; // sample reducer (old style)
import widgetNew  from './widgetNew'; // sample reducer (new style)

function performTestSeries(reducer) {
  let state = undefined;
          //   runningState, action,                                       reducer, expectedNextState
          //          =====  ============================================  =======  =================
  state = performTest(state, {type:'app.bootstrap.init'},                  reducer, null);
  state = performTest(state, {type:'widget.edit', widget:{x:11, y:22}},    reducer, {x:11, y:22});
  state = performTest(state, {type:'widget.edit.x.increment'},             reducer, {x:12, y:22});
  state = performTest(state, {type:'widget.edit.x.increment'},             reducer, {x:13, y:22});
  state = performTest(state, {type:'widget.edit.y.increment'},             reducer, {x:13, y:23});
  state = performTest(state, {type:'other.action.while.edit'},             reducer, {x:13, y:23});
  state = performTest(state, {type:'widget.edit.x.decrement'},             reducer, {x:12, y:23});
  state = performTest(state, {type:'widget.edit.close'},                   reducer, null);
  state = performTest(state, {type:'other.action.while.not.edit'},         reducer, null);
}

function performTest(state, action, reducer, expectedNextState) {
  const nextState = reducer(state, action);
  it(`process: '${action.type}'`, () => {
    expect(nextState).toEqual(expectedNextState);
  });
  return nextState;
}

describe('example joinReducers(): verify sample code found in documentation', () => {

  describe('old way', () => {
    performTestSeries(widgetOld);
  });

  describe('new way', () => {
    performTestSeries(widgetNew);
  });

});
