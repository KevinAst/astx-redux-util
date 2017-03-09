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

  // TODO: test edge case: a) validating hash, and b) hash containing an undefined key

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
