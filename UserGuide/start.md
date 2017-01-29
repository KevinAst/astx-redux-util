## Install

```shell
npm install --save astx-redux-util
```


## Setup

All functions are exposed through BOTH default and non-default
semantics.  Access is therefore provided through the following
options:


### ES6 Import

```JavaScript
  import { reducerHash, joinReducers }  from 'astx-redux-util';

  // ... use reducerHash(...)
  // ... use joinReducers(...)
```

**... or**

```JavaScript
  import * as AstxReduxUtil from 'astx-redux-util';

  // ... use AstxReduxUtil.reducerHash(...)
  // ... use AstxReduxUtil.joinReducers(...)
```

**... or**

```JavaScript
  import AstxReduxUtil from 'astx-redux-util';

  // ... use AstxReduxUtil.reducerHash(...)
  // ... use AstxReduxUtil.joinReducers(...)
```


### CommonJS

```JavaScript
  const { reducerHash, joinReducers } = require('astx-redux-util');

  // ... use reducerHash(...)
  // ... use joinReducers(...)
```

**... or**

```JavaScript
  const AstxReduxUtil = require('astx-redux-util');

  // ... use AstxReduxUtil.reducerHash(...)
  // ... use AstxReduxUtil.joinReducers(...)
```
