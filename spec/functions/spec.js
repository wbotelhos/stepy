describe('funcions', function() {
  beforeEach(function() {
    Factory.append(Factory.form({ id: 'stepy', html: [
      Factory.fieldset({ title: 'Step 1', html: [
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
      ]}), Factory.fieldset({ title: 'Step 2', html: [
        Factory.legend({ html: 'description 2' }),
        Factory.label({ html: 'Bio' }),
        Factory.textarea({ name: 'bio' })
      ]}), Factory.fieldset({ title: 'Step 3', html: [
        Factory.legend({ html: 'description 3' }),
        Factory.label({ html: 'Birthday' }),
        Factory.select({ name: 'day', html: [Factory.option(), Factory.option({ html: 23 })]}),
        Factory.label({ html: 'Site' }),
        Factory.text({ name: 'site' })
      ]}),
      Factory.submit()
    ]}));
  });

  afterEach(function() { Factory.clear(); });

  describe('#destroy', function() {
    it ('is chainable', function() {
      // given
      var self = $('form').stepy();

      // when
      var ref = self.stepy('destroy');

      // then
      expect(ref).toBe(self);
    });

    it ('shows all steps', function() {
      // given
      var self  = $('form').stepy(),
          steps = self.children('fieldset');

      // when
      self.stepy('destroy');

      // then
      expect(steps.eq(0)).toBeVisible();
      expect(steps.eq(1)).toBeVisible();
      expect(steps.eq(2)).toBeVisible();
    });

    it ('removes the back buttons', function() {
      // given
      var self  = $('form').stepy(),
          steps = self.children('fieldset');

      // when
      self.stepy('destroy');

      // then
      expect(steps).not.toContain('.button-back');
    });

    it ('puts the finish button as children of the last step', function() {
      // given
      var self  = $('form').stepy(),
          steps = self.children('fieldset');

      // when
      self.stepy('destroy');

      // then
      expect(steps).toContain(':submit');
    });

    it ('removes the bind indicator', function() {
      // given
      var self = $('form').stepy();

      // when
      self.stepy('destroy');

      // then
      expect(self.data('stepy')).toBeFalsy();
    });

    context('with validate enabled', function() {
      it ('removes the error container', function() {
        // given
        var self  = $('form').stepy({ validate: true }),
            steps = self.children('fieldset');

        // when
        self.stepy('destroy');

        // then
        expect(self).not.toContain('.stepy-errors');
      });
    });
  });

  describe('#step', function() {
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
      var self  = $('form').stepy(),
          steps = self.children('fieldset');

      // when
      self.stepy('step', 2);

      // then
      expect(steps.eq(0)).toBeHidden();
      expect(steps.eq(1)).toBeVisible();
      expect(steps.eq(2)).toBeHidden();
    });
  });
});
