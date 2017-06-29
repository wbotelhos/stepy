describe('nextButton', function() {
  'use strict';

  context ('when has button with default class', function() {
    beforeEach(function() {
      fixture.load('back_and_next_buttons_with_default_class.html');
    });

    it ('that button is binded', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0) .stepy-next').trigger('click');

      // then
      expect(self.find('fieldset:eq(1)')).toBeVisible();
    });
  });
});
