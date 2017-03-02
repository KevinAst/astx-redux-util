import expect     from 'expect';
import widgetOld  from './widgetOld'; // sample reducer (old style)
import widgetNew  from './widgetNew'; // sample reducer (new style)

const widgetUnderEdit = 'widgetUnderEdit';

function performTestSeries(reducer) {
  // eslint ISSUE: thinks assigned state is unused, but it is clearly passed as an argument :-(
  let state = undefined; // eslint-disable-line no-unused-vars
          //   runningState, action,                                       reducer, expectedNextState
          //          =====  ============================================  =======  =================
  state = performTest(state, {type:'app.bootstrap.init'},                  reducer, null);
  state = performTest(state, {type:'widget.edit', widget:widgetUnderEdit}, reducer, widgetUnderEdit);
  state = performTest(state, {type:'other.action.while.edit'},             reducer, widgetUnderEdit);
  state = performTest(state, {type:'widget.edit.close'},                   reducer, null);
  state = performTest(state, {type:'other.action.while.not.edit'},         reducer, null);
}

function performTest(state, action, reducer, expectedNextState) {
  const nextState = reducer(state, action);
  it(`process: '${action.type}'`, () => {
    expect(nextState).toBe(expectedNextState);
  });
  return nextState;
}

describe('example reducerHash(): verify sample code found in documentation', () => {

  describe('old way', () => {
    performTestSeries(widgetOld);
  });

  describe('new way', () => {
    performTestSeries(widgetNew);
  });

});
