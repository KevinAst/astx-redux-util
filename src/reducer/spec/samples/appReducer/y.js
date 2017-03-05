import AstxReduxUtil from '../../../../spec/ModuleUnderTest'; // REALLY: 'astx-redux-util'

const reduceY = AstxReduxUtil.reducerHash({
  "widget.edit.y.increment": (y, action) => y+1,
  "widget.edit.y.decrement": (y, action) => y-1,
});

export default function y(y=0, action) {
  return reduceY(y, action);
}
