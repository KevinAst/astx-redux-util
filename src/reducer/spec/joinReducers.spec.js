import expect        from 'expect';
import AstxReduxUtil from '../../tooling/ModuleUnderTest';
import identity      from 'lodash.identity';

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

  performTest('increment, increment',                  AstxReduxUtil.joinReducers(reducerIncrement, reducerIncrement),                               3);
  performTest('increment, double',                     AstxReduxUtil.joinReducers(reducerIncrement, reducerDouble),                                  4);
  performTest('increment, double, double',             AstxReduxUtil.joinReducers(reducerIncrement, reducerDouble, reducerDouble),                   8);
  performTest('increment, double, double, decrement',  AstxReduxUtil.joinReducers(reducerIncrement, reducerDouble, reducerDouble, reducerDecrement), 7);


  describe('parameter validation', () => {

    it('NO REDUCERS', () => {
      // Error: AstxReduxUtil.joinReducers() parameter violation: two or more reducerFn arguments are required
      expect(()=>AstxReduxUtil.joinReducers()).toThrow('two or more reducerFn arguments are required');
    });

    it('ONE REDUCER', () => {
      // Error: AstxReduxUtil.joinReducers() parameter violation: two or more reducerFn arguments are required
      expect(()=>AstxReduxUtil.joinReducers(reducerIncrement)).toThrow('two or more reducerFn arguments are required');
    });

    it('1st ARG is BAD', () => {
      // Error: AstxReduxUtil.joinReducers() parameter violation: argument position number 1 is NOT a function ... expecting two or more reducerFns to join together
      expect(()=>AstxReduxUtil.joinReducers('bad', reducerIncrement)).toThrow('argument position number 1 is NOT a function');
    });

    it('2nd ARG is BAD', () => {
      // Error: AstxReduxUtil.joinReducers() parameter violation: argument position number 2 is NOT a function ... expecting two or more reducerFns to join together
      expect(()=>AstxReduxUtil.joinReducers(reducerIncrement, 'bad', reducerIncrement)).toThrow('argument position number 2 is NOT a function');
    });

  });

  describe('initialState tests', () => {

    const initialState = 'initialState';

    it('initialState NOT defined', () => {
      const reducerWithoutInitialState = AstxReduxUtil.joinReducers(identity, identity);
      expect(reducerWithoutInitialState(undefined, {type: 'UNUSED_TYPE'})).toBe(undefined);
    });

    it('initialState IS defined', () => {
      const reducerWithInitialState = AstxReduxUtil.joinReducers(identity, identity, initialState);
      expect(reducerWithInitialState(undefined, {type: 'UNUSED_TYPE'})).toBe(initialState);
    });

  });


});
