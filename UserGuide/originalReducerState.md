The {@link conditionalReducer} function exposes an
"originalReducerState" parameter to it's ({@link conditionalReducerCB}).

The originalReducerState represents the immutable state at the time of
the start of the reduction process.  This is useful in determining
that state has changed within a series of reductions (see {@link joinReducers}), 
because each individual reducer only has visibility of the state
within it's own reduction process.

There is an example of this in the {@tutorial fullExample}.

Because this deals with how state changes over a series of reducers
(run in sequence), it is natural that the {@link joinReducers} utility
automatically maintains the originalReducerState.

By an overwhelming majority (99.9% of the time), you should never have
to worry about how this state is maintained, because {@link joinReducers} does
this for you.

With that said, the way in which originalReducerState is communicated
(internally), is by passing it as a 3rd parameter through the reducer
chain.  While from a redux perspective, this is non-standard, it
doesn't really hurt, because reducer functions are NOT reasoning about
a 3rd parameter.  The only risk is if redux should (at some
future point) start to employ additional reducer parameters.

Here are the significant take-away points of interest:

- If your {@link conditionalReducer} conditionalFn never reasons about
  originalReducerState:
  * Then you have NO worries whatsoever!

- If your {@link conditionalReducer} conditionalFn DOES reason about
  originalReducerState:

  * In the normal use case (where your {@link conditionalReducer} is
    orchestrated by a {@link joinReducers} - in the first order), then you
    STILL have NOTHING to worry about!

    **Please Note:** These points cover 99.9% of all use cases!

  * If however, your {@link conditionalReducer} is invoked in a less
    conventional way, then you must manually supply the appropriate
    originalReducerState 3rd parameter when invoking the reducer.

    - This could be when you are invoking the {@link conditionalReducer}
      directly (outside of a {@link joinReducers} utility).

    - Or if you have a nested {@link joinReducers} combination.
