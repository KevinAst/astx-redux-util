'use strict';

import expect                from 'expect';
import {reducerPassThrough}  from '../../index'; // module under test

describe('reducerPassThrough() tests', () => {

  describe('insure state is passed through untouched', () => {
    testIt('string',     'myStr');
    testIt('number',     123);
    testIt('boolean',    true);
    testIt('object',     {myObjState: 55.0});
    testIt('Symbol',     Symbol('Wow a Symbol'));
    testIt('undefined',  undefined);
    testIt('null',       null);
  });

});

const action = { type: 'type-not-referenced', payload: 'not-referenced' };

function testIt(stateType, state) {
  it(`for ${stateType}`, () => {
    expect(reducerPassThrough(state, action)).toBe(state);
  });
}
