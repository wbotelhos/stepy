describe('header', function() {
  'use strict';

  beforeEach(function() {
    Factory.append(Factory.form({ id: 'stepy', html: [
      Factory.fieldset({ title: 'Step 1', html: [
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
      ] }), Factory.fieldset({ title: 'Step 2', html: [
        Factory.legend({ html: 'description 2' }),
        Factory.label({ html: 'Bio' }),
        Factory.textarea({ name: 'bio' })
      ] }), Factory.fieldset({ title: 'Step 3', html: [
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

  it ('is created', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    expect($('#' + self.attr('id') + '-header')).toExist();
  });

  it ('starts with the first actived', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    var menus = $('#' + self.attr('id') + '-header').children('li');

    expect(menus.eq(0)).toHaveClass('stepy-active');
    expect(menus.eq(1)).not.toHaveClass('stepy-active');
    expect(menus.eq(2)).not.toHaveClass('stepy-active');
  });

  describe('titles', function() {
    it ('is created', function() {
      // given
      var self = $('form').stepy();

      // when
      var menus  = $('#' + self.attr('id') + '-header').children('li');

      // then
      expect(menus.eq(0).children('div')).toHaveHtml('Step 1');
      expect(menus.eq(1).children('div')).toHaveHtml('Step 2');
      expect(menus.eq(2).children('div')).toHaveHtml('Step 3');
    });

    it ('has the click disabled', function() {
      // given
      var self  = $('form').stepy(),
        steps = self.children();

      // when
      $('#' + self.attr('id') + '-header').children('li:eq(1)').click();

      // then
      expect(steps.eq(0)).toBeVisible();
      expect(steps.eq(1)).toBeHidden();
      expect(steps.eq(2)).toBeHidden();
    });
  });

  describe('descriptions', function() {
    it ('is created', function() {
      // given
      var self = $('form').stepy();

      // when
      var menus = $('#' + self.attr('id') + '-header').children('li');

      // then
      expect(menus.eq(0).children('span')).toHaveHtml('description 1');
      expect(menus.eq(1).children('span')).toHaveHtml('description 2');
      expect(menus.eq(2).children('span')).toHaveHtml('description 3');
    });
  });
});
