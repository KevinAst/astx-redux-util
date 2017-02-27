'use strict';

import expect         from 'expect';
import {joinReducers} from '../../index'; // module under test (NOTE: we purposely vary import techniques)

const initialState     = 1;

const reducerIncrement = (state, action) => state + 1;
const reducerDecrement = (state, action) => state - 1;
const reducerDouble    = (state, action) => state * 2;

function performTest(desc, reducer, expectedState) {
  it(`process: '${desc}'`, () => {
    expect(reducer(initialState, {type: 'notUsed'})).toBe(expectedState);
  });
}

describe('joinReducers() tests', () => {
  // TODO: test parameter validation
//performTest('increment, double (with array params)', joinReducers([reducerIncrement, reducerDouble]),                                4); // TODO: this errors, should be validated
  performTest('NO REDUCERS',                           joinReducers(),                                                                 1); // TODO: should this be a validation error?
  performTest('increment',                             joinReducers(reducerIncrement),                                                 2);
  performTest('increment, increment',                  joinReducers(reducerIncrement, reducerIncrement),                               3);
  performTest('increment, double',                     joinReducers(reducerIncrement, reducerDouble),                                  4);
  performTest('increment, double, double',             joinReducers(reducerIncrement, reducerDouble, reducerDouble),                   8);
  performTest('increment, double, double, decrement',  joinReducers(reducerIncrement, reducerDouble, reducerDouble, reducerDecrement), 7);
});
