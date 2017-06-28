describe('validate', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('when enabled', function() {
    context('and fails', function() {
      it ('displays error', function() {
        // given
        var self  = $('form').stepy({ validate: true }),
          steps = self.children('fieldset');

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
        steps.eq(1).find('.stepy-next').click();

        // then
        expect(self.find('.stepy-errors label.error').length).toEqual(1);
      });
    });
  });
});
