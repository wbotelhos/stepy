describe('errorImage', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('with invalid field', function() {
    it ('appears on step title', function() {
      // given
      var
        self = $('form').stepy({
          errorImage: true,

          validate: function(field) {
            return self.validaty('validate', $(field)).data('valid');
          }
        }).validaty(),
        steps  = self.children('fieldset'),
        titles = $('#' + self.attr('id') + '-header').children('li');

      // when
      steps.eq(0).find('.stepy-next').trigger('click');

      // then
      expect(titles.eq(0)).toHaveClass('stepy-error');
    });
  });
});
