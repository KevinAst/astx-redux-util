There are times where you may wish to conditionally apply a reduction.

There can be many reasons for this.  Take a simple example where you
wish to bypass a reduction process upon determination that an action
will not impact an entire branch of your state tree.  In this example
the conditional aspect is purely an optimization.

This can be accomplished through the {@link conditionalReducer} utility. 

```JavaScript
import * as Redux         from 'redux';
import * as AstxReduxUtil from 'astx-redux-util';
import x                  from './myAppReducer.x';
import y                  from './myAppReducer.y';

const reduceWidget = 
  AstxReduxUtil.conditionalReducer(
    // conditionally apply when action.type begins with 'widget.edit'
    (curState, action, originalReducerState) => action.type.startsWith('widget.edit'),
    Redux.combineReducers({
      x,
      y
    }));

export default function widget(widget={}, action) {
  return reduceWidget(widget, action);
}
```

Here we only invoke the supplied reducer
([Redux.combineReducers](http://redux.js.org/docs/api/combineReducers.html))
when the action.type begins with 'widget.edit'.  In our contrived
example, our action types are organized with a federated namespace, so
it is easy to isolate which actions will impact various parts of our
state.

**Please Note** that because we did not supply an "elseReducerFn" (the
third parameter to {@link conditionalReducer}), the default [identity
function](https://lodash.com/docs#identity) is used for the else
condition, in essence retaining the same state for a falsy directive.

**Also Note** that this example is merely intended to introduce you to
the concept of conditional reduction.  It is somewhat "contrived",
allowing us to discuss the topic in isolation.  In reality, this
example may be inappropriate because the optimization is minimal, and
it tends to make the code more brittle.  With that said, however, keep
in mind that there are "more legitimate" reasons to apply conditional
reduction ... we will see this in subsequent discussions.
