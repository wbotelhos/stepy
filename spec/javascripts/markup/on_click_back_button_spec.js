describe('on_click_back_button', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('goes to previous step', function() {
    // given
    var self = $('form').stepy().stepy('step', 1);

    // when
    self.find('.stepy-step:eq(1) .stepy-back').trigger('click');

    // then
    expect(self.find('.stepy-step:eq(0)')).toHaveClass('stepy-active');
    expect(self.find('.stepy-step:eq(1)')).not.toHaveClass('stepy-active');
    expect(self.find('.stepy-step:eq(2)')).not.toHaveClass('stepy-active');
  });

  it ('focus the first field', function() {
    // given
    var self = $('form').stepy().stepy('step', 1);

    // when
    self.find('.stepy-step:eq(1) .stepy-back').trigger('click');

    // then
    expect(self.find('.stepy-step:eq(0) :input:enabled:visible:first')).toBeFocused();
  });

  context('on the first step', function() {
    it ('does not move to a non existent one', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('.stepy-step:eq(0) .stepy-back').trigger('click');

      // then
      expect(self.data('index')).toEqual(0);

      expect(self.find('.stepy-step:eq(0)')).toHaveClass('stepy-active');
      expect(self.find('.stepy-step:eq(1)')).not.toHaveClass('stepy-active');
      expect(self.find('.stepy-step:eq(2)')).not.toHaveClass('stepy-active');;
    });
  });
});
