# astx-redux-util

The [astx-redux-util] library promotes several redux reducer
composition utilities.  

Reducer composition is not new.  Redux itself provides the innovative
[combineReducers](http://redux.js.org/docs/api/combineReducers.html)
utility which allows you to blend individual reducers together to build
up the overall shape of your application state.

The most prevalent [astx-redux-util] utility is **reducerHash()**,
which allows you to combine sub-reducers in such a way as to eliminate
the switch statement commonly used to delineate action type.  

**Additionally**, [astx-redux-util] promotes other reducer compositions that
can be used in conjunction with one another.


## Comprehensive Documentation

Complete documentation can be found at
https://astx-redux-util.js.org/, which includes both **API** details,
and a **User Guide** with full and thorough **examples**!


## Install

```shell
npm install --save astx-redux-util
```


## Usage

```JavaScript
import { reducerHash } from 'astx-redux-util';

const reduceWidget = reducerHash({
  "widget.edit":       (widget, action) => action.widget,
  "widget.edit.close": (widget, action) => null,
});

export default function widget(widget=null, action) {
  return reduceWidget(widget, action);
}
```


[astx-redux-util]: https://astx-redux-util.js.org/
