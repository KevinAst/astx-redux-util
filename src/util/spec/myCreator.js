import PatchableHOF from '../PatchableHOF';

//***
//*** sample "patchable" HOF creator function (used in our unit tests)
//***

// helper in making our HOF "patchable"
const patchableHOF = new PatchableHOF();

// define/expose our HOF utility: myCreator(prefix): fn
export default patchableHOF.defineCreator( (prefix) => {

  // expose our newly created fn: (msg): 'prefixed msg'
  return patchableHOF.defineCreated( (msg) => {
    // NOTE: we use parameter state from BOTH our creator/created
    //       in proving the full HOF characteristics
    return `${prefix}: ${msg}`;
  });

});
