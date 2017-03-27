There are many reasons to extend the capabilities of any utility.  It
may be a specific proprietary requirement or a common cross-cutting
concerns such as timing, logging, etc.  In either case, extending a
collective utility provides value-added semantics that are centrally
applied.

The reducer composition utilities promoted by astx-redux-util are
higher-order reducers, in that their invocation returns other
functions (reducers).  Such utilities are typically expanded by
wrapping them.  In the case of higher-order functions (hof), this
includes wrapping both the hof (the creator) and the returned function
(the created).


## The Extension

The basic template for this process is shown here.  We enhance {@link
reducerHash}, by applying a hypothetical **foo** operation ...

```js
import AstxReduxUtil from 'astx-redux-util';

// value-added reducerHash.withFoo()
// ... a wrapper applying FOO to reducerHash() - a higher-order function (HOF)
//     - WITH an additional parameter:
//        * foo: {Foo} fooBar
AstxReduxUtil.reducerHash.withFoo = (foo, ...reducerHashArgs) => {

  // invoke the original reducerHash()
  const reducerFn = AstxReduxUtil.reducerHash(...reducerHashArgs);

  // wrap the resultant reducerFn to apply our value-added FOO
  return (...reducerArgs) => {

    // NOTE: we have access to foo, reducerHashArgs, and reducerArgs!!!

    // ... before logic here (if any)

    // invoke the original reducerFn()
    const nextState  = reducerFn(...reducerArgs);

    // ... after logic here (if any)

    return nextState;
  };

};
```

The inline comments should be self-explanatory, but here are some
high-level points of interest:

- The `withFoo()` extension is cataloged on the reducerHash function
  itself, making it directly available from the 'astx-redux-util'
  import.  You may choose to make this it's own separate module.

- The **foo** process requires addition information (i.e. a Foo
  object) which is passed as a parameter, along with the reducerHash
  parameters.

- The wrapper invokes the underlying reducerHash function, and in
  turn, wraps the created reducer function.

- The reducer wrapper is where the real enhancement is implemented.

  * We ultimately invoke the original reducerFn(), but have the
    opportunity to both **pre** and **post** process this invocation,
    with what ever logic we wish.

  * Our wrapper has access to the new foo parameter, in addition to
    the standard parameters of this utility (both reducerHashArgs and
    reducerArgs).


## Usage

From a **usage perspective**, we simply replace `reducerHash()` invocations
with `reducerHash.withFoo()` and pass the appropriate foo parameter in
addition to the reducerHash arguments.

```js
import { reducerHash } from 'astx-redux-util';

const foo = ...;

export default reducerHash.withFoo(foo, {
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
}, null);
```
