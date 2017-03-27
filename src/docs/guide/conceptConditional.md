There are times where you may wish to conditionally apply a reduction.

There can be many reasons for this.  Take a simple example where you
wish to bypass a reduction process upon determination that an action
will not impact an entire branch of your state tree.  In this example
the conditional aspect is purely an optimization.

This can be accomplished through the {@link conditionalReducer} utility. 

```js
import * as Redux         from 'redux';
import identity           from 'lodash.identity';
import * as AstxReduxUtil from 'astx-redux-util';
import x                  from '../appReducer/x';
import y                  from '../appReducer/y';

export default AstxReduxUtil.conditionalReducer(
  // conditionally apply when action.type begins with 'widget.edit'
  (curState, action, originalReducerState) => action.type.startsWith('widget.edit'),
  Redux.combineReducers({
    x,
    y
  }), identity, {});
```

Here we only invoke the supplied reducer
([Redux.combineReducers](http://redux.js.org/docs/api/combineReducers.html))
when the action.type begins with 'widget.edit'.  In our contrived
example, our action types are organized with a federated namespace, so
it is easy to isolate which actions will impact various parts of our
state.

**Please Note** that a `{}` {@link InitialState} value is applied in
this reduction, which provides the fall-back state value during the
state initialization boot-strap process.

**Also Note:** that normally it is not necessary to supply the
`elseReducerFn` {@link conditionalReducer} parameter (the third),
because it defaults to the [identity
function](https://lodash.com/docs#identity) function, which retains
the state for a falsy directive.  In this case however, we had to
manually pass the identity function, in order to supply the subsequent
{@link InitialState} parameter.

**More to Come:** This example is merely intended to introduce you to
the concept of conditional reduction.  It is somewhat "contrived",
allowing us to discuss the topic in isolation.  In reality, this
example may be inappropriate because the optimization is minimal, and
it tends to make the code more brittle.  Keep in mind, however,
**there are more legitimate reasons to apply conditional reduction**
... we will see this in subsequent discussions.
