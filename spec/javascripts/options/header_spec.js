describe('header', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('when true', function() {
    it ('creates the header', function() {
      // given
      var self = $('form');

      // when
      self.stepy({ header: true });

      // then
      expect($('.stepy-header').length).toEqual(1);
    });
  });

  context('when false', function() {
    it ('creates the header', function() {
      // given
      var self = $('form');

      // when
      self.stepy({ header: false });

      // then
      expect($('.stepy-header').length).toEqual(0);
    });
  });
});
