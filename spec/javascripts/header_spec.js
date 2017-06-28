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

  describe('titles', function() {
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

  describe('descriptions', function() {
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
});
