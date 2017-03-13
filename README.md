# astx-redux-util (gh-pages branch)


This gh-pages branch is auto-published to our GitHub Project Page.

Doc related content include:

## gh-pages branch

```
{project-root}/

  .gitignore   ... ignores: /dist, /docs, and /node_modules (COMMON to BOTH master/feature -and- gh-pages branches)
  CNAME        ... DNS registry our js.org sub-domain (mastered in gh-pages branch only)
  README.md    ... readme specific to gh-pages branch
  index.html   ... redirect to latest version of astx-redux-util (mastered in gh-pages branch only)

  # project documentation
  # manually synced TO: gh-pages branch FROM: master/feature branch (docs/ directory)
  {project-version}/ ... versioned doc containers (supports many ... i.e. version history)
    *.html
    *.js
    *.css

  # docs/ are LOCAL (i.e. NOT Checked In)
  # simply retained in developer workspace from master/feature branch build (via "npm run docs")
  docs/                ... machine generated docs
    *.html
    *.js
    *.css
```



## master/feature branch

```
{project-root}/

  .gitignore   ... ignores: dist/ ... docs/ ... node_modules/ (COMMON to BOTH master/feature -and- gh-pages branches)
  package.json ... various npm scripts, INCLUDING docs generation
  README.md    ... readme specific to master/feature branch

  src/                 ... project source code (JSDoc JavaScript scan root)
    *.js               ... embedded JS JavaDoc drives our API documentation

    docs/
      jsdoc.conf.json  ... JSDoc configuration options (referenced in "npm run docs" script)
      home.md          ... top-level doc entry point (generating the index.html)
      guide/           ... container for User Guide source (md)
        toc.json       ... JSDoc tutorial definition (provides meaning to the *.md resources)
        *.md           ... JSDoc tutorials (User Guide pages)

  # docs/ are LOCAL (i.e. NOT Checked In)
  # simply retained in developer workspace from master/feature branch build (via "npm run docs")
  docs/                ... machine generated docs
    *.html
    *.js
    *.css
```
