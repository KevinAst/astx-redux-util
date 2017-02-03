If we take our widget example one step further (from our {@tutorial
conceptJoin} discussion), let's say in addition to the x/y properties,
we now have a curHash - a determinate of whether application content
has changed.

```JavaScript
{
  widget: {
    x:       100,
    y:       200,
    curHash: 'IEFBR14'
  }
}
```

Our widget reducer is the obvious choice to maintain this curHash.  It
has a unique vantage point for this task, because it is a central
clearing house that has knowledge anytime the widget state changes.
This is even independent of how many properties the widget has!  Our
immutable pattern dictates that if our state changes, a new instance
will be created.  Therefore, we can safely change the curHash anytime
the widget instance has changed.

Building on our last example (in {@tutorial conceptJoin}), we
can accomplish this new requirement by simply adding a third
sub-reducer to our reduceWidget function.

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
        y,
        curHash: AstReduxUtil.reducerPassThrough
      })),

    // third reducer: maintaining the curHash (NEW from last example)
    // ... only executed when widget has changed
    AstReduxUtil.conditionalReducer(
      (curState, action, originalReducerState) => curState !== null && 
                                                  originalReducerState !== curState,
      (curState, action) => {
        curState.curHash = someHashOf(curState); // OK to mutate (different instance)
        return curState;
      })
  );

export default function widget(widget=null, action) {
  return reduceWidget(widget, action);
}
```

This represents a very comprehensive example of how **Reducer
Composition** can **simplify your life**!  We have combined 3
sub-reducers into one, applying conditional logic as needed through
functional decomposition!

**Please note** that we use the {@tutorial originalReducerState} to
determine if the widget has changed from ANY of the prior sub-reducers
(see the discussion of this topic in the provided link).

**Also note** that contrary to any **red flags** that may have
been raised on your initial glance of the code, **it is OK** to mutate
the curState variable in our third reducer, because we know a new instance
has already been created (via one of the prior reducers).

**Life is GOOD!**
