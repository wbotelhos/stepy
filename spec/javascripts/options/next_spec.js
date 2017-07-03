describe('next', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('receives the right arguments on next button is clicked', function() {
    // given
    var self = $('form').stepy({
      next: function(index, totalSteps) {
        $(this).data({ step: index, totalSteps: totalSteps });
      }
    });

    // when
    self.find('fieldset:eq(0) .stepy-next').trigger('click');

    // then
    expect(self.data('step')).toEqual(1);
    expect(self.data('totalSteps')).toEqual(3);
  });
});
