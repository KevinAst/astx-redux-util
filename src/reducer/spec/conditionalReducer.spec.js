import expect                from 'expect';
import {conditionalReducer}  from '../../index'; // module under test (NOTE: we purposely vary import techniques)

const initialState  = 'initialState';
const thenState     = 'thenState';
const elseState     = 'elseState';

const thenAction    = 'thenAction';

const elseCondition = 'elseContidion';

const thenReducer   = (state, action) => thenState;
const elseReducer   = (state, action) => elseState;

function performTest(reducer, actionType, expectedState) {
  it(`process: '${actionType}'`, () => {
    expect(reducer(initialState, {type: actionType})).toBe(expectedState);
  });
}

describe('conditionalReducer() tests', () => {


  describe('conditionalReducer with if only', () => {

    const reducerUnderTest = conditionalReducer(
      (state, action, originalReducerState) => action.type === thenAction,
      thenReducer
    );

    performTest(reducerUnderTest, thenAction,    thenState);
    performTest(reducerUnderTest, elseCondition, initialState);

  });


  describe('conditionalReducer with if/then', () => {

    const reducerUnderTest = conditionalReducer(
      (state, action, originalReducerState) => action.type === thenAction,
      thenReducer,
      elseReducer
    );

    performTest(reducerUnderTest, thenAction,    thenState);
    performTest(reducerUnderTest, elseCondition, elseState);

  });

  // TODO: test edge case: validating parameters
});
