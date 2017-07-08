describe('validate', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('when validation is given', function() {
    context('and fails', function() {
      it ('displays error', function() {
        // given
        var self = $('form').stepy({
          validate: function(field) {
            return self.validaty('validate', $(field)).data('valid');
          }
        }).validaty();

        // when
        self.find('.stepy-step:eq(0) .stepy-next').trigger('click');

        // then
        expect(self.find('.validaty-balloon').length).toEqual(1);
      });
    });
  });
});
