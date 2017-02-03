<h4 class="name" id="smarterLogging">Smarter Logging</h4>

Because the {@link reducerHash} function is so central to the
rudimentary aspect of reduction, it is a common practice to extend
this function, providing a common spot to emit valuable logging
probes.

Not only are these probes centrally located in a common spot, but they
can easily correlate logging levels to state changes, providing a
means to filter logs at a high level with minimal output.

As an example: filter the logs to named reducers that actually change
the state.

TODO: build up an example of this.

