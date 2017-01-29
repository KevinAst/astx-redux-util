Occasionally it is necessary for a state to have multiple reductions
applied to it.  This typically occurs when the involved reducers
represent fundamentally different operational types.

Let's review an example to clarify this concept.

Say we have a widget state, that contains x/y properties:

```JavaScript
{
  widget: {
    x: 100,
    y: 200
  }
}
```

Typically this would be controlled through a standard
Redux.combineReducers:

```JavaScript
import * as Redux  from 'redux';
import x           from './myAppReducer.x;
import y           from './myAppReducer.y;

const contentReducer = 
  Redux.combineReducers({
    x,
    y
  });

export default function widget(widget={}, action) {
  return contentReducer.reduce(nextState, action);
}
```

What happens, however, if the widget can take on a null value (say for
example, it only exists when it is being edited)?  

In this case, there is more work to do because 
  1. we need to apply the editor open/close logic, and
  2. conditionally apply the Redux.combineReducer because it cannot
     operate on null state.

One way to accomplish this is through procedural logic, as follows:

```JavaScript
import * as Redux  from 'redux';
import x           from './myAppReducer.x;
import y           from './myAppReducer.y;

const contentReducer = 
  Redux.combineReducers({
    x,
    y
  });

export default function widget(widget=null, action) {

  // first: determine content shape (i.e. null or {})
  let nextState = widget;
  switch (action.type) {

    case 'editOpen':
      nextState = action.widget;
      break;

    case 'editClose':
      nextState = null;
      break;

    default:
      nextState = widget;
  }

  // second: maintain individucal x/y fields ONLY when there is content
  if (nextState !== null) {
    nextState = contentReducer.reduce(nextState, action);
  }

  // are we done yet? ... that was painful!!
  return nextState;
}
```

A more elegant solution can be accomplished using reducer composition,
eliminating the procedural code completely.

**Enter two new higher-order reducers** *(in addition to {@link
reducerHash} which we have covered previously)*:

1. {@link joinReducers} combines two or more reducers, logically
   executing each in sequence.

2. {@link conditionalReducer} conditionally executes a reducerFn when
   the conditionalFn returns truthy.

*The following snippet, is equivalent to the one above:*
```JavaScript
import * as Redux         from 'redux';
import * as AstReduxUtil  from 'astx-redux-util';
import x                  from './myAppReducer.x;
import y                  from './myAppReducer.y;

const reduceWidget = 
  AstReduxUtil.joinReducers(
    // first reducer: determines content shape (i.e. null or {})
    AstReduxUtil.reducerHash({
      editOpen (widget, action) => action.widget,
      editClose(widget, action) => null
    }),

    // second reducer: detailing individucal x/y fields
    // ... only executed when there is content
    AstReduxUtil.conditionalReducer(
      (curState, action, originalReducerState) => curState !== null,
      Redux.combineReducers({
        x,
        y
      }))
  );

export default function widget(widget=null, action) {
  return reduceWidget(widget, action);
}
```

Here the joinReducers combines multiple reducers together as one.

- The first reducer (reducerHash) interprets the
  'editOpen'/'editClose' action.type, providing content shape or not
  (i.e. null).

- The second reducer (conditionalReducer) conditionally invokes the
  third reducer (combineReducers), only when the state has content
  (i.e. non-null).

**Reducer composition provides a more elegant solution that is
functional in nature.**

**Please note** that the higher-order reducer functions are invoked
outside the scope of the widget() reducer, as an optimization, so as
to not incur the creation overhead on each reducer invocation.
