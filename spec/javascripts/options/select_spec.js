describe('select', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('receives the right arguments on current step is rendered', function() {
    // given
    var self = $('form').stepy({
      select: function(index, totalSteps) {
        $(this).data({
          index:      index,
          totalSteps: totalSteps
        });
      }
    });

    // when
    self.find('fieldset:eq(0) .button-next').trigger('click');

    // then
    expect(self.data('index')).toEqual(2);
    expect(self.data('totalSteps')).toEqual(3);
  });
});
