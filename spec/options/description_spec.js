describe('description', function() {
  'use strict';

  context('disabled', function() {
    it ('is not created', function() {
      // given
      var self = $('form');

      // when
      self.stepy({ description: false });

      // then
      var menus = $('#' + self.attr('id') + '-header').children('li');

      expect(menus.eq(0).find('span').length).toEqual(0);
      expect(menus.eq(1).find('span').length).toEqual(0);
      expect(menus.eq(2).find('span').length).toEqual(0);
    });
  });
});
