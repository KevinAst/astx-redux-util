# astx-redux-util

The [astx-redux-util] library provides several redux reducer composition
utilities, of which the most prevalent is **reducerHash()** which
allows you to displace the dreaded switch statement ... **but there is
much more!**


## Documentation

Comprehensive documentation can be found at: [astx-redux-util].


## Install

```shell
npm install --save astx-redux-util
```


## Usage

```JavaScript
  import {reducerHash}  from 'astx-redux-util';

  const myReducer = reducerHash({
          [ActionType.widget.edit]       (widget, action) => action.widget,
          [ActionType.widget.edit.close] (widget, action) => null,
        });

  export default function widget(widget=null, action) {
    return myReducer(widget, action);
  }
```



## Don't Miss

For a more complete and thorough example of how these utilities can be
used, don't miss the **Full Documentation** at [astx-redux-util]
which includes the **Most Excellent Example**.


[astx-redux-util]: https://kevinast.github.io/astx-redux-util/
