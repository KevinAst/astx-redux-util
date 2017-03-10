import AstxReduxUtil from '../../../../tooling/ModuleUnderTest'; // REALLY: 'astx-redux-util'
const { reducerHash } = AstxReduxUtil; // TODO: figure out how to import { reducerHash } within ModuleUnderTest

export default reducerHash({
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
}, null);
