describe('header', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  it ('is created', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    expect($('#' + self.attr('id') + '-header')).toExist();
  });

  it ('starts with the first actived', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    var menus = $('#' + self.attr('id') + '-header').children('li');

    expect(menus.eq(0)).toHaveClass('stepy-active');
    expect(menus.eq(1)).not.toHaveClass('stepy-active');
    expect(menus.eq(2)).not.toHaveClass('stepy-active');
  });
});
