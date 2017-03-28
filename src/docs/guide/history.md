This project adheres to [Semantic Versioning](http://semver.org/).
Each release, along with migration instructions, is documented on this
page. **Please Note:** The Revision History found here **ONLY** covers
the history up to this release.  In order to view **ALL Revision
History**, please refer to the [latest astx-redux-util
release](https://astx-redux-util.js.org), or the [Github Release
Notes](https://github.com/KevinAst/astx-redux-util/releases).

<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/astx-redux-util.svg?branch=master)](https://travis-ci.org/KevinAst/astx-redux-util)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/astx-redux-util/badge.svg)](https://snyk.io/test/github/kevinast/astx-redux-util)
[![NPM Version Badge](https://img.shields.io/npm/v/astx-redux-util.svg)](https://www.npmjs.com/package/astx-redux-util)

<!-- ONLY activated when there are MULTIPLE versions -->
## Summary:

Release                  | What                                   | *When*
-------------------------|----------------------------------------|------------------
&bull; [v0.3.2](#v0.3.2) | TBD                                    | *Mar ??, 2017*
&bull; [v0.3.1](#v0.3.1) | Extension Support with Logging Example | *Mar 27, 2017*
&bull; [v0.3.0](#v0.3.0) | Parameter Validation                   | *Mar 13, 2017*
&bull; [v0.2.0](#v0.2.0) | Added support for initialState         | *Mar 9, 2017*
&bull; [v0.1.0](#v0.1.0) | Initial Release                        | *Mar 8, 2017*




## Details ...



<!-- ************************************************************* -->
<h4 class="name" id="v0.3.2">v0.3.2 - TBD *(Mar ??, 2017)*</h4>

[Full Docs](https://astx-redux-util.js.org/0.3.2)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.3.2)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.3.2)

?? running notes here ...

PROB NOT IMPORTANT ENOUGH TO MENTION:
 - changed "User Guide" to "Dev Guide" (missed references in README/SCRIPTS)



<!-- ************************************************************* -->
<h4 class="name" id="v0.3.1">v0.3.1 - Extension Support with Logging Example *(Mar 27, 2017)*</h4>

[Full Docs](https://astx-redux-util.js.org/0.3.1)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.3.1)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.3.1)

**NOTE**: This release is a documentation enhancement only. **The API
  is NOT impacted** in any way.

1. The Dev Guide was refined to include {@tutorial ext} along with an
   extensive {@tutorial logExt} section, showing how {@link
   reducerHash} can play a key roll in implementing a centralized
   reducer-based logging utility.

1. {@tutorial fullExample} was streamlined, replacing the
   placeboReducer with an anonymous arrow function.



<!-- ************************************************************* -->
<h4 class="name" id="v0.3.0">v0.3.0 - Parameter Validation *(Mar 13, 2017)*</h4>

[Full Docs](https://astx-redux-util.js.org/0.3.0)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.3.0)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.3.0)

1. Parameter validation is now performed on all function calls.  Invalid
   usage results in thrown exceptions.  **NOTE: The API is NOT impacted** in any way.

1. **SideBar**: Starting in this release, a distribution tarball
   (`astx-redux-util_{ver}tar.gz`) is promoted in the [GitHub Releases
   Page](https://github.com/KevinAst/astx-redux-util/releases), which
   contains various executable bindings **and documentation** (*should
   you wish to retain the docs locally*).  Please refer to the {@tutorial
   dist} section for more details.




<!-- ************************************************************* -->
<h4 class="name" id="v0.2.0">v0.2.0 - Added support for initialState *(Mar 9, 2017)*</h4>

[Full Docs](https://astx-redux-util.js.org/0.2.0)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.2.0)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.2.0)

1. This release adds support for the {@link InitialState} parameter in each of
   the reducer composition utilities.

   This parameter optionally defines the fall-back state value used
   during the state initialization boot-strap process.

   In general, redux expects your state to have concrete values
   (i.e. something other than `undefined`).  This means that the
   reduction entry point to each state element should define a default.
   Keeping this in mind, the {@link InitialState} parameter is optional,
   because some reducers are "by design" (when combined in a composition)
   intended to be mid-stream processors (i.e. NOT the reduction entry
   point).

   As is turns out, **this simplifies the examples** found in the
   [astx-redux-util v0.1.0](https://astx-redux-util.js.org/0.1.0)
   release, in that NO app-supplied wrapper function is needed for the
   sole purpose of providing this initial value ... rather: the
   {@link InitialState} can be specified directly as a parameter to the
   astx-redux-util function.


<!-- ************************************************************* -->
<h4 class="name" id="v0.1.0">v0.1.0 - Initial Release *(Mar 8, 2017)*</h4>

[Full Docs](https://astx-redux-util.js.org/0.1.0)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.1.0)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.1.0)

1. **Holy Guacamole Batman!** ... *This commit has no parents!!*
