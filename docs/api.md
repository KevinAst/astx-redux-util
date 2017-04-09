
<br/><br/><br/>

<a id="conditionalReducer"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  conditionalReducer(conditionalFn, thenReducerFn, [elseReducerFn], [initialState]) ⇒ [`reducerFn`](#reducerFn)</h5>
Create a higher-order reducer that conditionally executes one ofthe supplied reducerFns, based on the conditionalFn() returndirective.The **Dev Guide** discusses conditionalReducer() in more detail(see {{book.guide.conceptConditional}}), and additional examples canbe found in {{book.guide.conceptJoin}} and {{book.guide.fullExample}}.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| conditionalFn | [`conditionalReducerCB`](#conditionalReducerCB) |  | a callback function whose return value determines which reducerFn is executed ... truthy: thenReducerFn(), falsy: elseReducerFn(). |
| thenReducerFn | [`reducerFn`](#reducerFn) |  | the "wrapped" reducer invoked when conditionalFn returns truthy. |
| [elseReducerFn] | [`reducerFn`](#reducerFn) | <code>identity</code> | the optional "wrapped" reducer invoked when conditionalFn returns falsy.  DEFAULT: [identity function](https://lodash.com/docs#identity) |
| [initialState] | [`InitialState`](#InitialState) |  | the optional fall-back state value used during the state initialization boot-strap process. |

**Returns**: [`reducerFn`](#reducerFn) - a newly created reducer function (described above).  

<br/><br/><br/>

<a id="joinReducers"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  joinReducers(...reducerFns, [initialState]) ⇒ [`reducerFn`](#reducerFn)</h5>
Create a higher-order reducer by combining two or more reducers,logically executing each in sequence (in essence combining theirfunctionality into one).  This is useful when combining variousreducer types into one logical construct.**Please Note:** Because each reducer is able to build on what hasbeen accomplished by a prior reducer, joinReducers cumulativelypasses the state parameter that was returned from any prior reducer(in the chain of reducers to execute).  In essence this is anaccumulative process.  While this does NOT relax the immutableconstraint of the reducer's state parameter, it is possible for adown-stream reducer to receive a state parameter that is adifferent instance from the start of the reduction process (becausean up-stream reducer needed to alter it in some way).The **Dev Guide** discusses joinReducers() in more detail(see {{book.guide.conceptJoin}}), and additional examples canbe found in {{book.guide.fullExample}}.


| Param | Type | Description |
| --- | --- | --- |
| ...reducerFns | [`reducerFn`](#reducerFn) | two or more reducer functions to join together. |
| [initialState] | [`InitialState`](#InitialState) | the optional fall-back state value used during the state initialization boot-strap process. |

**Returns**: [`reducerFn`](#reducerFn) - a newly created reducer function (described above).  

<br/><br/><br/>

<a id="reducerHash"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  reducerHash(actionHandlers, [initialState]) ⇒ [`reducerFn`](#reducerFn)</h5>
Create a higher-order reducer by combining a set of sub-reducerfunctions that are indexed by the standard action.type.  When noaction.type is acted on, the original state is merelypassed-through (using the [identityfunction](https://lodash.com/docs#identity)).This is one of the more prevalent composition reducers, andprovides an alternative to the switch statement (commonly used toprovide this control mechanism).The **Dev Guide** discusses reducerHash() in more detail (see{{book.guide.conceptHash}}), and additional examples can be found in{{book.guide.conceptJoin}} and {{book.guide.fullExample}}.**NOTE**: Because reducerHash is so central to the rudimentaryaspect of reduction, it is a common practice to extend it,promoting a [`centralized reducer-based logging capability`](/extending/logExt.md), with an ability to correlate logging levels to state changes*(providing a means to filter logs at a high level with minimaloutput)*.


| Param | Type | Description |
| --- | --- | --- |
| actionHandlers | [`ActionReducerHash`](#ActionReducerHash) | a hash of reducer functions, indexed by the standard redux action.type. |
| [initialState] | [`InitialState`](#InitialState) | the optional fall-back state value used during the state initialization boot-strap process. |

**Returns**: [`reducerFn`](#reducerFn) - a newly created reducer function (described above).  

<br/><br/><br/>

<a id="conditionalReducerCB"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  conditionalReducerCB ⇒ truthy</h5>
A callback function (used in {{book.api.conditionalReducer}}) whosereturn value determines which reducerFn is executed.


| Param | Type | Description |
| --- | --- | --- |
| state | \* | The current immutable state that is the reduction target. |
| action | [`Action`](#Action) | The standard redux Action object that drives the reduction process. |
| originalReducerState | \* | The immutable state at the time of the start of the reduction process. This is useful in determining whether state has changed within a series of reductions {{book.api.joinReducers}} ... because each individual reducer only has visibility of the state within it's own reduction process. Further information can be found in the {{book.guide.originalReducerState}} discussion of the Dev Guide. |

**Returns**: truthy - A truthy value indicating which reducerFn isexecuted ... truthy: thenReducerFn(), falsy: elseReducerFn().  

<br/><br/><br/>

<a id="ActionReducerHash"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  ActionReducerHash : Object</h5>
A hash of reducer functions, indexed by the standard reduxaction.type.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| actionType1 | [`reducerFn`](#reducerFn) | The reducer function servicing: 'actionType1'. |
| actionType2 | [`reducerFn`](#reducerFn) | The reducer function servicing: 'actionType2'. |
| ...more | [`reducerFn`](#reducerFn) | ...etc. |


<br/><br/><br/>

<a id="reducerFn"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  reducerFn ⇒ \*</h5>
A standard [redux reducer function](http://redux.js.org/docs/basics/Reducers.html)that is responsible for state changes.


| Param | Type | Description |
| --- | --- | --- |
| state | \* | The current immutable state that is the reduction target. |
| action | [`Action`](#Action) | The standard redux action which drives the reduction process. |

**Returns**: \* - The resulting state after reduction.  

<br/><br/><br/>

<a id="Action"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  Action : Object</h5>
A standard [redux Action object](http://redux.js.org/docs/basics/Actions.html)that drives the reduction process.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | string | The action type. |
| whatever | \* | Additional app-specific payload (as needed). |


<br/><br/><br/>

<a id="InitialState"></a>

<h5 style="margin: 10px 0px; border-width: 5px 0px; padding: 5px; border-style: solid;">
  InitialState : \*</h5>
All astx-redux-util reducer creators, expose an `initialState`parameter which optionally provides a fall-back state value to useduring the state initialization boot-strap process.In general, redux expects your state to have concrete values(i.e. something other than `undefined`).  This means that thereduction entry point to each state element should define adefault.  Keeping this in mind, the `initialState` parameter isoptional, because some reducers are "by design" (when combined in acomposition) intended to be mid-stream processors (i.e. NOT thereduction entry point).

