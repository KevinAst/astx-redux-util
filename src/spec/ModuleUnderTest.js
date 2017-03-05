import moduleFromDevSrc    from '../index';
import moduleFromBundle    from '../../dist/astx-redux-util';
import moduleFromBundleMin from '../../dist/astx-redux-util.min';


/*
 * This export module allows our unit tests to dynamically reference
 * different module platforms (i.e. the JS module ecosystem), which
 * will eventually be published to npm.
 * 
 * It should be used by ALL our unit tests (as opposed to directly
 * importing the module from src).
 * 
 * It exports the module under test, as controlled by the MODULE_PLATFORM
 * environment variable. Supported platforms (JS module ecosystems) are:
 * 
 *   MODULE_PLATFORM (env var):
 *                                                          DEFAULT (when platform is omitted):
 *     src .......... the development ES6 source .......... found in src/*.js
 *     bundle ....... the bundled ES5 resource ............ found in dist/{project}.js
 *     bundle.min ... the bundled/minified ES5 resource ... found in dist/{project}.min.js
 *     es ........... the transpiled ES5 source with ES bindings ......... found in es/*.js
 *     lib .......... the transpiled ES5 source with CommonJS bindings ... found in lib/*.js
 *     all .......... all of the above (ONLY DEFINED IN npm scripts)
 * 
 * NOTE: Due to the static nature of ES6 imports, this is the closest
 *       thing we can get to dynamic imports!
 * 
 *       We basically import ALL variations (see above) and dynamically
 *       promote just one of them.
 * 
 *       The only QUIRKY thing about this technique, is that all platforms
 *       must pre-exist, even to test just one of them ... because the
 *       static import (above) will fail!
 * 
 *       As it turns out, this is NOT that big a deal, as all you have to
 *       do is (especially after an "npm run clean"):
 *         $ npm run build:all
 */


//***
//*** dynamically define our moduleUnderTest (dynamically driven from the MODULE_PLATFORM env var)
//***

const { MODULE_PLATFORM } = process.env;

let moduleUnderTest = moduleFromDevSrc;

switch (MODULE_PLATFORM) {
  case 'src':
  case undefined:
    console.log(`*** Testing Module Platform found in: src/*.js (MODULE_PLATFORM: ${MODULE_PLATFORM})`); // eslint-disable-line no-console
    moduleUnderTest = moduleFromDevSrc;
    break;
  case 'bundle':  
    console.log(`*** Testing Module Platform found in: dist/astx-redux-util.js (MODULE_PLATFORM: ${MODULE_PLATFORM})`); // eslint-disable-line no-console
    moduleUnderTest = moduleFromBundle;
    break;
  case 'bundle.min':  
    console.log(`*** Testing Module Platform found in: dist/astx-redux-util.min.js (MODULE_PLATFORM: ${MODULE_PLATFORM})`); // eslint-disable-line no-console
    moduleUnderTest = moduleFromBundleMin;
    break;
  // TODO: add support for ALL platforms (once our build accomidates them)
  default:
    throw new Error(`*** ERROR *** moduleUnderTest(): Unrecognized MODULE_PLATFORM environment variable value: ${MODULE_PLATFORM}`);
}

export default moduleUnderTest;
