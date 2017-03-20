import makePatchableHOF from '../makePatchableHOF';

//***
//*** sample "patchable" HOF creator function (used in our unit tests)
//***

// define/expose our HOF utility: myCreator(prefix): fn
export default makePatchableHOF((prefix) => {

  // expose our newly created fn: (msg): 'prefixed msg'
  // NOTE: we use parameter state from BOTH our creator/created
  //       in proving the full HOF characteristics
  return (msg) => `${prefix}: ${msg}`;

});
