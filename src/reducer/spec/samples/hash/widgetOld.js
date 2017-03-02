export default function widget(widget=null, action) {
  switch (action.type) {

    case 'widget.edit':
      return action.widget;

    case 'widget.edit.close':
      return null;

    default:
      return widget;
  }
}
