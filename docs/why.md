# Why astx-redux-util?

This section provides some insight into why astx-redux-util was
created, and how it compares to other similar utilities.

One of the astx-redux-util functions ({{book.api.reducerHash}}) is a stock
feature in other reducer libraries, such as [redux-actions
handleactions](https://www.npmjs.com/package/redux-actions#handleactionsreducermap-defaultstate).
With that said, astx-redux-util promotes other reducer compositions
that can be used in conjunction with one another.

**SideBar**: One underlying reason astx-redux-util was created was to provide my
initial exposure into npm publishing.  Because I am new to both Node and
GitHub, and I wanted a small project, where I could focus on the setup
and tooling required for publishing a micro-library.  This also
includes various aspects of project documentation (something that is
important to me).

The astx-redux-util library was pulled from a sandbox project
([GeekU](https://github.com/KevinAst/GeekU)) that I use to study
several technologies and frameworks.

I hope to eventually promote additional astx-redux-util functionality
from this sandbox.  One aspect in particular is related to managing
action creators with a twist: *consistently maintaining action types
in conjunction with their corresponding action creators*.

I hope you enjoy this effort, and comments are always welcome.

&lt;/Kevin&gt;
