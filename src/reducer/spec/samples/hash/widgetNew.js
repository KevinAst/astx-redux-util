import { reducerHash } from '../../../../index'; // REALLY: 'astx-redux-util'

const reduceWidget = reducerHash({
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
});

export default function widget(widget=null, action) {
  return reduceWidget(widget, action);
}
