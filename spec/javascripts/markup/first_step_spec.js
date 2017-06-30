describe('first_step', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('starts activated', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    expect(self.find('fieldset:eq(0)')).toBeVisible();
    expect(self.find('fieldset:eq(1)')).toBeHidden();
    expect(self.find('fieldset:eq(2)')).toBeHidden();
  });

  it ('hides the back button', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    expect(self.find('fieldset:eq(0) .stepy-back').length).toEqual(0);
  });

  it ('has the next button', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    expect(self.find('fieldset:eq(0) .stepy-next').length).toEqual(1);
  });
});
