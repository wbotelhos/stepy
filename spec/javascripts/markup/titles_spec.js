describe('titles', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is created', function() {
    // given
    var self = $('form').stepy();

    // when
    var menus  = $('#' + self.attr('id') + '-header').children('li');

    // then
    expect(menus.eq(0).children('div')).toHaveHtml('Step 1');
    expect(menus.eq(1).children('div')).toHaveHtml('Step 2');
    expect(menus.eq(2).children('div')).toHaveHtml('Step 3');
  });

  it ('has the click disabled', function() {
    // given
    var self  = $('form').stepy(),
      steps = self.children();

    // when
    $('#' + self.attr('id') + '-header').children('li:eq(1)').click();

    // then
    expect(steps.eq(0)).toBeVisible();
    expect(steps.eq(1)).toBeHidden();
    expect(steps.eq(2)).toBeHidden();
  });
});
