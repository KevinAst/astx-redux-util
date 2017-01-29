Reducers commonly reason about the action.type, driving conditional
logic through a switch statement:

```JavaScript
  export default function widget(widget=null, action) {

    switch (action.type) {

      case ActionType.widget.edit:
        return action.widget;

      case ActionType.widget.edit.close:
        return null;

      default:
        return state;
    }
  }
```

The {@link reducerHash} *(the most common of the composition
reducers)* provides a more elegant solution, eliminating the switch
statement altogether. It creates a higher-order reducer, by combining
a set of sub-reducer functions that are indexed by the standard
action.type.

*The following snippet, is equivalent to the one above.*
```
  import { reducerHash } from 'astx-redux-util';

  const myReducer = reducerHash({
          [ActionType.widget.edit]       (widget, action) => action.widget,
          [ActionType.widget.edit.close] (widget, action) => null,
        });

  export default function widget(widget=null, action) {
    return myReducer(widget, action);
  }
```

Not only is the conditional logic better encapsulated, but the default
pass-through logic is automatically applied ... passing the original
state when no action.type is acted on.

**Please note** that because {@link reducerHash} is a higher-order
creator function, it is invoked outside the scope of the widget()
reducer.  This is an optimization, so as to not incur the creation
overhead on each reducer invocation.

**Also note** that because {@link reducerHash} is so central to the
rudimentary aspects of reduction, it is common to provide a
value-added {@tutorial logExt}.
