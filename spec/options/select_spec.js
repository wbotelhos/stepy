describe('select', function() {
  'use strict';

  beforeEach(function() {
    Factory.append(Factory.form({ id:   'stepy', html: [
      Factory.fieldset({ title: 'Step 1', html:  [
        Factory.legend({ html: 'description 1' }),
        Factory.label({ html: 'User' }),
        Factory.hidden({ name: 'hidden' }),
        Factory.text({ value: 'wbotelhos', name: 'user', disabled: true }),

        Factory.label({ html: 'E-mail' }),
        Factory.text({ name: 'email' }),

        Factory.label({ html: 'Checked?' }),
        Factory.checkbox({ name: 'checked' }),

        Factory.label({ html: 'Newsletter?' }),
        Factory.label({ html: 'Yep' }),
        Factory.radio({ name: 'newsletter' }),
        Factory.label({ html: 'Nop' }),
        Factory.radio({ name: 'newsletter' }),

        Factory.label({ html: 'Password' }),
        Factory.password({ name: 'password' })
      ] }), Factory.fieldset({ title: 'Step 2', html:  [
        Factory.legend({ html: 'description 2' }),
        Factory.label({ html: 'Bio' }),
        Factory.textarea({ name: 'bio' })
      ] }), Factory.fieldset({ title: 'Step 3', html:  [
        Factory.legend({ html: 'description 3' }),
        Factory.label({ html: 'Birthday' }),
        Factory.select({ name: 'day', html: [Factory.option(), Factory.option({ html: 23 })] }),
        Factory.label({ html: 'Site' }),
        Factory.text({ name: 'site' })
      ] }),
      Factory.submit()
    ] }));
  });

  afterEach(function() { Factory.clear(); });

  it ('is called on change the step', function() {
    // given
    var self  = $('form').stepy({ select: function() { $(this).data('called', true); } }),
      steps = self.children('fieldset');

    // when
    steps.eq(0).find('.button-next').click();

    // then
    expect(self.data('called')).toBeTruthy();
  });

  it ('receives the right index', function() {
    // given
    var self  = $('form').stepy({ select: function(index) { $(this).data('index', index); } }),
      steps = self.children('fieldset');

    // when
    steps.eq(0).find('.button-next').click();

    // then
    expect(self.data('index')).toEqual(2);
  });
});
