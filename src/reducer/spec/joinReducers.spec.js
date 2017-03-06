import expect        from 'expect';
import AstxReduxUtil from '../../tooling/ModuleUnderTest';

const initialState = 1;

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
//performTest('increment, double (with array params)', AstxReduxUtil.joinReducers([reducerIncrement, reducerDouble]),                                4); // TODO: this errors, should be validated
  performTest('NO REDUCERS',                           AstxReduxUtil.joinReducers(),                                                                 1); // TODO: should this be a validation error?
  performTest('increment',                             AstxReduxUtil.joinReducers(reducerIncrement),                                                 2);
  performTest('increment, increment',                  AstxReduxUtil.joinReducers(reducerIncrement, reducerIncrement),                               3);
  performTest('increment, double',                     AstxReduxUtil.joinReducers(reducerIncrement, reducerDouble),                                  4);
  performTest('increment, double, double',             AstxReduxUtil.joinReducers(reducerIncrement, reducerDouble, reducerDouble),                   8);
  performTest('increment, double, double, decrement',  AstxReduxUtil.joinReducers(reducerIncrement, reducerDouble, reducerDouble, reducerDecrement), 7);
});
