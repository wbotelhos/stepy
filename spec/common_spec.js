describe('common', function() {
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

  it ('is chainable', function() {
    // given
    var self = $('form');

    // when
    var ref = self.stepy();

    // then
    expect(ref).toBe(self);
  });

  it ('has the right values', function() {
    // given
    var stepy = $.fn.stepy

    // when
    var opt = stepy.defaults

    // then
    expect(opt.bacck).toBeUndefined();
    expect(opt.backLabel).toEqual('&lt; Back');
    expect(opt.block).toBeFalsy();
    expect(opt.description).toBeTruthy();
    expect(opt.duration).toBeUndefined();
    expect(opt.enter).toBeTruthy();
    expect(opt.errorImage).toBeFalsy();
    expect(opt.finish).toBeUndefined();
    expect(opt.finishButton).toBeTruthy();
    expect(opt.ignore).toEqual('');
    expect(opt.legend).toBeTruthy();
    expect(opt.next).toBeUndefined();
    expect(opt.nextLabel).toEqual('Next &gt;');
    expect(opt.select).toBeUndefined();
    expect(opt.titleClick).toBeFalsy();
    expect(opt.titleTarget).toBeUndefined();
    expect(opt.transition).toBeUndefined();
    expect(opt.validate).toBeFalsy();
  });

  it ('receives the bind indicator', function() {
    // given
    var self = $('form');

    // when
    self.stepy();

    // then
    expect(self.data('stepy')).toBeTruthy();
  });

  context('when form has no id', function() {
    beforeEach(function() { $('form').removeAttr('id'); });

    it ('is generates a random one', function() {
      // given
      var self = $('form');

      // when
      self.stepy();

      // then
      expect(self[0].hash).not.toBeUndefined();
    });

    it ('is used on the header', function() {
      // given
      var self = $('form');

      // when
      self.stepy();

      // then
      expect(self.prev('ul').attr('id')).toEqual(self[0].hash + '-header');
    });
  });
});
