describe('nextLabel', function() {
  'use strict';

  it ('changes the next button label', function() {
    // given
    var self  = $('form'),
      steps = self.children('fieldset');

    // when
    self.stepy({ nextLabel: '&gt;&gt;' });

    // then
    expect(steps.eq(0).find('.button-next')).toHaveHtml('&gt;&gt;');
    expect(steps.eq(1).find('.button-next')).toHaveHtml('>>');
  });
});
