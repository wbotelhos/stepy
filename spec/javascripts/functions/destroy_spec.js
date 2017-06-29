describe('funcions', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

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
    expect(steps).not.toContain('.stepy-back');
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
