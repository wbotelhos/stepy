describe('transition', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('keeps all the things working', function() {
    // given
    var self = $('form').stepy({
      transition: true,
      finish: function() {
        $(this).data('called', true);

        return false;
      }
    });

    // when
    self.find('fieldset:eq(0) .stepy-next').trigger('click');
    self.find('fieldset:eq(1) .stepy-next').trigger('click');
    self.find('.stepy-finish').trigger('click');

    // then
    expect(self.data('called')).toBeTruthy();
  });
});
