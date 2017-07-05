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
    it ('does not creates the header', function() {
      // given
      var self = $('form');

      // when
      self.stepy({ header: false });

      // then
      expect($('.stepy-header').length).toEqual(0);
    });

    it ('keeps all the things working', function() {
      // given
      var self = $('form').stepy({
        header: false,
        finish: function() {
          $(this).data('called', true);

          return false;
        }
      });

      // when
      self.find('fieldset:eq(0) .stepy-next').trigger('click');
      self.find('fieldset:eq(1) .stepy-next').trigger('click');
      self.find('.stepy-finish').trigger('click');

      // then
      expect(self.data('called')).toBeTruthy();
    });
  });
});
