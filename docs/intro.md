# astx-redux-util ({{""|npmPackage("version")}})

The astx-redux-util library promotes several redux reducer composition
utilities, which blend multiple reducers together forming a richer
abstraction through functional decomposition (i.e. higher-order
functions).

Reducer composition is not new.  Redux itself provides the innovative
[combineReducers](http://redux.js.org/docs/api/combineReducers.html)
utility which allows you to fuse individual reducers together to build
up the overall shape of your application state.

The most prevalent astx-redux-util utility is {{book.api.reducerHash}},
which lets you combine sub-reducers in such a way as to eliminate
the switch statement commonly used to delineate action type.  

Additionally, astx-redux-util promotes other reducer compositions that
can be used in conjunction with one another.

<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/astx-redux-util.svg?branch=master)](https://travis-ci.org/KevinAst/astx-redux-util)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/b7e9e537a56e41a692aef023fd15d9ca)](https://www.codacy.com/app/KevinAst/astx-redux-util?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/astx-redux-util&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/b7e9e537a56e41a692aef023fd15d9ca)](https://www.codacy.com/app/KevinAst/astx-redux-util?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=KevinAst/astx-redux-util&amp;utm_campaign=Badge_Coverage)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/astx-redux-util/badge.svg)](https://snyk.io/test/github/kevinast/astx-redux-util)
[![NPM Version Badge](https://img.shields.io/npm/v/astx-redux-util.svg)](https://www.npmjs.com/package/astx-redux-util)

## At a Glance

- {{book.guide.start}} ... installation and access

- {{book.guide.concepts}}:

  - {{book.guide.conceptHash}} ... using {{book.api.reducerHash}}, eliminate
    the switch statement commonly found in reducers *("look ma, no
    switch")*

  - {{book.guide.conceptConditional}} ... using
    {{book.api.conditionalReducer}}, invoke a reducer only when
    certain constraints are met *("to reduce or NOT to reduce; that is
    the question")*

  - {{book.guide.conceptJoin}} ... using {{book.api.joinReducers}}, team up
    multiple reducers to promote higher order functionality *("working
    together is success" - Henry Ford)*

- {{book.guide.fullExample}} ... a more complete example employing many
  of the astx-redux-util utility functions

- {{book.api.ref}} ... details the low-level functional API

- {{book.guide.originalReducerState}} ... a sidebar discussion of
  originalReducerState

- {{book.guide.ext}} ... how would one extend astx-redux-util?

  - {{book.guide.logExt}} ... a concrete example of reducer-based
    centralized logging *("smarter logging")*


- {{book.guide.dist}} ... where to find this utility **(and a local
  copy of the docs)**

- {{book.guide.why}} ... why was astx-redux-util created, and how does it
  compare to other utilities

- {{book.guide.history}} ... peruse various revisions

- {{book.guide.LICENSE}} ... legal stuff
