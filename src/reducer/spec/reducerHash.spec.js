import expect        from 'expect';
import AstxReduxUtil from '../../spec/ModuleUnderTest';

const reducerUnderTest = AstxReduxUtil.reducerHash({
  'edit':       (state, action) => action.payload,
  'edit.close': (state, action) => null,
});

const initialState  = 'initialState';
const actionPayload = 'actionPayload';

function performTest(actionType, expectedState) {
  it(`process: '${actionType}'`, () => {
    expect(reducerUnderTest(initialState, {type: actionType, payload: actionPayload})).toBe(expectedState);
  });
}

describe('reducerHash() tests', () => {
  performTest('edit',         actionPayload);
  performTest('edit.close',   null);
  performTest('other.action', initialState);

  // TODO: test edge case: a) validating hash, and b) hash containing an undefined key

});
