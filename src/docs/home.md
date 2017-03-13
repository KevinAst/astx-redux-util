# astx-redux-util

The astx-redux-util library promotes several redux reducer composition
utilities, which blend multiple reducers together forming a richer
abstraction through functional decomposition (i.e. higher-order
functions).

Reducer composition is not new.  Redux itself provides the innovative
[combineReducers](http://redux.js.org/docs/api/combineReducers.html)
utility which allows you to fuse individual reducers together to build
up the overall shape of your application state.

The most prevalent astx-redux-util utility is {@link reducerHash},
which lets you combine sub-reducers in such a way as to eliminate
the switch statement commonly used to delineate action type.  

Additionally, astx-redux-util promotes other reducer compositions that
can be used in conjunction with one another.

<!--- Badges for CI Builds ---> 
[![Build Status](https://travis-ci.org/KevinAst/astx-redux-util.svg?branch=master)](https://travis-ci.org/KevinAst/astx-redux-util)
[![Known Vulnerabilities](https://snyk.io/test/github/kevinast/astx-redux-util/badge.svg)](https://snyk.io/test/github/kevinast/astx-redux-util)
[![NPM Version Badge](https://img.shields.io/npm/v/astx-redux-util.svg)](https://www.npmjs.com/package/astx-redux-util)

## At a Glance

- {@tutorial start} ... installation and access

- Concepts:

  - {@tutorial conceptHash} ... using {@link reducerHash}, eliminate
    the switch statement commonly found in reducers *("look ma, no
    switch")*

  - {@tutorial conceptConditional} ... using {@link
    conditionalReducer}, invoke a reducer only when certain
    constraints are met *("to reduce or NOT to reduce; that is the
    question")*

  - {@tutorial conceptJoin} ... using {@link joinReducers}, team up
    multiple reducers to promote higher order functionality *("working
    together is success" - Henry Ford)*

- {@tutorial fullExample} ... a more complete example employing many
  of the astx-redux-util utility functions

- {@tutorial originalReducerState} ... a sidebar discussion of
  originalReducerState

- {@tutorial why} ... why was astx-redux-util created, and how does it
  compare to other utilities

- {@tutorial logExt} ... conceptual extension for reducer-based
  centralized logging

- {@tutorial dist} ... where to find this utility (**and a local copy of the docs**)

- {@tutorial history} ... peruse various revisions

- {@tutorial LICENSE} ... legal stuff
