import * as Redux         from 'redux';
import AstxReduxUtil      from '../../../../tooling/ModuleUnderTest'; // REALLY: 'astx-redux-util'
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';

const reduceWidget = 
  AstxReduxUtil.joinReducers(
    // FIRST: determine content shape (i.e. {} or null)
    AstxReduxUtil.reducerHash({
      "widget.edit":       (widget, action) => action.widget,
      "widget.edit.close": (widget, action) => null
    }),

    AstxReduxUtil.conditionalReducer(
      // SECOND: maintain individual x/y fields
      //         ONLY when widget has content (i.e. is being edited)
      (widget, action, originalReducerState) => widget !== null,
      Redux.combineReducers({
        x,
        y
      }))
  );

export default function widget(widget=null, action) {
  return reduceWidget(widget, action);
}
