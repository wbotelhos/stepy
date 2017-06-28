describe('errorImage', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('with invalid field', function() {
    it ('appears on step title', function() {
      // given
      var
        self   = $('form').stepy({ errorImage: true, validate: true }),
        steps  = self.children('fieldset'),
        titles = $('#' + self.attr('id') + '-header').children('li');

      self.validate({
        errorPlacement: function(error, element) {
          $('#stepy div.stepy-errors').append(error);
        }, rules: {
          'password':  'required'
        }, messages: {
          'password':  { required: 'Password field is requerid!' }
        }
      });

      // when
      steps.eq(0).find('.stepy-next').click();

      // then
      expect(titles.eq(0)).toHaveClass('stepy-error');
    });
  });
});
