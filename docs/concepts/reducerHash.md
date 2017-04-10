# Basics

Reducers frequently reason about the action.type, very often using a
switch statement to drive conditional logic:

```js
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

The {{book.api.reducerHash}} function *(the most common composition
reducer)* provides a more elegant solution, eliminating the switch
statement altogether.  It creates a higher-order reducer, by combining
a set of sub-reducer functions that are indexed by the standard
action.type.

*The following snippet, is equivalent to the one above:*
```js
import { reducerHash } from 'astx-redux-util';

export default reducerHash({
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
}, null); // initialState
```

Not only is the conditional logic better encapsulated, but the default
pass-through logic is automatically applied (using the [identity
function](https://lodash.com/docs#identity)), passing through the
original state when no action.type is acted on.

**Please Note** A `null` {{book.api.InitialState}} value is applied in
this reduction, which provides the fall-back state value during the
state initialization boot-strap process.

**SideBar** Because {{book.api.reducerHash}} is so central to the
rudimentary aspects of reduction, it is common to provide a
value-added {{book.guide.logExt}}, with the ability to correlate
logging levels to state changes *(providing a means to filter logs at
a high level with minimal output)*.

