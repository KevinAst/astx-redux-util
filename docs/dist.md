# Distribution

This utility is primarily distributed as an [npm
package](https://www.npmjs.com/package/astx-redux-util) (*simply `npm
install` and use it in your [Node.js](https://nodejs.org/en/)
development environment*).

As with any npm package, individual aspects of the install can be
obtained through unpkg.com:
[https://unpkg.com/astx-redux-util/](https://unpkg.com/astx-redux-util/)

In addition, the [GitHub Releases
Page](https://github.com/KevinAst/astx-redux-util/releases) contains a
tarball for each release (`astx-redux-util_{ver}tar.gz`) ... which
promotes various executable bindings **and documentation** (*should
you wish to retain the docs locally*).  The tarball contains the
following executable bindings (**it's your choice**):

```
                 Module
Directory  What  Bindings Notes
=========  ====  ======== ======================================
src/       ES6   ES       the master source
dist/      ES5   CommonJS a UMD bundle: astx-redux-util[.min].js
lib/       ES5   CommonJS transpiled from src/
es/        ES5   ES       transpiled from src/
docs/      HTML  N/A      documentation
```
