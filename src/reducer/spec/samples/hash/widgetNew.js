import AstxReduxUtil from '../../../../tooling/ModuleUnderTest'; // REALLY: 'astx-redux-util'
const { reducerHash } = AstxReduxUtil; // TODO: figure out how to import { reducerHash } within ModuleUnderTest

const reduceWidget = reducerHash({
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
});

export default function widget(widget=null, action) {
  return reduceWidget(widget, action);
}
