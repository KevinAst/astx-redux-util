# Revision History

This project adheres to [Semantic Versioning](http://semver.org/).
Each release, along with migration instructions, is documented on this
page. **Please Note:** The Revision History found here **ONLY** covers
the history up to this release.  In order to view **ALL Revision
History**, please refer to the [latest astx-redux-util
release](https://astx-redux-util.js.org), or the [Github Release
Notes](https://github.com/KevinAst/astx-redux-util/releases).

<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/astx-redux-util.svg?branch=master)](https://travis-ci.org/KevinAst/astx-redux-util)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b7e9e537a56e41a692aef023fd15d9ca)](https://www.codacy.com/app/KevinAst/astx-redux-util?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/astx-redux-util&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/b7e9e537a56e41a692aef023fd15d9ca)](https://www.codacy.com/app/KevinAst/astx-redux-util?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/astx-redux-util&amp;utm_campaign=Badge_Coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/astx-redux-util/badge.svg)](https://snyk.io/test/github/kevinast/astx-redux-util)
[![NPM Version Badge](https://img.shields.io/npm/v/astx-redux-util.svg)](https://www.npmjs.com/package/astx-redux-util)

<!-- ONLY activated when there are MULTIPLE versions -->
## Summary:

Release           | What                                   | *When*
------------------|----------------------------------------|------------------
[v0.4.0](#v0_4_0) | GitBook Docs                           | *Apr ??, 2017*
[v0.3.2](#v0_3_2) | Code Coverage Tooling                  | *Apr 6, 2017*
[v0.3.1](#v0_3_1) | Extension Support with Logging Example | *Mar 27, 2017*
[v0.3.0](#v0_3_0) | Parameter Validation                   | *Mar 13, 2017*
[v0.2.0](#v0_2_0) | Added support for initialState         | *Mar 9, 2017*
[v0.1.0](#v0_1_0) | Initial Release                        | *Mar 8, 2017*




## Details ...



<!-- ************************************************************* -->
<br/><br/><br/>
<h3 id="v0_4_0" style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  v0.4.0 - GitBook Docs <i>(Apr ??, 2017)</i>
</h3>
[Full Docs](https://astx-redux-util.js.org/0.4.0)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.4.0)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.4.0)

**NOTE**: This release is a documentation enhancement only. **The API
  is NOT impacted** in any way.

1. Documentation is now generated using GitBook (while still employing
   JSDoc for the API).  Read how this was accomplished here??
   reference gist -or- whatever

?? running log here







<!-- ************************************************************* -->
<br/><br/><br/>
<h3 id="v0_3_2" style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  v0.3.2 - Code Coverage Tooling <i>(Apr 6, 2017)</i>
</h3>
[Full Docs](https://astx-redux-util.js.org/0.3.2)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.3.2)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.3.2)

**NOTE**: This release is a tooling enhancement only. **The API is NOT
  impacted** in any way.

1. Introduce project code coverage, with badges for both grade and coverage.

1. Added pkgReview npm script that highlights any outdated installed packages and
   incorporate this into the check/prepublish scripts.





<!-- ************************************************************* -->
<br/><br/><br/>
<h3 id="v0_3_1" style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  v0.3.1 - Extension Support with Logging Example <i>(Mar 27, 2017)</i>
</h3>
[Full Docs](https://astx-redux-util.js.org/0.3.1)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.3.1)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.3.1)

**NOTE**: This release is a documentation enhancement only. **The API
          is NOT impacted** in any way.

1. The Dev Guide was refined to include {{book.guide.ext}} along with
   an extensive {{book.guide.logExt}} section, showing how
   {{book.api.reducerHash}} can play a key roll in implementing a
   centralized reducer-based logging utility.

1. {{book.guide.fullExample}} was streamlined, replacing the
   placeboReducer with an anonymous arrow function.



<!-- ************************************************************* -->
<br/><br/><br/>
<h3 id="v0_3_0" style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  v0.3.0 - Parameter Validation <i>(Mar 13, 2017)</i>
</h3>
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
   you wish to retain the docs locally*).  Please refer to the
   {{book.guide.dist}} section for more details.




<!-- ************************************************************* -->
<br/><br/><br/>
<h3 id="v0_2_0" style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  v0.2.0 - Added support for initialState <i>(Mar 9, 2017)</i>
</h3>
[Full Docs](https://astx-redux-util.js.org/0.2.0)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.2.0)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.2.0)

1. This release adds support for the {{book.api.InitialState}}
   parameter in each of the reducer composition utilities.

   This parameter optionally defines the fall-back state value used
   during the state initialization boot-strap process.

   In general, redux expects your state to have concrete values
   (i.e. something other than `undefined`).  This means that the
   reduction entry point to each state element should define a default.
   Keeping this in mind, the {{book.api.InitialState}} parameter is optional,
   because some reducers are "by design" (when combined in a composition)
   intended to be mid-stream processors (i.e. NOT the reduction entry
   point).

   As is turns out, **this simplifies the examples** found in the
   [astx-redux-util v0.1.0](https://astx-redux-util.js.org/0.1.0)
   release, in that NO app-supplied wrapper function is needed for the
   sole purpose of providing this initial value ... rather: the
   {{book.api.InitialState}} can be specified directly as a parameter
   to the astx-redux-util function.


<!-- ************************************************************* -->
<br/><br/><br/>
<h3 id="v0_1_0" style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  v0.1.0 - Initial Release <i>(Mar 8, 2017)</i>
</h3>
[Full Docs](https://astx-redux-util.js.org/0.1.0)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.1.0)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.1.0)

1. **Holy Guacamole Batman!** ... *This commit has no parents!!*
