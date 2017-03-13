import expect        from 'expect';
import AstxReduxUtil from '../../tooling/ModuleUnderTest';
import identity      from 'lodash.identity';

const beginningState = 'beginningState';
const thenState      = 'thenState';
const elseState      = 'elseState';

const thenAction     = 'thenAction';

const elseCondition  = 'elseContidion';

const thenReducer    = (state, action) => thenState;
const elseReducer    = (state, action) => elseState;

function performTest(reducer, actionType, expectedState) {
  it(`process: '${actionType}'`, () => {
    expect(reducer(beginningState, {type: actionType})).toBe(expectedState);
  });
}

describe('conditionalReducer() tests', () => {


  describe('conditionalReducer with if only', () => {

    const reducerUnderTest = AstxReduxUtil.conditionalReducer(
      (state, action, originalReducerState) => action.type === thenAction,
      thenReducer
    );

    performTest(reducerUnderTest, thenAction,    thenState);
    performTest(reducerUnderTest, elseCondition, beginningState);

  });


  describe('conditionalReducer with if/then', () => {

    const reducerUnderTest = AstxReduxUtil.conditionalReducer(
      (state, action, originalReducerState) => action.type === thenAction,
      thenReducer,
      elseReducer
    );

    performTest(reducerUnderTest, thenAction,    thenState);
    performTest(reducerUnderTest, elseCondition, elseState);

  });


  describe('parameter validation', () => {

    it('conditionalFn missing', () => {
      // Error: AstxReduxUtil.conditionalReducer() parameter violation: conditionalFn argument is required
      expect(()=>AstxReduxUtil.conditionalReducer()).toThrow('conditionalFn argument is required');
    });

    it('conditionalFn NOT a function', () => {
      // Error: AstxReduxUtil.conditionalReducer() parameter violation: conditionalFn argument is NOT a function
      expect(()=>AstxReduxUtil.conditionalReducer('bad')).toThrow('conditionalFn argument is NOT a function');
    });

    it('thenReducerFn missing', () => {
      // Error: AstxReduxUtil.conditionalReducer() parameter violation: thenReducerFn argument is required
      expect(()=>AstxReduxUtil.conditionalReducer((p)=>p)).toThrow('thenReducerFn argument is required');
    });

    it('thenReducerFn NOT a function', () => {
      // Error: AstxReduxUtil.conditionalReducer() parameter violation: thenReducerFn argument is NOT a function
      expect(()=>AstxReduxUtil.conditionalReducer((p)=>p, 'bad')).toThrow('thenReducerFn argument is NOT a function');
    });

    it('elseReducerFn NOT a function', () => {
      // Error: AstxReduxUtil.conditionalReducer() parameter violation: elseReducerFn argument is NOT a function
      expect(()=>AstxReduxUtil.conditionalReducer((p)=>p, thenReducer, 'bad')).toThrow('elseReducerFn argument is NOT a function');
    });

  });


  describe('initialState tests', () => {

    const initialState = 'initialState';

    it('initialState NOT defined', () => {
      const reducerWithoutInitialState = AstxReduxUtil.conditionalReducer(()=>true, identity, identity);
      expect(reducerWithoutInitialState(undefined, {type: 'SOME_OTHER_TYPE'})).toBe(undefined);
    });

    it('initialState IS defined', () => {
      const reducerWithInitialState = AstxReduxUtil.conditionalReducer(()=>true, identity, identity, initialState);
      expect(reducerWithInitialState(undefined, {type: 'SOME_OTHER_TYPE'})).toBe(initialState);
    });

  });

});
