'use strict'

import conditionalReducer   from './reducer/conditionalReducer';
import joinReducers         from './reducer/joinReducers';
import reducerHash          from './reducer/reducerHash';
import reducerPassThrough   from './reducer/reducerPassThrough';


// TODO: promote this doc through a JSDoc mechanism.

//*** 
//*** Promote all library utilities through a single module.
//*** 

// TODO: validate following examples are correct.

// NOTE: This non-default export supports ES6 imports.
//       Example:
//         import { reducerPassThrough } from 'astx-redux-util';
//       -or-
//         import * as AstxReduxUtil     from 'astx-redux-util';
export {
  conditionalReducer,
  joinReducers,
  reducerHash,
  reducerPassThrough,
};

// NOTE: This default export supports CommonJS modules (because Babel does NOT promote them otherwise).
//       Example:
//         const { reducerPassThrough } = require('astx-redux-util');
//       -or-
//         const AstxReduxUtil          = require('astx-redux-util');
//       -or-
//         import AstxReduxUtil         from 'astx-redux-util';
export default {
  conditionalReducer,
  joinReducers,
  reducerHash,
  reducerPassThrough,
};
