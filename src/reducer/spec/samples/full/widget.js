'use strict';

import * as Redux         from 'redux';
import * as AstxReduxUtil from '../../../../index'; // REALLY: 'astx-redux-util'
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';
import Widget             from '../appReducer/Widget';

const reduceWidget = 
  AstxReduxUtil.joinReducers(
    // FIRST: determine content shape (i.e. {} or null)
    AstxReduxUtil.reducerHash({
      "widget.edit":       (widget, action) => action.widget,
      "widget.edit.close": (widget, action) => null
    }),

    AstxReduxUtil.conditionalReducer(
      // NEXT: maintain individual x/y fields
      //       ONLY when widget has content (i.e. is being edited)
      (widget, action, originalReducerState) => widget !== null,
      AstxReduxUtil.joinReducers(
        Redux.combineReducers({
          x,
          y
        }),
        AstxReduxUtil.conditionalReducer(
          // LAST: maintain curHash
          //       ONLY when widget has content (see condition above) -AND- has changed
          (widget, action, originalReducerState) => originalReducerState !== widget,
          (widget, action) => {
            widget.curHash = Widget.hash(widget); // OK to mutate (because of changed instance)
            return widget;
          })
      )
    )
  );

export default function widget(widget=null, action) {
  return reduceWidget(widget, action);
}
