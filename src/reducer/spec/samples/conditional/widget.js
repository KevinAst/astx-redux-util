import * as Redux    from 'redux';
import identity      from 'lodash.identity';
import AstxReduxUtil from '../../../../tooling/ModuleUnderTest'; // REALLY: 'astx-redux-util'
import x             from '../appReducer/x';
import y             from '../appReducer/y';

export default AstxReduxUtil.conditionalReducer(
  // conditionally apply when action.type begins with 'widget.edit'
  (curState, action, originalReducerState) => action.type.startsWith('widget.edit'),
  Redux.combineReducers({
    x,
    y
  }), identity, {});
