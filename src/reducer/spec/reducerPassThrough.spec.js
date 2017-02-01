'use strict';

import expect                from 'expect';
import {reducerPassThrough}  from '../../index';

describe('reducerPassThrough() tests', () => {

  describe('insure pass-through state', () => {

    it('is unmodifed', () => {
      const state = 123;
      const action = { type: 'type-not-referenced', payload: 'not-referenced' };
      expect(reducerPassThrough(state, action)).toBe(state);
    });

  });

});
