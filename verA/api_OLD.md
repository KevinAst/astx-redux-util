## Functions

<dl>
<dt><a href="#conditionalReducer">conditionalReducer(conditionalFn, thenReducerFn, [elseReducerFn], [initialState])</a> ⇒ <code>reducerFn</code></dt>
<dd><p>Create a higher-order reducer that conditionally executes one of
the supplied reducerFns, based on the conditionalFn() return
directive.</p>
<p>The <strong>Dev Guide</strong> discusses conditionalReducer() in more detail
(see {@tutorial conceptConditional}), and additional examples can
be found in {@tutorial conceptJoin} and {@tutorial fullExample}.</p>
</dd>
<dt><a href="#joinReducers">joinReducers(...reducerFns, [initialState])</a> ⇒ <code>reducerFn</code></dt>
<dd><p>Create a higher-order reducer by combining two or more reducers,
logically executing each in sequence (in essence combining their
functionality into one).  This is useful when combining various
reducer types into one logical construct.</p>
<p><strong>Please Note:</strong> Because each reducer is able to build on what has
been accomplished by a prior reducer, joinReducers cumulatively
passes the state parameter that was returned from any prior reducer
(in the chain of reducers to execute).  In essence this is an
accumulative process.  While this does NOT relax the immutable
constraint of the reducer&#39;s state parameter, it is possible for a
down-stream reducer to receive a state parameter that is a
different instance from the start of the reduction process (because
an up-stream reducer needed to alter it in some way).</p>
<p>The <strong>Dev Guide</strong> discusses joinReducers() in more detail
(see {@tutorial conceptJoin}), and additional examples can
be found in {@tutorial fullExample}.</p>
</dd>
<dt><a href="#reducerHash">reducerHash(actionHandlers, [initialState])</a> ⇒ <code>reducerFn</code></dt>
<dd><p>Poo - Create a higher-order reducer by combining a set of sub-reducer
functions that are indexed by the standard action.type.  When no
action.type is acted on, the original state is merely
passed-through (using the <a href="https://lodash.com/docs#identity">identity
function</a>).</p>
<p>This is one of the more prevalent composition reducers, and
provides an alternative to the switch statement (commonly used to
provide this control mechanism).</p>
<p>The <strong>Dev Guide</strong> discusses reducerHash() in more detail (see
{@tutorial conceptHash}), and additional examples can be found in
{@tutorial conceptJoin} and {@tutorial fullExample}.</p>
<p><strong>NOTE</strong>: Because reducerHash is so central to the rudimentary
aspect of reduction, it is a common practice to extend it,
promoting a 
[centralized reducer-based logging capability]{@tutorial logExt}, 
with an ability to correlate logging levels to state changes
<em>(providing a means to filter logs at a high level with minimal
output)</em>.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#conditionalReducerCB">conditionalReducerCB</a> ⇒ <code>truthy</code></dt>
<dd><p>A callback function (used in <a href="#conditionalReducer">conditionalReducer</a>) whose
return value determines which reducerFn is executed.</p>
</dd>
<dt><a href="#ActionReducerHash">ActionReducerHash</a> : <code>Object</code></dt>
<dd><p>A hash of reducer functions, indexed by the standard redux
action.type.</p>
</dd>
</dl>

<a id="conditionalReducer"></a>

## conditionalReducer(conditionalFn, thenReducerFn, [elseReducerFn], [initialState]) ⇒ <code>reducerFn</code>
Create a higher-order reducer that conditionally executes one of
the supplied reducerFns, based on the conditionalFn() return
directive.

The **Dev Guide** discusses conditionalReducer() in more detail
(see {@tutorial conceptConditional}), and additional examples can
be found in {@tutorial conceptJoin} and {@tutorial fullExample}.

**Kind**: global function  
**Returns**: <code>reducerFn</code> - a newly created reducer function (described above).  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| conditionalFn | <code>[conditionalReducerCB](#conditionalReducerCB)</code> |  | a callback function whose return value determines which reducerFn is executed ... truthy: thenReducerFn(), falsy: elseReducerFn(). |
| thenReducerFn | <code>reducerFn</code> |  | the "wrapped" reducer invoked when conditionalFn returns truthy. |
| [elseReducerFn] | <code>reducerFn</code> | <code>identity</code> | the optional "wrapped" reducer invoked when conditionalFn returns falsy.  DEFAULT: [identity function](https://lodash.com/docs#identity) |
| [initialState] | <code>InitialState</code> |  | the optional fall-back state value used during the state initialization boot-strap process. |

<a id="joinReducers"></a>

## joinReducers(...reducerFns, [initialState]) ⇒ <code>reducerFn</code>
Create a higher-order reducer by combining two or more reducers,
logically executing each in sequence (in essence combining their
functionality into one).  This is useful when combining various
reducer types into one logical construct.

**Please Note:** Because each reducer is able to build on what has
been accomplished by a prior reducer, joinReducers cumulatively
passes the state parameter that was returned from any prior reducer
(in the chain of reducers to execute).  In essence this is an
accumulative process.  While this does NOT relax the immutable
constraint of the reducer's state parameter, it is possible for a
down-stream reducer to receive a state parameter that is a
different instance from the start of the reduction process (because
an up-stream reducer needed to alter it in some way).

The **Dev Guide** discusses joinReducers() in more detail
(see {@tutorial conceptJoin}), and additional examples can
be found in {@tutorial fullExample}.

**Kind**: global function  
**Returns**: <code>reducerFn</code> - a newly created reducer function (described above).  

| Param | Type | Description |
| --- | --- | --- |
| ...reducerFns | <code>reducerFn</code> | two or more reducer functions to join together. |
| [initialState] | <code>InitialState</code> | the optional fall-back state value used during the state initialization boot-strap process. |

<a id="reducerHash"></a>

## reducerHash(actionHandlers, [initialState]) ⇒ <code>reducerFn</code>
Poo - Create a higher-order reducer by combining a set of sub-reducer
functions that are indexed by the standard action.type.  When no
action.type is acted on, the original state is merely
passed-through (using the [identity
function](https://lodash.com/docs#identity)).

This is one of the more prevalent composition reducers, and
provides an alternative to the switch statement (commonly used to
provide this control mechanism).

The **Dev Guide** discusses reducerHash() in more detail (see
{@tutorial conceptHash}), and additional examples can be found in
{@tutorial conceptJoin} and {@tutorial fullExample}.

**NOTE**: Because reducerHash is so central to the rudimentary
aspect of reduction, it is a common practice to extend it,
promoting a 
[centralized reducer-based logging capability]{@tutorial logExt}, 
with an ability to correlate logging levels to state changes
*(providing a means to filter logs at a high level with minimal
output)*.

**Kind**: global function  
**Returns**: <code>reducerFn</code> - a newly created reducer function (described above).  

| Param | Type | Description |
| --- | --- | --- |
| actionHandlers | <code>[ActionReducerHash](#ActionReducerHash)</code> | a hash of reducer functions, indexed by the standard redux action.type. |
| [initialState] | <code>InitialState</code> | the optional fall-back state value used during the state initialization boot-strap process. |

<a id="conditionalReducerCB"></a>

## conditionalReducerCB ⇒ <code>truthy</code>
A callback function (used in [conditionalReducer](#conditionalReducer)) whose
return value determines which reducerFn is executed.

**Kind**: global typedef  
**Returns**: <code>truthy</code> - A truthy value indicating which reducerFn is
executed ... truthy: thenReducerFn(), falsy: elseReducerFn().  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>\*</code> | The current immutable state that is the reduction target. |
| action | <code>Action</code> | The standard redux Action object that drives the reduction process. |
| originalReducerState | <code>\*</code> | The immutable state at the time of the start of the reduction process. This is useful in determining whether state has changed within a series of reductions [joinReducers](#joinReducers) ... because each individual reducer only has visibility of the state within it's own reduction process. Further information can be found in the {@tutorial originalReducerState} discussion of the Dev Guide. |

<a id="ActionReducerHash"></a>

## ActionReducerHash : <code>Object</code>
A hash of reducer functions, indexed by the standard redux
action.type.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| actionType1 | <code>reducerFn</code> | The reducer function servicing: 'actionType1'. |
| actionType2 | <code>reducerFn</code> | The reducer function servicing: 'actionType2'. |
| ...more | <code>reducerFn</code> | ...etc. |

