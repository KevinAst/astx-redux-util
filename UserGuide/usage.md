TODO: develop rudimentary concepts with examples

TODO: where would a function summary go?

TODO: this sounds a bit embellished ... consider rewording with LESS fluff


<h4 class="name" id="reducerHash">Eradicate the Switch</h4>

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

The {@link reducerHash} function provides a more elegant solution,
eliminating the switch statement altogether.  *The following snippet,
is equivalent to the one above.*

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

The {@link reducerHash} function (the most common of the composition
reducers) creates a higher-order reducer, by combining a set of
sub-reducer functions that are indexed by the standard action.type.

Not only is the conditional logic better encapsulated, but the default
pass-through logic is automatically applied ... passing the original
state when no action.type is acted on.

**Please Note** that because the reducerHash() is a higher-order
creator function, it is invoked outside the scope of the widget()
reducer.  This is an optimization, so as to not incur the creation
overhead on each reducer invocation.

As it turns out, this utility is so central to the rudimentary aspect
of reduction, that a logging extension can easily be created to
provide a common spot to emit valuable logging probes.  Please refer
to the {@tutorial logExt} discussion for more information.
