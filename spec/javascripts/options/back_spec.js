describe('back', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('receives the right arguments on back button is clicked', function() {
    // given
    var self = $('form').stepy({
      back: function(index, totalSteps) {
        $(this).data({ step: index, totalSteps: totalSteps });
      }
    }).stepy('step', 1);

    // when
    self.find('fieldset:eq(1) .stepy-back').trigger('click');

    // then
    expect(self.data('step')).toEqual(0);
    expect(self.data('totalSteps')).toEqual(3);
  });
});
