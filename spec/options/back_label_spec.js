describe('backLabel', function() {
  'use strict';

  it ('changes the back button label', function() {
    // given
    var
      self  = $('form'),
      steps = self.children('fieldset');

    // when
    self.stepy({ backLabel: '&lt;&lt;' });

    // then
    expect(steps.eq(1).find('.button-back')).toHaveHtml('&lt;&lt;');
    expect(steps.eq(2).find('.button-back')).toHaveHtml('<<');
  });
});
