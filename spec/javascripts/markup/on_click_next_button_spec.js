describe('on_click_next_button', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('goes to next step', function() {
    // given
    var self = $('form').stepy();

    // when
    self.find('fieldset:eq(0) .stepy-next').click();

    // then
    expect(self.find('fieldset:eq(0)')).toBeHidden();
    expect(self.find('fieldset:eq(1)')).toBeVisible();
    expect(self.find('fieldset:eq(2)')).toBeHidden();
  });

  it ('focus the first field', function() {
    // given
    var self = $('form').stepy();

    // when
    self.find('fieldset:eq(0) .stepy-next').click();

    // then
    expect(self.find('fieldset:eq(1) :input:enabled:visible:first')).toBeFocused();
  });
});
