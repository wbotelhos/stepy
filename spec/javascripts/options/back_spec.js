describe('back', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('receives the right arguments on back button is clicked', function() {
    // given
    var self = $('form').stepy({
      back: function(index, totalSteps) {
        $(this).data({
          index:      index,
          totalSteps: totalSteps
        });
      }
    });

    self.find('fieldset:eq(0) .stepy-next').trigger('click');

    // when
    self.find('fieldset:eq(1) .stepy-back').trigger('click');

    // then
    expect(self.data('index')).toEqual(1);
    expect(self.data('totalSteps')).toEqual(3);
  });
});
