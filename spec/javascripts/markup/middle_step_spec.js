describe('middle_step', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('show right', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    self.find('fieldset:eq(0) .stepy-next').trigger('click');

    // then
    expect(self.find('fieldset:eq(0)')).toBeHidden();
    expect(self.find('fieldset:eq(1)')).toBeVisible();
    expect(self.find('fieldset:eq(2)')).toBeHidden();
  });

  it ('shows back button', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    self.find('fieldset:eq(0) .stepy-next').trigger('click');

    // then
    expect(self.find('fieldset:eq(1) .stepy-back').length).toEqual(1);
  });

  it ('shows next button', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    self.find('fieldset:eq(0) .stepy-next').trigger('click');

    // then
    expect(self.find('fieldset:eq(1) .stepy-next').length).toEqual(1);
  });
});
