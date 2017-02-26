'use strict'

import conditionalReducer   from './reducer/conditionalReducer';
import joinReducers         from './reducer/joinReducers';
import reducerHash          from './reducer/reducerHash';


//*** 
//*** Promote all library utilities through a single module.
//*** 

// NOTE: This non-default export supports ES6 imports.
//       Example:
//         import { reducerHash } from 'astx-redux-util';
//       -or-
//         import * as AstxReduxUtil     from 'astx-redux-util';
export {
  conditionalReducer,
  joinReducers,
  reducerHash,
};

// NOTE: This default export supports CommonJS modules (otherwise Babel does NOT promote them).
//       Example:
//         const { reducerHash } = require('astx-redux-util');
//       -or-
//         const AstxReduxUtil          = require('astx-redux-util');
export default {
  conditionalReducer,
  joinReducers,
  reducerHash,
};
