describe('backLabel', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('changes the back button label', function() {
    // given
    var self = $('form');

    // when
    self.stepy({ backLabel: 'come back' });

    // then
    var steps = self.children('fieldset')

    expect(steps.eq(1).find('.button-back').text()).toEqual('come back');
    expect(steps.eq(2).find('.button-back').text()).toEqual('come back');
  });
});
