Reducers frequently reason about the action.type, very often using a
switch statement to drive conditional logic:

```JavaScript
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
```

The {@link reducerHash} function *(the most common composition
reducer)* provides a more elegant solution, eliminating the switch
statement altogether.  It creates a higher-order reducer, by combining
a set of sub-reducer functions that are indexed by the standard
action.type.

*The following snippet, is equivalent to the one above:*
```
  import { reducerHash } from 'astx-redux-util';

  const reduceWidget = reducerHash({
          ['widget.edit']       (widget, action) => action.widget,
          ['widget.edit.close'] (widget, action) => null,
        });

  export default function widget(widget=null, action) {
    return reduceWidget(widget, action);
  }
```

Not only is the conditional logic better encapsulated, but the default
pass-through logic is automatically applied (using the [identity
function](https://lodash.com/docs#identity)), passing through the
original state when no action.type is acted on.


**Please Note** that because {@link reducerHash} is a higher-order
creator function, it is invoked outside the scope of the widget()
reducer.  This is an optimization, so as to not incur the creation
overhead on each reducer invocation.

**Also Note** that because {@link reducerHash} is so central to the
rudimentary aspects of reduction, it is common to provide a
value-added {@tutorial logExt}.
