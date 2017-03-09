Occasionally it is necessary for a state to have multiple reductions
applied to it.  Typically this occurs when the reducers involved
represent fundamentally different operational types.

An example should clarify this concept.

Let's say we have a widget that contains x/y properties:

```JavaScript
{
  widget: {
    x: 100,
    y: 200
  }
}
```

The individual x/y properties are nicely managed by the standard
[Redux.combineReducers] function:

```JavaScript
import * as Redux  from 'redux';
import x           from '../appReducer/x';
import y           from '../appReducer/y';

const contentReducer = 
  Redux.combineReducers({
    x,
    y
  });

export default function widget(widget={}, action) {
  return contentReducer.reduce(nextState, action);
}
```

However, **what happens if the widget can take on a null value** (say for
example, it only exists when it is being edited)?

In this case, **we have more work to do**:
  1. we need to apply the editor open/close logic, and
  2. conditionally manage it's content *(because
     [Redux.combineReducers] cannot operate on null state)*.

One way to accomplish this is through the following procedural logic:

```JavaScript
import * as Redux  from 'redux';
import x           from '../appReducer/x';
import y           from '../appReducer/y';

const contentReducer = 
  Redux.combineReducers({
    x,
    y
  });

export default function widget(widget=null, action) {

  // FIRST: determine content shape (i.e. {} or null)
  let nextState = widget;
  switch (action.type) {

    case 'widget.edit':
      nextState = action.widget;
      break;

    case 'widget.edit.close':
      nextState = null;
      break;

    default:
      nextState = widget;
  }

  // SECOND: maintain individual x/y fields
  //         ONLY when widget has content (i.e. is being edited)
  if (nextState !== null) {
    nextState = contentReducer(nextState, action);
  }

  // are we done yet? ... that was painful!!
  return nextState;
}
```

A more elegant solution can be accomplished by employing reducer
composition, eliminating the procedural code completely.  We have
already discussed {@link reducerHash} and {@link conditionalReducer}.
A third utility, the {@link joinReducers} function, combines two or
more reducers logically executing each in sequence.

*The following snippet, is equivalent to the one above:*
```JavaScript
import * as Redux         from 'redux';
import * as AstxReduxUtil from 'astx-redux-util';
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';

export default AstxReduxUtil.joinReducers(
  // FIRST: determine content shape (i.e. {} or null)
  AstxReduxUtil.reducerHash({
    "widget.edit":       (widget, action) => action.widget,
    "widget.edit.close": (widget, action) => null
  }),

  AstxReduxUtil.conditionalReducer(
    // SECOND: maintain individual x/y fields
    //         ONLY when widget has content (i.e. is being edited)
    (widget, action, originalReducerState) => widget !== null,
    Redux.combineReducers({
      x,
      y
    })),

  null); // initialState
```

Here the joinReducers combines multiple reducers together as one.

- The first reducer (reducerHash) interprets the
  `'widget.edit`/`'widget.edit.close'` action type, providing object
  content or not (i.e. null).

- The second reducer (conditionalReducer) conditionally invokes the
  third reducer ([Redux.combineReducers]), only when the state has content
  (i.e. non-null).

**Reducer composition provides a more elegant solution that is
purely functional in nature.**


[Redux.combineReducers]: http://redux.js.org/docs/api/combineReducers.html
