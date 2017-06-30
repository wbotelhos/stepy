describe('on_click_back_button', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('goes to previous step', function() {
    // given
    var self = $('form').stepy().stepy('step', 2);

    // when
    self.find('fieldset:eq(1) .stepy-back').click();

    // then
    expect(self.find('fieldset:eq(0)')).toBeVisible();
    expect(self.find('fieldset:eq(1)')).toBeHidden();
    expect(self.find('fieldset:eq(2)')).toBeHidden();
  });

  it ('focus the first field', function() {
    // given
    var self = $('form').stepy().stepy('step', 2);

    // when
    self.find('fieldset:eq(1) .stepy-back').click();

    // then
    expect(self.find('fieldset:eq(0) :input:enabled:visible:first')).toBeFocused();
  });
});
