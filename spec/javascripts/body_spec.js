describe('body', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  describe('step', function() {
    describe('fields', function() {
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

    describe('first', function() {
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

    describe('middle', function() {
      describe('navigator', function() {
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
          expect(nav.find('.button-back').length).toEqual(1);
          expect(nav.find('.button-next').length).toEqual(1);
        });

        it ('has the right labels', function() {
          // given
          var
            self = $('form'),
            step = self.children('fieldset:eq(1)');

          // when
          self.stepy();

          // then
          expect(step.find('.button-back')).toHaveHtml('&lt; Back');
          expect(step.find('.button-next')).toHaveHtml('Next &gt;');
        });

        context('clicking on next', function() {
          it ('goes to third step', function() {
            // given
            var
              self  = $('form').stepy(),
              steps = self.children();

            // when
            steps.eq(0).find('.button-next').click();
            steps.eq(1).find('.button-next').click();

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

            steps.eq(0).find('.button-next').click();

            // when
            steps.eq(1).find('.button-back').click();

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

            steps.eq(0).find('.button-next').click();

            // when
            steps.eq(1).find('.button-back').click();

            // then
            expect(steps.eq(0).find(':input:enabled:visible:first')).toBeFocused();
          });
        });
      });
    });
  });

  describe('last', function() {
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
      expect(nav.find('.button-back').length).toEqual(1);
      expect(nav.find('.button-next').length).toEqual(0);
    });

    it ('has the right labels', function() {
      // given
      var
        self = $('form'),
        step = self.children('fieldset:last');

      // when
      self.stepy();

      // then
      expect(step.find('.button-back')).toHaveHtml('&lt; Back');
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
        steps.eq(0).find('.button-next').click();
        steps.eq(1).find('.button-next').click();
        steps.eq(2).find('.button-back').click();

        // then
        expect(steps.eq(0)).toBeHidden();
        expect(steps.eq(1)).toBeVisible();
        expect(steps.eq(2)).toBeHidden();
      });
    });
  });
});
