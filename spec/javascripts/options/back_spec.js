describe('back', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is called on trigger back button', function() {
    // given
    var
      self = $('form').stepy({
        back: function() {
          $(this).data('called', true);
        }
      }),
      steps = self.children('fieldset');

    steps.eq(0).find('.button-next').click();

    // when
    steps.eq(1).find('.button-back').click();

    // then
    expect(self.data('called')).toBeTruthy();
  });

  it ('receives the right index', function() {
    // given
    var self  = $('form').stepy({ back: function(index) { $(this).data('index', index); } }),
      steps = self.children('fieldset');

    steps.eq(0).find('.button-next').click();

    // when
    steps.eq(1).find('.button-back').click();

    // then
    expect(self.data('index')).toEqual(1);
  });
});
