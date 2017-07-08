describe('validate', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('enabled', function() {
    context('fails', function() {
      it ('displays the error', function() {
        // given
        var
          self = $('form').stepy({
            validate: function(field) {
              return self.validaty('validate', $(field)).data('valid');
            }
          }).validaty(),
          steps = self.children('fieldset');

        // when
        steps.eq(1).find('.stepy-next').click();

        // then
        expect(self.find('.validaty-balloon').length).toEqual(1);
      });
    });
  });
});
