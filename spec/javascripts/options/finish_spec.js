describe('finish', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('form_with_submit_button.html');
  });

  afterEach(function() {
    $('#fixture_container').empty();
  });

  it ('is called on trigger finish button', function() {
    // given
    var
      self = $('form').stepy({
        finish: function() {
          $(this).data('called', true);
        }
      }),
      steps = self.children('fieldset');

    self.on('submit', function(evt) {
      evt.preventDefault();
    });

    self.find('fieldset:eq(0)').find('.stepy-next').trigger('click');
    self.find('fieldset:eq(1)').find('.stepy-next').trigger('click');

    // when
    self.find('.stepy-finish').trigger('click');

    // then
    expect(self.data('called')).toBeTruthy();
  });
});
