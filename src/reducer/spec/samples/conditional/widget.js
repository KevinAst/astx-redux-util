'use strict';

import * as Redux         from 'redux';
import * as AstxReduxUtil from '../../../../index'; // REALLY: 'astx-redux-util'
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';

const reduceWidget = 
  AstxReduxUtil.conditionalReducer(
    // conditionally apply when action.type begins with 'widget.edit'
    (curState, action, originalReducerState) => action.type.startsWith('widget.edit'),
    Redux.combineReducers({
      x,
      y
    }));

export default function widget(widget={}, action) {
  return reduceWidget(widget, action);
}
