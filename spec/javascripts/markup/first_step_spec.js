describe('first_step', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('starts actived', function() {
    // given
    var
      self  = $('form'),
      steps = self.children();

    // when
    self.stepy();

    // then
    expect(steps.eq(0)).toBeVisible();
    expect(steps.eq(1)).toBeHidden();
    expect(steps.eq(2)).toBeHidden();
  });

  describe('navigator', function() {
    it ('has the next button', function() {
      // given
      var
        self = $('form'),
        step = self.children('fieldset:first');

      // when
      self.stepy();

      // then
      var nav = step.children('.stepy-navigator');

      expect(step.find('p.stepy-navigator').length).toEqual(1);
      expect(nav.find('.button-back').length).toEqual(0);
      expect(nav.find('.button-next').length).toEqual(1);
    });

    it ('has the right labels', function() {
      // given
      var
        self = $('form'),
        step = self.children('fieldset:first');

      // when
      self.stepy();

      // then
      expect(step.find('.button-next')).toHaveHtml('Next &gt;');
    });

    context('clicking on next', function() {
      it ('goes to second step', function() {
        // given
        var
          self  = $('form').stepy(),
          steps = self.children();

        // when
        steps.eq(0).find('.button-next').click();

        // then
        expect(steps.eq(0)).toBeHidden();
        expect(steps.eq(1)).toBeVisible();
        expect(steps.eq(2)).toBeHidden();
      });

      it ('focus the first field', function() {
        // given
        var
          self  = $('form').stepy(),
          steps = self.children('fieldset');

        // when
        steps.eq(0).find('.button-next').click();

        // then
        expect(steps.eq(1).find(':input:enabled:visible:first')).toBeFocused();
      });
    });
  });
});
