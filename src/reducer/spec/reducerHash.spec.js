import expect        from 'expect';
import AstxReduxUtil from '../../tooling/ModuleUnderTest';

const reducerUnderTest = AstxReduxUtil.reducerHash({
  'edit':       (state, action) => action.payload,
  'edit.close': (state, action) => null,
});

const beginningState = 'beginningState';
const actionPayload  = 'actionPayload';

function performTest(actionType, expectedState) {
  it(`process: '${actionType}'`, () => {
    expect(reducerUnderTest(beginningState, {type: actionType, payload: actionPayload})).toBe(expectedState);
  });
}

describe('reducerHash() tests', () => {
  performTest('edit',         actionPayload);
  performTest('edit.close',   null);
  performTest('other.action', beginningState);

  describe('parameter validation', () => {

    it('required', () => {
      // Error: AstxReduxUtil.reducerHash() parameter violation: actionHandlers is required
      expect(()=>AstxReduxUtil.reducerHash()).toThrow('actionHandlers is required');
    });

    it('non-function entry', () => {
      // Error: AstxReduxUtil.reducerHash() parameter violation: actionHandlers['bad'] is NOT a function ... expecting reducer function indexed by action type
      expect(()=>AstxReduxUtil.reducerHash({bad:123})).toThrow("actionHandlers['bad'] is NOT a function");
    });

    it('undefined entry', () => {
      const definedConstant = {};
      // Error: AstxReduxUtil.reducerHash() parameter violation: actionHandlers contains an 'undefined' entry ... suspect a misspelled constant
      expect(()=>AstxReduxUtil.reducerHash({[definedConstant.misspelledEntry]: (t)=>t})).toThrow("actionHandlers contains an 'undefined' entry");
    });

  });

  describe('initialState tests', () => {

    const initialState = 'initialState';

    it('initialState NOT defined', () => {
      const reducerWithoutInitialState = AstxReduxUtil.reducerHash({
        'UNUSED': (state, action) => 'should never set this value',
      });
      expect(reducerWithoutInitialState(undefined, {type: 'SOME_OTHER_TYPE'})).toBe(undefined);
    });

    it('initialState IS defined', () => {
      const reducerWithInitialState = AstxReduxUtil.reducerHash({
        'UNUSED': (state, action) => 'should never set this value',
      }, initialState);
      expect(reducerWithInitialState(undefined, {type: 'SOME_OTHER_TYPE'})).toBe(initialState);
    });

  });

});
