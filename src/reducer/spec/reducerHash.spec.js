'use strict';

import expect         from 'expect';
import AstxReduxUtil  from '../../index'; // module under test (NOTE: we vary import techniques)

const reduceWidget = AstxReduxUtil.reducerHash({
  'widget.edit':       (widget, action) => action.widget,
  'widget.edit.close': (widget, action) => null,
});

function widget(widget=null, action) {
  return reduceWidget(widget, action);
}

const stateWidget  = 'stateWidget';
const actionWidget = 'actionWidget';

function baseTest(actionType, expectedState) {
  it(`process: '${actionType}'`, () => {
    expect(widget(stateWidget, {type: actionType, widget: actionWidget})).toBe(expectedState);
  });
}

describe('reducerHash() tests', () => {
  baseTest('widget.edit',       actionWidget);
  baseTest('widget.edit.close', null);
  baseTest('some.other.action', stateWidget);
  // TODO: test edge case: a) validating hash, and b) hash containing an undefined key
});
