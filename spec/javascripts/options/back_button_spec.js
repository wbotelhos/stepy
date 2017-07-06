describe('backButton', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('back_and_next_buttons_inside_step.html');
  });

  context('on first step', function() {
    it ('hides', function() {
      // given
      var self = $('form');

      // when
      self.stepy();

      // then
      expect(self.find('.stepy-back')).not.toHaveClass('stepy-active');
    });

    it ('starts with index zero', function() {
      // given
      var self = $('form');

      // when
      self.stepy();

      // then
      expect(self.data('index')).toEqual(0);
    });
  });

  context('on second step', function() {
    it ('shows', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0) .stepy-next').trigger('click');

      // then
      expect(self.find('fieldset:eq(1) .stepy-back')).toHaveClass('stepy-active');
    });

    it ('starts with index one', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0) .stepy-next').trigger('click');

      // then
      expect(self.data('index')).toEqual(1);
    });
  });

  context('on last step', function() {
    it ('shows', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0) .stepy-next').trigger('click');
      self.find('fieldset:eq(1) .stepy-next').trigger('click');

      // then
      expect(self.find('fieldset:eq(2) .stepy-back')).toHaveClass('stepy-active');
    });

    it ('starts with index two', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0) .stepy-next').trigger('click');
      self.find('fieldset:eq(1) .stepy-next').trigger('click');

      // then
      expect(self.data('index')).toEqual(2);
    });
  });
});
