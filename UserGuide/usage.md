TODO: develop rudimentary concepts with examples

TODO: where would a function summary go?

TODO: this sounds a bit embellished ... consider rewording with LESS fluff

## {@link reducerHash}

A switch statement is commonly used to drive the reduction's
conditional logic, reasoning about the action.type:

  TODO: EXAMPLE

A rudementary desire for many developers is to better encapsolate this
conditional logic.

This can be accomplished using the {@link reducerHash} function (the
most common composition reducer).  This creates a higher-order
reducer, by combining a a set of sub-reducer functions that are
indexed by the standard action.type.

The following example, is equavelent to the one above:

  TODO: EXAMPLE

Not only is this more encapsolated, but it provides an automated
catch-all TODO: more

As it turns out, this utility is so centrao to the nature of
reduction, it can be extended for logging to provide a central spot by
which logging TODO: I AM TOO TIRED RIGHT NOW (continue L8TR)

TODO: refer to the special doc
