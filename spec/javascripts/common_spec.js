describe('common', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

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
    expect(opt.backButton).toEqual('.stepy-back');
    expect(opt.block).toBeFalsy();
    expect(opt.description).toBeTruthy();
    expect(opt.duration).toEqual(0);
    expect(opt.enter).toBeTruthy();
    expect(opt.errorImage).toBeFalsy();
    expect(opt.finish).toBeUndefined();
    expect(opt.finishButton).toEqual('.stepy-finish');
    expect(opt.header).toBeTruthy();
    expect(opt.ignore).toEqual('');
    expect(opt.legend).toBeTruthy();
    expect(opt.legendClass).toEqual('.stepy-finish');
    expect(opt.next).toBeUndefined();
    expect(opt.nextButton).toEqual('.stepy-next');
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
    beforeEach(function() {
      $('form').removeAttr('id');
    });

    it ('is generates a random one', function() {
      // given
      var self = $('form');

      // when
      self.stepy();

      // then
      expect(self[0].id).not.toBeUndefined();
    });

    it ('is used on the header', function() {
      // given
      var self = $('form');

      // when
      self.stepy();

      // then
      expect(self.prev('ul').attr('id')).toEqual(self[0].getAttribute('id') + '-header');
    });
  });
});
