import expect  from 'expect';
import widget  from './widget';

function performTestSeries(reducer) {
  // eslint ISSUE: thinks assigned state is unused, but it is clearly passed as an argument :-(
  let state = undefined; // eslint-disable-line no-unused-vars
          //   runningState, action,                                       reducer, expectedNextState
          //          =====  ============================================  =======  =================
  state = performTest(state, {type:'app.bootstrap.init'},                  reducer, null);
  state = performTest(state, {type:'widget.edit', widget:{x:11, y:22}},    reducer, {x:11, y:22, curHash: "x:11,y:22"});
  state = performTest(state, {type:'widget.edit.x.increment'},             reducer, {x:12, y:22, curHash: "x:12,y:22"});
  state = performTest(state, {type:'widget.edit.x.increment'},             reducer, {x:13, y:22, curHash: "x:13,y:22"});
  state = performTest(state, {type:'widget.edit.y.increment'},             reducer, {x:13, y:23, curHash: "x:13,y:23"});
  state = performTest(state, {type:'other.action.while.edit'},             reducer, {x:13, y:23, curHash: "x:13,y:23"});
  state = performTest(state, {type:'widget.edit.x.decrement'},             reducer, {x:12, y:23, curHash: "x:12,y:23"});
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

describe('example full example: verify sample code found in documentation', () => {
  performTestSeries(widget);
});
