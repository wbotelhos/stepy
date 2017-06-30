describe('last_step', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('has the back', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    self.find('fieldset:eq(0) .stepy-next').trigger('click');
    self.find('fieldset:eq(1) .stepy-next').trigger('click');

    // then
    expect(self.find('fieldset:eq(2) .stepy-back').length).toEqual(1);
  });

  it ('has no next button', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    self.find('fieldset:eq(0) .stepy-next').trigger('click');
    self.find('fieldset:eq(1) .stepy-next').trigger('click');

    // then
    expect(self.find('fieldset:eq(2) .stepy-next').length).toEqual(0);
  });
});
