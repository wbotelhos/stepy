describe('titleTarget', function() {
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

  context('with target', function() {
    beforeEach(function() {
      this.target = Factory.append('<div id="target"></div>');
    });

    it ('receives the titles of the steps', function() {
      // given
      var self = $('form');

      // when
      self.stepy({ titleTarget: '#' + this.target.attr('id') });

      // then
      expect($(target).find('#' + self.attr('id') + '-header').length).toEqual(1);
    });
  });

  context('clicking on next title', function() {
    context('with next callback', function() {
      it ('receives the right index', function() {
        // given
        var self  = $('form').stepy({
            titleClick: true,
            next      : function(index) { $(this).data('index', index); }
          }),
          steps = self.children('fieldset');

        // when
        $('#' + self.attr('id') + '-header').children('li').eq(1).click();

        // then
        expect(self.data('index')).toEqual(2);
      });
    });
  });

  context('clicking on back title', function() {
    context('with back callback', function() {
      it ('receives the right index', function() {
        // given
        var self   = $('form').stepy({
            titleClick: true,
            back      : function(index) {
              $(this).data('index', index);
            }
          }),
          steps  = self.children('fieldset'),
          titles = $('#' + self.attr('id') + '-header').children('li');

        titles.eq(1).click();

        // when
        titles.eq(0).click();

        // then
        expect(self.data('index')).toEqual(1);
      });
    });
  });

  context('clicking on other title', function() {
    context('with select callback', function() {
      it ('receives the right index', function() {
        // given
        var self   = $('form').stepy({
            titleClick: true,
            select    : function(index) { $(this).data('index', index); }
          }),
          steps  = self.children('fieldset'),
          titles = $('#' + self.attr('id') + '-header').children('li');

        // when
        titles.eq(1).click();

        // then
        expect(self.data('index')).toEqual(2);
      });
    });
  });

  context('with validate enabled', function() {
    context('and block enabled', function() {
      it ('blocks the step change', function() {
        // given
        var self   = $('form').stepy({ block: true, titleClick: true, validate: true }),
          steps  = self.children('fieldset'),
          titles = $('#' + self.attr('id') + '-header').children('li');

        self.validate({
          errorPlacement: function(error, element) {
            $('#stepy div.stepy-errors').append(error);
          }, rules: {
            'password':  'required'
          }, messages: {
            'password':  { required: 'Password field is requerid!' }
          }
        });

        // when
        titles.eq(2).click();

        // then
        expect(steps.eq(0)).toBeVisible();
        expect(steps.eq(1)).toBeHidden();
        expect(steps.eq(2)).toBeHidden();
      });
    });

    context('and errorImage enabled', function() {
      it ('display the error image', function() {
        // given
        var self   = $('form').stepy({ errorImage: true, titleClick: true, validate: true }),
          steps  = self.children('fieldset'),
          titles = $('#' + self.attr('id') + '-header').children('li');

        self.validate({
          errorPlacement: function(error, element) {
            $('#stepy div.stepy-errors').append(error);
          }, rules: {
            'password':  'required'
          }, messages: {
            'password':  { required: 'Password field is requerid!' }
          }
        });

        // when
        titles.eq(2).click();

        // then
        expect(titles.eq(0)).toHaveClass('stepy-error');
      });
    });
  });
});
