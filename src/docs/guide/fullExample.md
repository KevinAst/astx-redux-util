If we take our widget example one step further (from our {@tutorial
conceptJoin} discussion), let's say in addition to the x/y properties,
we now introduce a curHash - which is a determinate of whether
application content has changed.

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
will be introduced.  Therefore, we can safely change the curHash anytime
the widget instance has changed.

Building on our last example (in {@tutorial conceptJoin}), we can
accomplish this new requirement by simply adding yet another reducer
to our reduceWidget function.

```JavaScript
import * as Redux         from 'redux';
import * as AstxReduxUtil from 'astx-redux-util';
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';
import Widget             from '../appReducer/Widget';

export default AstxReduxUtil.joinReducers(
  // FIRST: determine content shape (i.e. {} or null)
  AstxReduxUtil.reducerHash({
    "widget.edit":       (widget, action) => action.widget,
    "widget.edit.close": (widget, action) => null
  }),

  AstxReduxUtil.conditionalReducer(
    // NEXT: maintain individual x/y fields
    //       ONLY when widget has content (i.e. is being edited)
    (widget, action, originalReducerState) => widget !== null,
    AstxReduxUtil.joinReducers(
      Redux.combineReducers({
        x,
        y,
        curHash: placeboReducer
      }),
      AstxReduxUtil.conditionalReducer(
        // LAST: maintain curHash
        //       ONLY when widget has content (see condition above) -AND- has changed
        (widget, action, originalReducerState) => originalReducerState !== widget,
        (widget, action) => {
          widget.curHash = Widget.hash(widget); // OK to mutate (because of changed instance)
          return widget;
        })
    )
  ),

  null); // initialState

// placeboReducer WITH state initialization (required for Redux.combineReducers())
function placeboReducer(state=null, action) {
  return state;
}
```

This represents a very comprehensive example of how **Reducer
Composition** can **simplify your life**!  We have combined 3
sub-reducers into one, applying conditional logic as needed through
functional decomposition!

**Please NOTE**:

1. The curHash should only be maintained when the widget **has
   content** (i.e. non-null), -AND- **has changed** .  

   - The former condition is accomplished through conditionalReducer
     **nesting**.  In other words, the outer conditionalReducer insures
     the widget is non-null.

   - The latter condition utilizes the `originalReducerState`
     parameter to determine when the widget has changed from ANY of
     the prior sub-reducers.  This parameter is useful when multiple
     reducers are combined, because it represents the state prior to
     the start of reduction process.  Please refer to the {@tutorial
     originalReducerState} discussion for more insight.

2. Contrary to any **red flags** that may have been raised on your
   initial glance of the code, **it is OK** to mutate the `widget`
   state in the last reducer, because we know one of the prior
   reducers has injected a new widget instance (via the
   `originalReducerState !== widget` condition).

3. The placeboReducer is slightly different than lodash.identity in
   that it defaults the state parameter to null.  

   This is required in conjunction
   [Redux.combineReducers()](http://redux.js.org/docs/api/combineReducers.html),
   and is related to our technique of maintaining curHash in the
   parent widget reducer (*which has visibility to all widget
   properties*), verses using an individual property reducer (*which
   does NOT have visibility to other widget properties*).

   The placeboReducer works around the following
   [Redux.combineReducers()](http://redux.js.org/docs/api/combineReducers.html)
   issues:

   - with NO curHash entry ... 
         WARNING:
         Unexpected key "curHash" found in previous state received by the reducer.
         Expected to find one of the known reducer keys instead: "x", "y".
         Unexpected keys will be ignored.

   - with curHash entry, using lodash.identity ...
         ERROR:
         Reducer "curHash" returned undefined during initialization.
         If the state passed to the reducer is undefined, you must explicitly return the initial state.
         The initial state may not be undefined.

   - with curHash entry, using placeboReducer ...
         Life is GOOD!
