describe('finishButton', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('starts hidden', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    expect(self.find('.stepy-finish')).not.toHaveClass('stepy-active');
  });

  context('on second step', function() {
    it ('keeps hidden', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0) .stepy-next').trigger('click');

      // then
      expect(self.find('.stepy-finish')).not.toHaveClass('stepy-active');
    });
  });

  context('on last step', function() {
    it ('becomes visible', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0) .stepy-next').trigger('click');
      self.find('fieldset:eq(1) .stepy-next').trigger('click');

      // then
      expect(self.find('.stepy-finish')).toHaveClass('stepy-active');
    });
  });
});
