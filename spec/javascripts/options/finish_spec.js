describe('finish', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is called on trigger finish button', function() {
    // given
    var self = $('form').stepy({
        finish: function() {
          $(this).data('called', true);
        }
      }),
      steps     = self.children('fieldset');

    self.on('submit', function(evt) {
      evt.preventDefault();
    });

    steps.eq(1).find('.stepy-next').click();

    // when
    steps.eq(2).find(':submit').click();

    // then
    expect(self.data('called')).toBeTruthy();
  });
});
