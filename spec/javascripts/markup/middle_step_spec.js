describe('middle_step', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('has the back and next button', function() {
    // given
    var
      self = $('form'),
      step = self.children('fieldset:eq(1)');

    // when
    self.stepy();

    // then
    var nav = step.children('.stepy-navigator');

    expect(step.find('.stepy-navigator').length).toEqual(1);
    expect(nav.find('.stepy-back').length).toEqual(1);
    expect(nav.find('.stepy-next').length).toEqual(1);
  });

  it ('has the right labels', function() {
    // given
    var
      self = $('form'),
      step = self.children('fieldset:eq(1)');

    // when
    self.stepy();

    // then
    expect(step.find('.stepy-back')).toHaveHtml('&lt; Back');
    expect(step.find('.stepy-next')).toHaveHtml('Next &gt;');
  });

  context('clicking on next', function() {
    it ('goes to third step', function() {
      // given
      var
        self  = $('form').stepy(),
        steps = self.children();

      // when
      steps.eq(0).find('.stepy-next').click();
      steps.eq(1).find('.stepy-next').click();

      // then
      expect(steps.eq(0)).toBeHidden();
      expect(steps.eq(1)).toBeHidden();
      expect(steps.eq(2)).toBeVisible();
    });
  });

  context('clicking on back', function() {
    it ('goes to first step', function() {
      // given
      var
        self  = $('form').stepy(),
        steps = self.children();

      steps.eq(0).find('.stepy-next').click();

      // when
      steps.eq(1).find('.stepy-back').click();

      // then
      expect(steps.eq(0)).toBeVisible();
      expect(steps.eq(1)).toBeHidden();
      expect(steps.eq(2)).toBeHidden();
    });

    it ('focus the first field', function() {
      // given
      var
        self  = $('form').stepy(),
        steps = self.children('fieldset');

      steps.eq(0).find('.stepy-next').click();

      // when
      steps.eq(1).find('.stepy-back').click();

      // then
      expect(steps.eq(0).find(':input:enabled:visible:first')).toBeFocused();
    });
  });
});
