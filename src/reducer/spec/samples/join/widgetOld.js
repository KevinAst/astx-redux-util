import * as Redux  from 'redux';
import x           from '../appReducer/x';
import y           from '../appReducer/y';

const contentReducer = 
  Redux.combineReducers({
    x,
    y
  });

export default function widget(widget=null, action) {

  // FIRST: determine content shape (i.e. {} or null)
  let nextState = widget;
  switch (action.type) {

    case 'widget.edit':
      nextState = action.widget;
      break;

    case 'widget.edit.close':
      nextState = null;
      break;

    default:
      nextState = widget;
  }

  // SECOND: maintain individual x/y fields
  //         ONLY when widget has content (i.e. is being edited)
  if (nextState !== null) {
    nextState = contentReducer(nextState, action);
  }

  // are we done yet? ... that was painful!!
  return nextState;
}
