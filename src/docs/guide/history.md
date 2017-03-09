This project adheres to [Semantic Versioning](http://semver.org/).
Each release, along with migration instructions, is documented on this
page. **Please Note:** The Revision History found here **ONLY** covers
the history up to this release.  In order to view **ALL Revision
History**, please refer to the [latest astx-redux-util
release](https://astx-redux-util.js.org), and/or the [Github Release
Notes](https://github.com/KevinAst/astx-redux-util/releases).

<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/astx-redux-util.svg?branch=master)](https://travis-ci.org/KevinAst/astx-redux-util)
[![NPM Version Badge](https://img.shields.io/npm/v/astx-redux-util.svg)](https://www.npmjs.com/package/astx-redux-util)


<!-- ONLY activated when there are MULTIPLE versions -->
## Summary:

Release | Description
------- | -----------
&bull; [v0.2.0](#v0.2.0) | Added support for initialState *(Mar ??, 2017)*
&bull; [v0.1.0](#v0.1.0) | Initial Release *(Mar 8, 2017)*




## Details ...



<!-- ************************************************************* -->
<h4 class="name" id="v0.2.0">v0.2.0 - Added support for initialState *(Mar ??, 2017)*</h4>

[Full Docs](https://astx-redux-util.js.org/0.2.0)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.2.0)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.2.0)

??? RUNNING NOTES HERE

This release adds support for the `initialState` parameter in each of
the reducer composition utilities.

This parameter defines the initial fall-back state value during the
state initialization boot-strap process.

In general, redux expects your state to have concrete values
(i.e. something other than `undefined`).  This means that the
reduction entry point to each state element should define a default.
Keeping this in mind, the `initialState` parameter is optional,
because some reducers (when combined in a composition) are "by design"
intended to be mid-stream processors (i.e. NOT the reduction entry
point).

??? The ABOVE discussion (in some way) needs to be in the User Guide
(or a new pseudo type), AND referenced in the API parameter.

As is turns out, **this simplifies the examples** found in the
[astx-redux-util v0.1.0](https://astx-redux-util.js.org/0.1.0)
release, in that NO app-supplied wrapper function is needed for the
sole purpose of providing this initial value ... rather: the
`initialState` can be specified directly as a parameter to the
astx-redux-util function.


<!-- ************************************************************* -->
<h4 class="name" id="v0.1.0">v0.1.0 - Initial Release *(Mar 8, 2017)*</h4>

[Full Docs](https://astx-redux-util.js.org/0.1.0)
&bull;
[GitHub Release](https://github.com/KevinAst/astx-redux-util/releases/tag/v0.1.0)
&bull;
[GitHub Content](https://github.com/KevinAst/astx-redux-util/tree/v0.1.0)

**Holy Guacamole Batman!** ... *This commit has no parents!!*
