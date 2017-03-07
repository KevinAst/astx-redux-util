# NPM Scripts

The following npm scripts are available for this project.

```
DEVELOPMENT
===========

start ... convenience alias to 'dev' (that launches development process)

dev ...... launch development process (continuous build/test)

           NOTE: This REALLY only needs continuous testing ('test:lib:watch'),
                 because that script targets the master src (i.e. no building
                 required).

                 HOWEVER an advantage of the continuous build is that
                 auto-linting is performed!


BUILDING
========

build .................. bundle library for publication (same as 'build:tar:bundle')
build:watch  ........... ditto (continuously)

build:tar:{platform} ... bundle library for specified Target Platform (see below)
build:tar:bundle
build:tar:bundle.min
build:tar:lib
build:tar:es
build:tar:all
build:clean ............ clean all machine-generated build directories


TESTING
=======

test .................. run ALL unit tests on master src (same as 'test:all' or 'test:tar:src')

                        Following runs SELECTED tests ON master src
                        ===========================================
test:lib .............. run unit tests that are part of our published library
test:lib:watch ........ ditto (continuously)
test:samples .......... run unit tests from our sample code (in the User Guide)
test:samples:watch .... ditto (continuously)
test:all .............. run ALL our unit tests
test:all:watch ........ ditto (continuously)

                        Following runs ALL tests ON specified target
                        ============================================
test:tar:{platform} ... run ALL unit tests on specified Target Platform (see below)
test:tar:src
test:tar:bundle
test:tar:bundle.min
test:tar:lib
test:tar:es
test:tar:all


DOCUMENTATION
=============

docs ......... build docs from JavaDoc comments (src/*.js), and User Guide (src/docs)
docs:clean ... clean the machine-generated docs directory


CODE QUALITY
============

lint ... verify code quality, linting BOTH production and test code.
         NOTE: Real-time linting is ALSO applied on production code
               through our WebPack bundler (via 'build:watch')!


MISC
====

clean ... cleans ALL machine-generated directories (build, and docs)
```



## Testing Dynamics

Our unit tests have the ability to dynamically target each of our
published platforms, through the `test:tar:{platform}` script (see the
Target Platform discussion below).

- During development, our tests typically target the master src
  directly, and continuously (through the `test:lib:watch` script).
  
- However, before any bundle is published, it is a good practice to run
  our test suite against each of the published bundles (through the
  `test:tar:all` script).

Testing dynamics is accomplished by our unit tests importing
ModuleUnderTest, which in turn dynamically exports the desired test
module, as controlled by the MODULE_PLATFORM environment variable.

**There is one slight QUIRK in this process** ... that is: *you must
build ALL supported platforms before you can test one of them*.

The reason for this is that ModuleUnderTest.js must import all the
platforms and then decide which one to export (due to the static
nature of ES6 imports).

As it turns out, **this is not a big deal**, it's just a bit of
un-expected behavior.

During development, our tests typically target the master src (which
doesn't require any re-building).  So the `build:tar:all` script does
NOT have to be run continuously ... just once, after a clean (to prime
the pump).




## Target Platform

Some npm scripts target a platform (i.e. the JS module ecosystem),
using 'tar' nomenclature (i.e. target).

Specifically:

 - `build:tar:{platform}`
 - `test:tar:{platform}`

Supported platforms are:

```
MODULE_PLATFORM  What                 Bindings  Found In               NOTES                             
===============  ===================  ========  =====================  =======================
src              master ES6 source    ES        src/*.js               DEFAULT
bundle           bundled ES5          CommonJS  dist/{project}.js                                        
bundle.min       bundled/minified ES5 CommonJS  dist/{project}.min.js                                    
lib              ES5 source           CommonJS  lib/*.js                                                 
es               ES5 source           ES        es/*.js                                                  
all              all of the above                                      Used in npm scripts ONLY
```

The 'tar' nomenclature helps disambiguate the difference between (for example):
 - `test:all:    ` identifies WHICH tests to run (i.e. all tests)
 - `test:tar:all:` identifies WHICH platform to run tests on (i.e. all platforms)
