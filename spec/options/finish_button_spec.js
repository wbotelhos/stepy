describe('finishButton', function() {
  'use strict';

  beforeEach(function() {
    Factory.append(Factory.form({ id:   'stepy', html: [
      Factory.fieldset({ title: 'Step 1', html:  [
        Factory.legend({ html: 'description 1' }),
        Factory.label({ html: 'User' }),
        Factory.hidden({ name: 'hidden' }),
        Factory.text({ value: 'wbotelhos', name: 'user', disabled: true }),

        Factory.label({ html: 'E-mail' }),
        Factory.text({ name: 'email' }),

        Factory.label({ html: 'Checked?' }),
        Factory.checkbox({ name: 'checked' }),

        Factory.label({ html: 'Newsletter?' }),
        Factory.label({ html: 'Yep' }),
        Factory.radio({ name: 'newsletter' }),
        Factory.label({ html: 'Nop' }),
        Factory.radio({ name: 'newsletter' }),

        Factory.label({ html: 'Password' }),
        Factory.password({ name: 'password' })
      ] }), Factory.fieldset({ title: 'Step 2', html:  [
        Factory.legend({ html: 'description 2' }),
        Factory.label({ html: 'Bio' }),
        Factory.textarea({ name: 'bio' })
      ] }), Factory.fieldset({ title: 'Step 3', html:  [
        Factory.legend({ html: 'description 3' }),
        Factory.label({ html: 'Birthday' }),
        Factory.select({ name: 'day', html: [Factory.option(), Factory.option({ html: 23 })] }),
        Factory.label({ html: 'Site' }),
        Factory.text({ name: 'site' })
      ] }),
      Factory.submit()
    ] }));
  });

  afterEach(function() { Factory.clear(); });

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
        steps.eq(1).find('.button-next').click();

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
