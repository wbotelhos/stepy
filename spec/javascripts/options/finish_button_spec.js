describe('finishButton', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('disabled', function() {
    it ('will not to move the finish button inside the last step', function() {
      // given
      var self = $('form'),
        step = self.children('fieldset:last');

      // when
      self.stepy({ finishButton: false });

      // then
      expect(step.find(':submit').length).toEqual(0);
    });
  });

  context('enabled', function() {
    it ('will to move the finish button inside the last step', function() {
      // given
      var
        self = $('form'),
        step = self.children('fieldset:last');

      // when
      self.stepy({ finishButton: true });

      // then
      expect(step.find(':submit').length).toEqual(1);
    });

    it ('starts hidden', function() {
      // given
      var self = $('form'),
        step = self.children('fieldset:last');

      // when
      self.stepy();

      // then
      expect(step.find(':submit')).toBeHidden();
    });

    context('on the last step becomes active', function() {
      it ('becomes visible', function() {
        // given
        var self  = $('form').stepy(),
          steps = self.children('fieldset');

        // when
        steps.eq(1).find('.stepy-next').click();

        // then
        expect(steps.last().find(':submit')).toBeVisible();
      });
    });

    context('without the class stepy-finish', function() {
      beforeEach(function() {
        $('form').children(':submit').removeClass('stepy-finish');
      });

      context('with type submit', function() {
        it ('will be getted', function() {
          // given
          var self = $('form'),
            step = self.children('fieldset:last');

          // when
          self.stepy({ finishButton: true });

          // then
          expect(step.find(':submit').length).toEqual(1);
        });
      });

      context('without type submit', function() {
        beforeEach(function() {
          $('form').children(':submit').attr('type', 'image');
        });

        it ('raise exception', function() {
          // given
          var self = $('form');

          // when
          var lambda = function() { self.stepy(); };

          // then
          expect(lambda).toThrow(new Error('Submit button or element with class "stepy-finish" missing!'));
        });
      });
    });
  });
});
