describe('titleTarget', function() {
  'use strict';

  beforeEach(function() {
    fixture.load('default.html');
  });

  context('with target', function() {
    beforeEach(function() {
      this.target = $('<div />', { id: 'target' }).appendTo('body');
    });

    it ('receives the titles of the steps', function() {
      // given
      var self = $('form');

      // when
      self.stepy({ titleTarget: '#' + this.target.attr('id') });

      // then
      expect($(target).find('#' + self[0].id + '-header').length).toEqual(1);
    });
  });

  context('clicking on next title', function() {
    context('with next callback', function() {
      it ('receives the right index', function() {
        // given
        var self = $('form').stepy({
          next:       function(index) { $(this).data('step', index); },
          titleClick: true
        });

        // when
        $('#' + self[0].id + '-header li:eq(1)').trigger('click');

        // then
        expect(self.data('step')).toEqual(1);
      });
    });
  });

  context('clicking on back title', function() {
    context('with back callback', function() {
      it ('receives the right index', function() {
        // given
        var
          self = $('form').stepy({
            back:       function(index) { $(this).data('step', index); },
            titleClick: true
          }),
          titles = $('#' + self[0].id + '-header').children('li');

        titles.eq(1).trigger('click');

        // when
        titles.eq(0).trigger('click');

        // then
        expect(self.data('step')).toEqual(0);
      });
    });
  });

  context('clicking on other title', function() {
    context('with select callback', function() {
      it ('receives the right index', function() {
        // given
        var
          self = $('form').stepy({
            titleClick: true,
            select    : function(index) { $(this).data('step', index); }
          });

        // when
        $('#' + self[0].id + '-header li:eq(1)').trigger('click');

        // then
        expect(self.data('step')).toEqual(1);
      });
    });
  });

  context('with validate enabled', function() {
    context('and block enabled', function() {
      it ('blocks the step change', function() {
        // given
        var
          self  = $('form').stepy({ block: true, titleClick: true, validate: true }),
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
        $('#' + self[0].id + '-header').children('li').eq(2).trigger('click');

        // then
        expect(steps.eq(0)).toBeVisible();
        expect(steps.eq(1)).toBeHidden();
        expect(steps.eq(2)).toBeHidden();
      });
    });

    context('and errorImage enabled', function() {
      it ('display the error image', function() {
        // given
        var
          self   = $('form').stepy({ errorImage: true, titleClick: true, validate: true }),
          titles = $('#' + self[0].id + '-header').children('li');

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
        titles.eq(2).trigger('click');

        // then
        expect(titles.eq(0)).toHaveClass('stepy-error');
      });
    });
  });
});
