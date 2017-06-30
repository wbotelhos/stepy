describe('backButton', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  afterEach(function() {
    $('#fixture_container').empty();
  });

  it ('starts hidden', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    expect(self.find('.stepy-finish')).toBeHidden();
  });

  context('on second step', function() {
    it ('keeps hidden', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0)').find('.stepy-next').trigger('click');

      // then
      expect(self.find('.stepy-finish')).toBeHidden();
    });
  });

  context('on last step', function() {
    it ('becomes visible', function() {
      // given
      var self = $('form').stepy();

      // when
      self.find('fieldset:eq(0)').find('.stepy-next').trigger('click');
      self.find('fieldset:eq(1)').find('.stepy-next').trigger('click');

      // then
      expect(self.find('.stepy-finish')).toBeVisible();
    });
  });
});
