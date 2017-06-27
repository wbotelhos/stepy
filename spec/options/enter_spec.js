describe('enter', function() {
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

  context('enabled', function() {
    context('with valid step', function() {
      it ('goes to the next step', function() {
        // given
        var
          self  = $('form').stepy({ enter: true, validate: false }),
          steps = self.children('fieldset'),
          evt   = $.Event('keypress');

        evt.which   = 13;
        evt.keyCode = 13;

        // when
        steps.eq(0).children('input:visible:last').trigger(evt);

        // then
        expect(steps.eq(0)).toBeHidden();
        expect(steps.eq(1)).toBeVisible();
        expect(steps.eq(2)).toBeHidden();
      });

      it ('focus the first field', function() {
        // given
        var
          self  = $('form').stepy({ enter: true, validate: false }),
          steps = self.children('fieldset'),
          evt   = $.Event('keypress');

        evt.which   = 13;
        evt.keyCode = 13;

        // when
        steps.eq(0).children('input:visible:last').trigger(evt);

        // then
        expect(steps.eq(1).find(':input:enabled:visible:first')).toBeFocused();
      });

      context('with next callback', function() {
        it ('receives the right index', function() {
          // given
          var
            self  = $('form').stepy({
              enter    : true,
              validate: false,
              next    : function(index) { $(this).data('index', index); }
            }),
            steps = self.children('fieldset'),
            evt   = $.Event('keypress');

          evt.which   = 13;
          evt.keyCode = 13;

          // when
          steps.eq(0).children('input:visible:last').trigger(evt);

          // then
          expect(self.data('index')).toEqual(2);
        });
      });

      context('with the fields inside elements', function() {
        beforeEach(function() {
          $('form').children('fieldset:first').find(':input').wrap('<p />');
        });

        it ('goes to the next step', function() {
          // given
          var
            self  = $('form').stepy({ enter: true, validate: false }),
            steps = self.children('fieldset'),
            evt   = $.Event('keypress');

          evt.which   = 13;
          evt.keyCode = 13;

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
        $('form').validate({
          rules: { 'password':  'required' }
        });
      });

      context('with block enabled', function() {
        it ('does not goes to the next step', function() {
          // given
          var
            self  = $('form').stepy({ enter: true, block: true, validate: true }),
            steps = self.children('fieldset'),
            evt   = $.Event('keypress');

          evt.which   = 13;
          evt.keyCode = 13;

          // when
          steps.eq(0).children('input:visible:last').trigger(evt);

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
            steps = self.children('fieldset'),
            evt   = $.Event('keypress');

          evt.which   = 13;
          evt.keyCode = 13;

          // when
          steps.eq(0).children('input:visible:last').trigger(evt);

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
        var
          self  = $('form').stepy({
            finish: function() {
              $(this).data('submited', true);
            }
          }),
          steps = self.children('fieldset'),
          evt   = $.Event('keypress');

        evt.which   = 13;
        evt.keyCode = 13;

        self.on('submit', function(evt) {
          evt.preventDefault();
        });

        steps.eq(1).find('.button-next').click();

        // when
        steps.eq(2).children('input:visible:last').trigger(evt);

        // then
        expect(self.data('submited')).toBeTruthy();
      });
    });
  });

  context('disabled', function() {
    it ('does not go to the next step', function() {
      // given
      var
        self  = $('form').stepy({ enter: false, validate: false }),
        steps = self.children('fieldset'),
        evt   = $.Event('keypress');

      evt.which   = 13;
      evt.keyCode = 13;

      // when
      steps.eq(0).children('input:visible:last').trigger(evt);

      // then
      expect(steps.eq(0)).toBeVisible();
      expect(steps.eq(1)).toBeHidden();
      expect(steps.eq(2)).toBeHidden();
    });
  });
});
