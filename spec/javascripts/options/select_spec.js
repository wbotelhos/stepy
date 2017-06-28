describe('select', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is called on change the step', function() {
    // given
    var self  = $('form').stepy({ select: function() { $(this).data('called', true); } }),
      steps = self.children('fieldset');

    // when
    steps.eq(0).find('.button-next').click();

    // then
    expect(self.data('called')).toBeTruthy();
  });

  it ('receives the right index', function() {
    // given
    var self  = $('form').stepy({ select: function(index) { $(this).data('index', index); } }),
      steps = self.children('fieldset');

    // when
    steps.eq(0).find('.button-next').click();

    // then
    expect(self.data('index')).toEqual(2);
  });
});
