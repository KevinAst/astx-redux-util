# Getting Started

## Install

```shell
npm install --save astx-redux-util
```


## Access

All functions are exposed through [UMD](https://github.com/umdjs/umd),
and therefore accessable through any one of the following techniques ...


### ES6 Import (Native JS)

```js
import { reducerHash, joinReducers }  from 'astx-redux-util';
-OR-
import * as AstxReduxUtil from 'astx-redux-util';
-OR-
import AstxReduxUtil from 'astx-redux-util';

reducerHash(...)
joinReducers(...)
-OR-
AstxReduxUtil.reducerHash(...)
AstxReduxUtil.joinReducers(...)
```


### CommonJS

```js
const { reducerHash, joinReducers } = require('astx-redux-util');
-OR-
const AstxReduxUtil = require('astx-redux-util');

reducerHash(...)
joinReducers(...)
-OR-
AstxReduxUtil.reducerHash(...)
AstxReduxUtil.joinReducers(...)
```


### AMD

```js
define(['astx-redux-util', 'otherModule'], function(AstxReduxUtil, otherModule) {
  AstxReduxUtil.reducerHash(...)
  AstxReduxUtil.joinReducers(...)
});
```


### &lt;script&gt; tag

```
<script src="astx-redux-util.js"></script>

<script>
  AstxReduxUtil.reducerHash(...)
  AstxReduxUtil.joinReducers(...)
</script>
```
