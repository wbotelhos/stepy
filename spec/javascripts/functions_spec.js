describe('funcions', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  describe('#destroy', function() {
    it ('is chainable', function() {
      // given
      var self = $('form').stepy();

      // when
      var ref = self.stepy('destroy');

      // then
      expect(ref).toEqual(self);
    });

    it ('shows all steps', function() {
      // given
      var
        self  = $('form').stepy(),
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
      var
        self  = $('form').stepy(),
        steps = self.children('fieldset');

      // when
      self.stepy('destroy');

      // then
      expect(steps).not.toContain('.button-back');
    });

    it ('puts the finish button as children of the last step', function() {
      // given
      var
        self  = $('form').stepy(),
        steps = self.children('fieldset');

      // when
      self.stepy('destroy');

      // then
      expect(steps.find(':submit').length).toEqual(1);
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
        var
          self  = $('form').stepy({ validate: true }),
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
      var
        self  = $('form').stepy(),
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
