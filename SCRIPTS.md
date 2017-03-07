# NPM Scripts

The following npm scripts are available for this project.

??? IF THIS WORKS, remove ALL comments in package.json

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

build .................. bundle library for publication (same as 'build:for:bundle')
build:watch  ........... ditto (continuously)

build:for:{platform} ... bundle library for specified Target Platform (see below)
build:for:bundle
build:for:bundle.min
build:for:lib
build:for:es
build:for:all
build:clean ............ clean all machine-generated build directories


TESTING
=======

test ................. run ALL unit tests on master src (same as 'test:all' or 'test:on:src')

                       Following runs SELECTED tests ON master src
                       ===========================================
test:lib ............. run unit tests that are part of our published library
test:lib:watch ....... ditto (continuously)
test:samples ......... run unit tests that are from our sample code (seen in User Guide)
test:samples:watch ... ditto (continuously)
test:all ............. run ALL our unit tests
test:all:watch ....... ditto (continuously)

                       Following runs ALL tests ON specified target
                       ============================================
test:on:{platform} ... run ALL unit tests on specified Target Platform (see below)
test:on:src
test:on:bundle
test:on:bundle.min
test:on:lib
test:on:es
test:on:all


DOCUMENTATION
=============

docs ......... build docs from JavaDoc comments (src/*.js), and User Guide (src/docs)
docs:clean ... clean the machine-generated docs directory


CODE QUALITY
============

lint ..... verify code quality
           NOTE: This lints both production and test code
                 real-time linting is also accomplished through our WebPack bundler (via 'build:watch')!


MISC
====

clean ... cleans ALL machine-generated directories (build, and docs)
```



## Target Platform

Some npm scripts target a platform (i.e. the JS module ecosystem),
using on/for nomenclature ... specifically:

 - build:for:{platform}
 - test:on:{platform}

Supported platforms are:

```
MODULE_PLATFORM  What                 Bindings  Found In               NOTES                             
===============  ===================  ========  =====================  ==================================
src              master ES6 source    ES        src/*.js               DEFAULT (when platform is omitted)
bundle           bundled ES5          CommonJS  dist/{project}.js                                        
bundle.min       bundled/minified ES5 CommonJS  dist/{project}.min.js                                    
lib              ES5 source           CommonJS  lib/*.js                                                 
es               ES5 source           ES        es/*.js                                                  
all              all of the above                                      APPLICABLE to npm scripts ONLY    
```

The on/for nomenclature helps disambiguate the difference between (for example):
 - test:all:    which identifies WHICH tests to run (i.e. all tests)
 - test:on:all: which identifies WHICH platform to run tests on (i.e. all platforms)
