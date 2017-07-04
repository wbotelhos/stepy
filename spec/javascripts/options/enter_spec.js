describe('enter', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('form_with_submit_button.html');
  });

  context('enabled', function() {
    context('with valid step', function() {
      it ('goes to the next step', function() {
        // given
        var
          self  = $('form').stepy({ enter: true, validate: false }),
          steps = self.find('fieldset'),
          evt   = $.Event('keypress', { which: 13, keyCode: 13 });

        // when
        steps.eq(0).find('input:visible:last').trigger(evt);

        // then
        expect(steps.eq(0)).toBeHidden();
        expect(steps.eq(1)).toBeVisible();
        expect(steps.eq(2)).toBeHidden();
      });

      it ('focus the first field', function() {
        // given
        var
          self  = $('form').stepy({ enter: true, validate: false }),
          steps = self.find('fieldset'),
          evt   = $.Event('keypress', { which: 13, keyCode: 13 });

        // when
        steps.eq(0).find('input:visible:last').trigger(evt);

        // then
        expect(steps.eq(1).find(':input:enabled:visible:first')).toBeFocused();
      });

      context('with next callback', function() {
        it ('receives the right index', function() {
          // given
          var
            self  = $('form').stepy({
              enter:    true,
              validate: false,
              next:     function(index) { $(this).data('step', index); }
            }),
            steps = self.find('fieldset'),
            evt   = $.Event('keypress', { which: 13, keyCode: 13 });

          // when
          steps.eq(0).find('input:visible:last').trigger(evt);

          // then
          expect(self.data('step')).toEqual(1);
        });
      });

      context('with the fields inside elements', function() {
        beforeEach(function() {
          $('form').find('fieldset:first').find(':input').wrap('<p />');
        });

        it ('goes to the next step', function() {
          // given
          var
            self  = $('form').stepy({ enter: true, validate: false }),
            steps = self.find('fieldset'),
            evt   = $.Event('keypress', { which: 13, keyCode: 13 });

          // when
          steps.eq(0).find('input:visible:last').trigger(evt);

          // then
          expect(steps.eq(0)).toBeHidden();
          expect(steps.eq(1)).toBeVisible();
          expect(steps.eq(2)).toBeHidden();
        });
      });
    });

    context('with invalid step', function() {
      beforeEach(function() {
        $('form').validate({ rules: { 'password': 'required' } });
      });

      context('with block enabled', function() {
        it ('does not goes to the next step', function() {
          // given
          var
            self  = $('form').stepy({ enter: true, block: true, validate: true }),
            steps = self.find('fieldset'),
            evt   = $.Event('keypress', { which: 13, keyCode: 13 });

          // when
          steps.eq(0).find('input:visible:last').trigger(evt);

          // then
          expect(steps.eq(0)).toBeVisible();
          expect(steps.eq(1)).toBeHidden();
          expect(steps.eq(2)).toBeHidden();
        });
      });

      context('with block disabled', function() {
        it ('goes to the next step', function() {
          // given
          var
            self  = $('form').stepy({ enter: true, block: false, validate: true }),
            steps = self.find('fieldset'),
            evt   = $.Event('keypress', { which: 13, keyCode: 13 });

          // when
          steps.eq(0).find('input:visible:last').trigger(evt);

          // then
          expect(steps.eq(0)).toBeHidden();
          expect(steps.eq(1)).toBeVisible();
          expect(steps.eq(2)).toBeHidden();
        });
      });
    });

    context('on the last step', function() {
      it ('submits the form', function() {
        // given
        var self = $('form').stepy({
          finish: function() {
            $(this).data('submited', 'ok');

            return false;
          }
        }).on('submit', function(evt) {
          evt.preventDefault();
        }).stepy('step', 2);

        // when
        self
          .find('fieldset:eq(2) input:visible:last')
          .trigger($.Event('keypress', { which: 13, keyCode: 13 }));

        // then
        expect(self.data('submited')).toEqual('ok');
      });
    });
  });

  context('disabled', function() {
    it ('does not go to the next step', function() {
      // given
      var
        self  = $('form').stepy({ enter: false, validate: false }),
        steps = self.find('fieldset'),
        evt   = $.Event('keypress', { which: 13, keyCode: 13 });

      // when
      steps.eq(0).find('input:visible:last').trigger(evt);

      // then
      expect(steps.eq(0)).toBeVisible();
      expect(steps.eq(1)).toBeHidden();
      expect(steps.eq(2)).toBeHidden();
    });
  });
});
