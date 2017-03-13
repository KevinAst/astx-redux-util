# astx-redux-util

The [astx-redux-util] library promotes several redux reducer
composition utilities, which blend multiple reducers together forming
a richer abstraction through functional decomposition
(i.e. higher-order functions).

Reducer composition is not new.  Redux itself provides the innovative
[combineReducers](http://redux.js.org/docs/api/combineReducers.html)
utility which allows you to fuse individual reducers together to build
up the overall shape of your application state.

The most prevalent [astx-redux-util] utility is **reducerHash()**,
which lets you combine sub-reducers in such a way as to eliminate
the switch statement commonly used to delineate action type.  

**Additionally**, [astx-redux-util] promotes other reducer compositions that
can be used in conjunction with one another.

<!--- Badges for CI Builds ---> 
<!--- TODO: ?? point to master branch ---> 
[![Build Status](https://travis-ci.org/KevinAst/astx-redux-util.svg?branch=master)](https://travis-ci.org/KevinAst/astx-redux-util)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/astx-redux-util/badge.svg)](https://snyk.io/test/github/kevinast/astx-redux-util)
[![NPM Version Badge](https://img.shields.io/npm/v/astx-redux-util.svg)](https://www.npmjs.com/package/astx-redux-util)

## Comprehensive Documentation

Complete documentation can be found at
https://astx-redux-util.js.org/, which includes both **API** details,
and a **User Guide** with full and thorough **examples**!


## Install

```shell
npm install --save astx-redux-util
```


## Examples

### Basics

The following example uses **reducerHash()** to combine a set of
sub-reducer functions (indexed by the standard action.type),
eliminating the switch statement commonly used to delineate action
type.

**Don't miss the [astx-redux-util] documentation**, *which fully explores
this example, and details the API.*

```js
import { reducerHash } from 'astx-redux-util';

export default reducerHash({
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
}, null);
```


### Joining Reducers

Building on the previous example, our widget now takes on more detail:
 - we manage x/y properties (through the standard
   [combineReducers](http://redux.js.org/docs/api/combineReducers.html))
 - the widget itself can take on a null value (an indication it is NOT
   being edited)

We manage these new requirements by combining multiple reducers
through a functional decomposition (as opposed to procedural code).
To accomplish this, we add to our repertoire by introducing
**joinReducers()** and **conditionalReducer()**.

**Don't miss the [astx-redux-util] documentation**, *which fully explores
this example, and details the API.*

```js
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

### Full Example

Building even more on the prior examples:
 - our widget adds a curHash property (which is a determinate of
   whether application content has changed)

We manage this new property in the parent widget reducer, because it
has a unique vantage point of knowing when the widget has changed
(under any circumstance, regardless of how many properties are
involved).

We accomplish this by simply combining yet another reducer (using a
functional approach).  This also demonstrates how **composition can be
nested!**

**Don't miss the [astx-redux-util] documentation**, *which fully explores
this example, and details the API.*

```js
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
Composition** can **simplify your life**!  We have combined multiple
reducers into one, applying conditional logic as needed through
functional decomposition!


[astx-redux-util]: https://astx-redux-util.js.org/
