describe('last_step', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('has the back', function() {
    // given
    var
      self = $('form'),
      step = self.children('fieldset:last');

    // when
    self.stepy();

    // then
    var nav = step.children('.stepy-navigator');

    expect(step.find('.stepy-navigator').length).toEqual(1);
    expect(nav.find('.stepy-back').length).toEqual(1);
    expect(nav.find('.stepy-next').length).toEqual(0);
  });

  it ('has the right labels', function() {
    // given
    var
      self = $('form'),
      step = self.children('fieldset:last');

    // when
    self.stepy();

    // then
    expect(step.find('.stepy-back')).toHaveHtml('&lt; Back');
  });

  it ('has the finish button', function() {
    // given
    var
      self = $('form'),
      step = self.children('fieldset:last');

    // when
    self.stepy();

    // then
    expect(step.find(':submit')).toExist();
  });

  context('clicking on back', function() {
    it ('goes to first step', function() {
      // given
      var
        self  = $('form').stepy(),
        steps = self.children();

      // when
      steps.eq(0).find('.stepy-next').click();
      steps.eq(1).find('.stepy-next').click();
      steps.eq(2).find('.stepy-back').click();

      // then
      expect(steps.eq(0)).toBeHidden();
      expect(steps.eq(1)).toBeVisible();
      expect(steps.eq(2)).toBeHidden();
    });
  });
});
