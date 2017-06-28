describe('fields', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('focused the first', function() {
    // given
    var
      self  = $('form'),
      steps = self.children('fieldset');

    // when
    self.stepy();

    // then
    expect(steps.first().find(':input:enabled:visible:first')).toBeFocused();
  });
});
