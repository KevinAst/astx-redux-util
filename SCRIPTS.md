# NPM Scripts

The following npm scripts are available for this project.

??? IF THIS WORKS, remove ALL comments in package.json

start ... convenience alias to 'dev' (that launches development process)

dev ... launch development process in parallel (continuous build/test)
        NOTE: development process REALLY only needs 'continuous testing',
              HOWEVER an advantage of the continuous build is that auto-linting is performed!

build .......... bundle executable resources for publication (same as 'build:for:bundle')
build:watch  ... ditto (continuously)

build:for:{platform} ... bundle executable resources on specified module platform (see [Target Platform](#target-platform))
build:for:bundle
build:for:bundle.min
build:for:lib
build:for:es
build:for:all
build:clean ............ clean all machine-generated build directories

test ... run unit tests (same as 'build:on:src')

test:lib ............. run unit tests that are part of our published library
test:lib:watch ....... ditto (continuously)
test:samples ......... run unit tests that are from our sample code (seen in User Guide)
test:samples:watch ... ditto (continuously)
test:all ............. run ALL our unit tests
test:all:watch ....... ditto (continuously)

test:on:{platform} ... run ALL unit tests on specified module platform (see [Target Platform](#target-platform))
test:on:src
test:on:bundle
test:on:bundle.min
test:on:lib
test:on:es
test:on:all

docs ....    build documentation (from JavaDoc comments (src/*.js), and User Guide (src/docs)
docs:clean ..... clean the machine-generated docs directory

lint ..... verify code quality
           NOTE: This lints both production and test code
                 real-time linting is also accomplished through our WebPack bundler (via 'build:watch')!

clean ... cleans ALL machine-generated directories (build, and docs)




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
