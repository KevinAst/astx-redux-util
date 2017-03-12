import { reducerHash } from '../../../../tooling/ModuleUnderTest'; // REALLY: 'astx-redux-util'

export default reducerHash({
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
}, null);
