This sidebar discussion provides some insight into
**originalReducerState** (*mostly an internal implementation detail*).

A fundamental problem in sequentially joining reducers is that each
reducer should be able to build on what has been accomplished by a
prior reducer.  In essence it is an accumulative process.

The {@link joinReducers} utility handles this by cumulatively passing the
state parameter that was returned from any prior reducer (in the chain
of reducers to execute).

While this does NOT relax the immutable constraint of the reducer's
state parameter, it is possible for a down-stream reducer to receive a
state parameter that is a different instance from the start of the
reduction process (because an up-stream reducer needed to alter it in
some way).

As it turns out, this is typically NOT a concern to a client, rather
merely an implementation detail.

There are edge cases, however, where a client needs visibility to the
**originalReducerState**: *the immutable state at the start of the
reduction process*.  One case in particular is determining that state
has changed within a series of reductions (i.e. {@link joinReducers}),
because each individual reducer only has visibility of the state
within it's own reduction process.  This case is higlighted in
{@tutorial fullExample}.

As a result, the **originalReducerState** is **publicly exposed** as
the 3rd parameter to the {@link conditionalReducerCB} function (the
{@link conditionalReducer} callback parameter that makes this
determination).

Internally, the way in which astx-redux-util manages the
originalReducerState is by passing it as a 3rd parameter to any
reducer it is in control of (i.e. invokes).  While from a redux
perspective, this is non-standard, it doesn't really hurt, because
reducer functions are NOT reasoning about a 3rd parameter.  The only
risk is if redux should (at some future point) start to employ
additional reducer parameters.

By an overwhelming majority of the time (99.9%), **you should seldom have
to worry about how originalReducerState is maintained**, because
astx-redux-util does this for you.

**The only time any of this concerns you** is if your application
reducer invokes one of the astx-redux-util reducers.  In this case
(which is rare), your code is responsible for passing
originalReducerState (the 3rd reducer parameter) to the downstream
reducer.
