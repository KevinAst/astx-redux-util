/*******************************************************************************
 * WebPack 2 Bundler Configuration: for a consumable library!
 * 
 * Requirements: 
 * ============
 * 
 *   - ES6 master (code maintained in ES6)
 * 
 *   - Consumable by least-common-denominator (ES5)
 *     * transpiled via babel
 * 
 *   - Bundle accessable through all module 
 *     * npm package (via $ npm install)
 * 
 *   - UMD (Universal Module Definition)
 *     ... Supporting ALL Module Environments, including:
 *     * ES6 Import (Native JS)
 *     * CommonJS
 *     * AMD
 *     * <script> tag
 * 
 *   - Lint
 *     * ?? via ESLint
 *
 * Process:
 *
 *      ES6 src
 *         |
 *         |
 *      WebPack 2
 *         |
 *         +--- Babel Transpiler / ESLint??
 *         |
 *         v
 *  Consumable Library (UMD/ES5)
 *
 *******************************************************************************/

const path        = require('path');

const devEnv  = true; // ?? interpret via some command-line or env var or some such thing

const libraryName = packageInfo.name;
const outFileName = libraryName + (devEnv ? '.min.js' : '.js');

const sourceMaps = 'source-map'; // ?? vary this based on prod/dev needs ... https://webpack.js.org/configuration/devtool/

const plugins = [];

// ??## http://survivejs.com/webpack/optimizing-build/minifying/
minifyOps = {
//compress: false, // default: true
  // (function e(t,r){if(typeof exports==="object"&&typeof module==="object")module.exports=r();else if(typeof define==="function"&&define.amd)define("astx-redux-util",[],r);else if(typeof exports==="object")exports["astx-redux-util"]=r();else t["astx-redux-util"]=r()})(this,function(){return function(e){var t={};function r(u){if(t[u])return t[u].exports;var n=t[u]={i:u,l:false,exports:{}};e[u].call(n.exports,n,n.exports,r);n.l=true;return n.exports}r.m=e;r.c=t;r.i=function(e){return e};r.d=function(e,t,u){if(!r.o(e,t)){Object.defineProperty(e,t,{configurable:false,enumerable:true,get:u})}};r.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};r.d(t,"a",t);return t};r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};r.p="";return r(r.s=4)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default=u;function u(e,t){return e}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default=u;function u(e,t){return function(r,u,n){return e(r,u,n)?t(r,u,n):r}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default=u;function u(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++){t[r]=arguments[r]}return function(e,r,u){if(u===undefined){u=e}return t.reduce(function(e,t){return t(e,r,u)},e)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.default=f;var u=r(0);var n=o(u);function o(e){return e&&e.__esModule?e:{default:e}}function f(e){var t=function t(r){return e[r.type]||n.default};return function(e,r){return t(r)(e,r)}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:true});t.reducerPassThrough=t.reducerHash=t.joinReducers=t.conditionalReducer=undefined;var u=r(1);var n=l(u);var o=r(2);var f=l(o);var i=r(3);var c=l(i);var d=r(0);var a=l(d);function l(e){return e&&e.__esModule?e:{default:e}}t.conditionalReducer=n.default;t.joinReducers=f.default;t.reducerHash=c.default;t.reducerPassThrough=a.default;t.default={conditionalReducer:n.default,joinReducers:f.default,reducerHash:c.default,reducerPassThrough:a.default}}])});
//compress: true, // default: true
  // !function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("astx-redux-util",[],t):"object"==typeof exports?exports["astx-redux-util"]=t():e["astx-redux-util"]=t()}(this,function(){return function(e){function t(r){if(u[r])return u[r].exports;var n=u[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,t),n.l=!0,n.exports}var u={};return t.m=e,t.c=u,t.i=function(e){return e},t.d=function(e,u,r){t.o(e,u)||Object.defineProperty(e,u,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var u=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(u,"a",u),u},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=4)}([function(e,t,u){"use strict";function r(e,t){return e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,u){"use strict";function r(e,t){return function(u,r,n){return e(u,r,n)?t(u,r,n):u}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,u){"use strict";function r(){for(var e=arguments.length,t=Array(e),u=0;u<e;u++)t[u]=arguments[u];return function(e,u,r){return void 0===r&&(r=e),t.reduce(function(e,t){return t(e,u,r)},e)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r},function(e,t,u){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function n(e){var t=function(t){return e[t.type]||c.default};return function(e,u){return t(u)(e,u)}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var o=u(0),c=r(o)},function(e,t,u){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.reducerPassThrough=t.reducerHash=t.joinReducers=t.conditionalReducer=void 0;var n=u(1),o=r(n),c=u(2),d=r(c),f=u(3),i=r(f),a=u(0),l=r(a);t.conditionalReducer=o.default,t.joinReducers=d.default,t.reducerHash=i.default,t.reducerPassThrough=l.default,t.default={conditionalReducer:o.default,joinReducers:d.default,reducerHash:i.default,reducerPassThrough:l.default}}])});


  beautify: true, // enable beautify with cr and indentation, etc. (makes more readable) and provides significane to traceback lines
  comments: false, // eliminate comments

  compress: false, // do NOT copress code ??? wha?
  // compress: { // compress code WITH specific options
  //   warnings: false,
  // },

  mangle: false, // ???

  // ? // Mangling specific options
  // ? mangle: {
  // ?   // Don't mangle $
  // ?   except: ['$'],
  // ? 
  // ?   // Don't care about IE8
  // ?   screw_ie8 : true,
  // ? 
  // ?   // Don't mangle function names
  // ?   keep_fnames: true,
  // ? }

};

if (devEnv) {
  plugins.push ( new webpack.optimize.UglifyJsPlugin(minifyOps) ); // ??## see parameter options ... ex: { minimize: true }
}

const config = {
  entry:           path.resolve(__dirname, 'src/index.js'), // the traversal entry point
  devtool:         sourceMaps,
  output: {
    path:          path.resolve(__dirname, 'dist'), // ex: {project}/dist
    filename:      outFileName,                     // ex: astx-redux-util.min.js

    library:       libraryName, // bundle as a library (i.e. for external consumption)
    libraryTarget: 'umd',       // UMD compliance (Universal Module Definition) promotes library support for ALL module environments
    umdNamedDefine: true        // ditto ?? research diff with/without ?? research access via <script> -and- document
  },
  module: {
    rules: [
      // transpile (via babel) to ES5 least-common-denominator (master src utilizes ES6)
      { test: /\.(js|jsx)$/,  use: 'babel-loader'  }
      // ?? what about eslint-loader ... done here, or as a plugin?
    ]
  },
  plugins: plugins
};

module.exports = config;
