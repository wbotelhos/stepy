describe('next', function() {
  'use strict';

  it ('is called on trigger next button', function() {
    // given
    var self  = $('form').stepy({ next: function() { $(this).data('called', true); } }),
      steps = self.children('fieldset');

    // when
    steps.eq(0).find('.button-next').click();

    // then
    expect(self.data('called')).toBeTruthy();
  });

  it ('receives the right index', function() {
    // given
    var self  = $('form').stepy({ next: function(index) { $(this).data('index', index); } }),
      steps = self.children('fieldset');

    // when
    steps.eq(0).find('.button-next').click();

    // then
    expect(self.data('index')).toEqual(2);
  });
});
