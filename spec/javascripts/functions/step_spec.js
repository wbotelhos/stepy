describe('funcions', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is chainable', function() {
    // given
    var self = $('form').stepy();

    // when
    var ref = self.stepy('step', 2);

    // then
    expect(ref).toEqual(ref);
  });

  it ('changes the step', function() {
    // given
    var
      self  = $('form').stepy(),
      steps = self.children('fieldset');

    // when
    self.stepy('step', 2);

    // then
    expect(steps.eq(0)).toBeHidden();
    expect(steps.eq(1)).toBeVisible();
    expect(steps.eq(2)).toBeHidden();
  });
});
