describe('descriptions', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is created', function() {
    // given
    var self = $('form').stepy();

    // when
    var menus = $('#' + self.attr('id') + '-header').children('li');

    // then
    expect(menus.eq(0).children('span')).toHaveHtml('description 1');
    expect(menus.eq(1).children('span')).toHaveHtml('description 2');
    expect(menus.eq(2).children('span')).toHaveHtml('description 3');
  });
});
