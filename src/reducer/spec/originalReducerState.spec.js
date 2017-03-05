import expect        from 'expect';
import AstxReduxUtil from '../../spec/ModuleUnderTest';

describe('verify originalReducerState is correctly passed through nested reducers', () => {

  function check(desc, value, expected) {
    it(desc, () => {
      expect(value).toBe(expected);
    });
  }

  describe('with joinReducers() at the top', () => {

    AstxReduxUtil.joinReducers(
      (state, action, originalReducerState) => { // myReducer1
        check('myReducer1 state',                state,                'originalState');
        check('myReducer1 originalReducerState', originalReducerState, 'originalState');
        return 'myReducer1';
      },
      (state, action, originalReducerState) => { // myReducer2
        check('myReducer2 state',                state,                'myReducer1');
        check('myReducer2 originalReducerState', originalReducerState, 'originalState');
        return 'myReducer2';
      },
      AstxReduxUtil.joinReducers(
        (state, action, originalReducerState) => { // myReducer3
          check('myReducer3 state',                state,                'myReducer2');
          check('myReducer3 originalReducerState', originalReducerState, 'originalState');
          return 'myReducer3';
        },
        AstxReduxUtil.conditionalReducer(
          (state, action, originalReducerState) => { // CONDITION
            check('myReducer4 CONDITION state',                state,                'myReducer3');
            check('myReducer4 CONDITION originalReducerState', originalReducerState, 'originalState');
            return true; // always execute
          },
          (state, action, originalReducerState) => { // myReducer4
            check('myReducer4 state',                state,                'myReducer3');
            check('myReducer4 originalReducerState', originalReducerState, 'originalState');
            return 'myReducer4';
          }
        ),
        (state, action, originalReducerState) => { // myReducer5
          check('myReducer5 state',                state,                'myReducer4');
          check('myReducer5 originalReducerState', originalReducerState, 'originalState');
          return 'myReducer5';
        },
        AstxReduxUtil.conditionalReducer(
          (state, action, originalReducerState) => { // CONDITION
            check('myReducer6 CONDITION state',                state,                'myReducer5');
            check('myReducer6 CONDITION originalReducerState', originalReducerState, 'originalState');
            return true; // always execute
          },
          AstxReduxUtil.reducerHash({
            'myAction': (state, action, originalReducerState) => { // myReducer6
              check('myReducer6 state',                state,                'myReducer5');
              check('myReducer6 originalReducerState', originalReducerState, 'originalState');
              return 'myReducer6';
            }
          })
        )
      )
    )('originalState', {type: 'myAction'}); // execute reducer

  });

  describe('with conditionalReducer() at the top', () => {

    AstxReduxUtil.conditionalReducer(
      (state, action, originalReducerState) => { // CONDITION
        check('myReducer1 CONDITION state',                state,                'originalState');
        check('myReducer1 CONDITION originalReducerState', originalReducerState, 'originalState');
        return true; // always execute
      },
      AstxReduxUtil.joinReducers(
        (state, action, originalReducerState) => { // myReducer1
          check('myReducer1 state',                state,                'originalState');
          check('myReducer1 originalReducerState', originalReducerState, 'originalState');
          return 'myReducer1';
        },
        (state, action, originalReducerState) => { // myReducer2
          check('myReducer2 state',                state,                'myReducer1');
          check('myReducer2 originalReducerState', originalReducerState, 'originalState');
          return 'myReducer2';
        }
      )
    )('originalState', {type: 'myAction'}); // execute reducer

  });

  describe('with reducerHash() at the top', () => {

    AstxReduxUtil.reducerHash({
      'myAction': (state, action, originalReducerState) => { // myReducer1
        check('myReducer1 state',                state,                'originalState');
        check('myReducer1 originalReducerState', originalReducerState, 'originalState');
        return 'myReducer1';
      }
    })('originalState', {type: 'myAction'}); // execute reducer

  });

});
