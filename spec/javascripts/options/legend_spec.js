describe('legend', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('disabled', function() {
    it ('is not displayed', function() {
      // given
      var self = $('form');

      // when
      self.stepy({ legend: false });

      // then
      var legends = self.find('legend');

      expect(legends.eq(0)).toBeHidden();
      expect(legends.eq(1)).toBeHidden();
      expect(legends.eq(2)).toBeHidden();
    });
  });
});
