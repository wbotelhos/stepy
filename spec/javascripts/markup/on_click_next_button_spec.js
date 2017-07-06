describe('on_click_next_button', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('goes to next step', function() {
    // given
    var self = $('form').stepy();

    // when
    self.find('.stepy-step:eq(0) .stepy-next').trigger('click');

    // then
    expect(self.find('.stepy-step:eq(0)')).not.toHaveClass('stepy-active');
    expect(self.find('.stepy-step:eq(1)')).toHaveClass('stepy-active');;
    expect(self.find('.stepy-step:eq(2)')).not.toHaveClass('stepy-active');
  });

  it ('focus the first field', function() {
    // given
    var self = $('form').stepy();

    // when
    self.find('.stepy-step:eq(0) .stepy-next').trigger('click');

    // then
    expect(self.find('.stepy-step:eq(1) :input:enabled:visible:first')).toBeFocused();
  });

  context('on the last step', function() {
    it ('does not move to a non existent one', function() {
      // given
      var self = $('form').stepy();

      self.find('.stepy-step:eq(0) .stepy-next').trigger('click');
      self.find('.stepy-step:eq(1) .stepy-next').trigger('click');

      // when
      self.find('.stepy-step:eq(2) .stepy-next').trigger('click');

      // then
      expect(self.data('index')).toEqual(2);

      expect(self.find('.stepy-step:eq(0)')).not.toHaveClass('stepy-active');
      expect(self.find('.stepy-step:eq(1)')).not.toHaveClass('stepy-active');
      expect(self.find('.stepy-step:eq(2)')).toHaveClass('stepy-active');;
    });
  });
});
