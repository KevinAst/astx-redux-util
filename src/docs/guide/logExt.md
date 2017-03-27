As a concrete example of extending astx-redux-util, let's explore a
real-world logging extension.  This example is taken directly from my
[GeekU](https://github.com/KevinAst/GeekU) app *(a sandbox project I use
to study various technologies and frameworks)*.

As it turns out, {@link reducerHash} is a **very central component to
most state changes**.  An overwhelming majority of time that state
changes, it is accomplished by a handler that passes through {@link
reducerHash}.  *In other words the {@link reducerHash} is a clearing
house for most state changes*.  In addition, {@link reducerHash} has a
distinct advantage of knowing several unique operational aspects, such
as:

 - whether a handler wishes to operate on the state
 - and the before/after state of a handler operation

As a result, {@link reducerHash} can play a key roll in implementing a
centralized reducer-based logging utility.  The logging extension
shown here achieves the following advanced characteristics:
 - a central location to log reduction-based probes
 - promotes a standardized format for reduction-based probes
 - dynamically alters the logging probe level based on whether
   the state has changed or not

This last point is a **key feature**.  The probe's logging level is
dynamically determined, based on whether the state has changed, and/or
whether a reducer-specific handler wishes to communicate some
information.  The **advantage** of this dynamic is that it **allows logging
filters to be configured at a very high-level** (i.e. for ALL reducers)
**with minimal output**, because the INSPECT level focuses exclusively on
reducers that have changed state.  This is a VERY USEFUL feature!

Logging levels that are used are:

```
INSPECT: monitor state changes only
DEBUG:   includes explicit reducer logic regardless of state changes
         ... monitors WHICH reducer reasoned about an action
TRACE:   includes ALL reducer enter/exit points 
         ... NOT much value: shows ALL state reducer
```

## SideBar: Logging

While logging may not be as fashionable as it once was, I believe that
logging can provide valuable insight into both development and
production diagnostics.

When it comes to state changing diagnostic tools, utilities such as
[redux-devtools](https://github.com/gaearon/redux-devtools) **provide
invaluable insight into state changes**, and can be used without any
tooling in your application code.  With that in mind, **logging** (when
done right) can **provide additional insight into "why" a state change
occurred**.

There are many logging utilities available.  A few features to
consider in your evaluation:

 - filterable probes, allowing each module to have an identity that is filterable
 - interactive configuration (out-of-the-box)
 - efficient pruning (minimizing probe overhead)
 - configurable 
   * filter levels
   * output format
   * output destination
 - etc.




## Extending reducerHash

Our logging extension wraps {@link reducerHash} as follows
([astx-redux-util_loggerPolyfill.js](https://github.com/KevinAst/GeekU/blob/master/src/client/startup/astx-redux-util_loggerPolyfill.js)):

<script src="https://gist.github.com/KevinAst/a0d7059d10da278b8fc50f1fbd7a3be2.js"></script>

The inline comments should be self-explanatory, but here are some
high-level points of interest:

- The `withLogging` extension is cataloged on the {@link reducerHash}
  function itself, making it directly available from the
  'astx-redux-util' import.  You may choose to make this it's own
  separate module.

- The logging process requires addition information (i.e. the log
  object) which is passed as a parameter, along with the {@link reducerHash}
  parameters.  The log's filterName is assumed to be the state element
  name.

- The wrapper invokes the underlying {@link reducerHash} function, and in
  turn, wraps the created reducer function.

- The **reducer wrapper** is where the **real enhancement is implemented**.

  * The **expectations of each handler is enhanced** by allowing it to
    promote BOTH the **nextState**, along with a **logging probe** (which
    makes up part of the overall probe).  An array is used to
    accumulate both these pieces of information.

  * The logging probe is generated through the enhanced
    log.reducerProbe() method *(detailed next)*.



## log.reducerProbe()

We also polyfill our Log object with the `log.reducerProbe()` method
that standardizes ALL reducer-related logging probes
([astx-redux-util_loggerPolyfill.js](https://github.com/KevinAst/GeekU/blob/master/src/client/startup/astx-redux-util_loggerPolyfill.js)):

<script src="https://gist.github.com/KevinAst/039f7279fe5deb445b003fae045bf029.js"></script>

A **key aspect** passed to this method is **an indicator of whether the
state has changed**, which dynamically alters the logging level, as
follows:

```
INSPECT: monitor state changes only
DEBUG:   includes explicit reducer logic regardless of state changes
         ... i.e. monitor WHICH reducer reasoned about an action
TRACE:   includes ALL reducer enter/exit points 
         (NOT much value, shows ALL state reducer)
```



## Usage

From a usage perspective, simply replace `reducerHash()` invocations
with `reducerHash.withLogging()` and pass the appropriate log
parameter in addition to the reducerHash arguments.

The following reducer is the real code that our {@tutorial
fullExample} was derived from *(conceptually replace `widget` with
`selCrit`)*.  The actual code can be found at
[appState.editSelCrit.selCrit.js](https://github.com/KevinAst/GeekU/tree/master/src/client/state/appState.editSelCrit.selCrit.js)
*(all reducers are found at
[GeekU/src/client/state](https://github.com/KevinAst/GeekU/tree/master/src/client/state))*.

<script src="https://gist.github.com/KevinAst/d1d179fea13d4f86f461d63cd7eeeabf.js"></script>

Notice:

- By using `reducerHash.withLogging()` we tap into our centralized
  reducer-based logging utility.
  
- Each reducerHash handler, now returns both the **nextState** along
  with a **logging probe** *(wrapped in an array)*.

- The `log4curHash.reducerProbe()` can also be used outside of
  reducerHash() control *(promoting standardized reducer-based logging
  probes anywhere)*.


## Demo

By way of demonstration, a picture is worth a thousand words.  Our
logger has a **hidden easter egg** that when invoked, **activates an
interactive logging configuration dialog**.

<img src="logConfigDialog.png" width="90%">

By setting our appState root filter to INSPECT, our logging probes are
limited to **just the reducers that have changed state**:

<img src="logSample.png" width="90%">
