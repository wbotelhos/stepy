describe('body', function() {
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
      ]}), Factory.fieldset({ title: 'Step 2', html: [
        Factory.legend({ html: 'description 2' }),
        Factory.label({ html: 'Bio' }),
        Factory.textarea({ name: 'bio' })
      ]}), Factory.fieldset({ title: 'Step 3', html: [
        Factory.legend({ html: 'description 3' }),
        Factory.label({ html: 'Birthday' }),
        Factory.select({ name: 'day', html: [Factory.option(), Factory.option({ html: 23 })]}),
        Factory.label({ html: 'Site' }),
        Factory.text({ name: 'site' })
      ]}),
      Factory.submit()
    ]}));
  });

  afterEach(function() { Factory.clear(); });

  describe('steps', function() {
    describe('fields', function() {
      it ('focused the first', function() {
        // given
        var self  = $('form'),
            steps = self.children('fieldset');

        // when
        self.stepy();

        // then
        expect(steps.first().find(':input:enabled:visible:first')).toBeFocused();
      });
    });

    describe('first', function() {
      it ('starts actived', function() {
        // given
        var self  = $('form'),
            steps = self.children();

        // when
        self.stepy();

        // then
          expect(steps.eq(0)).toBeVisible();
          expect(steps.eq(1)).toBeHidden();
          expect(steps.eq(2)).toBeHidden();
      });

      describe('navigator', function() {
        it ('has the next button', function() {
          // given
          var self = $('form'),
              step = self.children('fieldset:first');

          // when
          self.stepy();

          // then
          var nav = step.children('.stepy-navigator');

          expect(step.find('p.stepy-navigator').length).toEqual(1);
          expect(nav.find('.button-back').length).toEqual(0);
          expect(nav.find('.button-next').length).toEqual(1);
        });

        it ('has the right labels', function() {
          // given
          var self = $('form'),
              step = self.children('fieldset:first');

          // when
          self.stepy();

          // then
          expect(step.find('.button-next')).toHaveHtml('Next &gt;');
        });

        context('clicking on next', function() {
          it ('goes to second step', function() {
            // given
            var self  = $('form').stepy(),
                steps = self.children();

            // when
            steps.eq(0).find('.button-next').click();

            // then
            expect(steps.eq(0)).toBeHidden();
            expect(steps.eq(1)).toBeVisible();
            expect(steps.eq(2)).toBeHidden();
          });

          it ('focus the first field', function() {
            // given
            var self  = $('form').stepy(),
                steps = self.children('fieldset');

            // when
            steps.eq(0).find('.button-next').click();

            // then
            expect(steps.eq(1).find(':input:enabled:visible:first')).toBeFocused();
          });
        });
      });
    });

    describe('middle', function() {
      describe('navigator', function() {
        it ('has the back and next button', function() {
          // given
          var self = $('form'),
              step = self.children('fieldset:eq(1)');

          // when
          self.stepy();

          // then
          var nav = step.children('.stepy-navigator');

          expect(step.find('.stepy-navigator').length).toEqual(1);
          expect(nav.find('.button-back').length).toEqual(1);
          expect(nav.find('.button-next').length).toEqual(1);
        });

        it ('has the right labels', function() {
          // given
          var self = $('form'),
              step = self.children('fieldset:eq(1)');

          // when
          self.stepy();

          // then
          expect(step.find('.button-back')).toHaveHtml('&lt; Back');
          expect(step.find('.button-next')).toHaveHtml('Next &gt;');
        });

        context('clicking on next', function() {
          it ('goes to third step', function() {
            // given
            var self  = $('form').stepy(),
                steps = self.children();

            // when
            steps.eq(0).find('.button-next').click();
            steps.eq(1).find('.button-next').click();

            // then
            expect(steps.eq(0)).toBeHidden();
            expect(steps.eq(1)).toBeHidden();
            expect(steps.eq(2)).toBeVisible();
          });
        });

        context('clicking on back', function() {
          it ('goes to first step', function() {
            // given
            var self  = $('form').stepy(),
                steps = self.children();

            steps.eq(0).find('.button-next').click();

            // when
            steps.eq(1).find('.button-back').click();

            // then
            expect(steps.eq(0)).toBeVisible();
            expect(steps.eq(1)).toBeHidden();
            expect(steps.eq(2)).toBeHidden();
          });

          it ('focus the first field', function() {
            // given
            var self  = $('form').stepy(),
                steps = self.children('fieldset');

            steps.eq(0).find('.button-next').click();

            // when
            steps.eq(1).find('.button-back').click();

            // then
            expect(steps.eq(0).find(':input:enabled:visible:first')).toBeFocused();
          });
        });
      });
    });
  });

  describe('last', function() {
    it ('has the back', function() {
      // given
      var self = $('form'),
          step = self.children('fieldset:last');

      // when
      self.stepy();

      // then
      var nav = step.children('.stepy-navigator');

      expect(step.find('.stepy-navigator').length).toEqual(1);
      expect(nav.find('.button-back').length).toEqual(1);
      expect(nav.find('.button-next').length).toEqual(0);
    });

    it ('has the right labels', function() {
      // given
      var self = $('form'),
          step = self.children('fieldset:last');

      // when
      self.stepy();

      // then
      expect(step.find('.button-back')).toHaveHtml('&lt; Back');
    });

    it ('has the finish button', function() {
      // given
      var self = $('form'),
          step = self.children('fieldset:last');

      // when
      self.stepy();

      // then
      expect(step.find(':submit')).toExist();
    });

    context('clicking on back', function() {
      it ('goes to first step', function() {
        // given
        var self  = $('form').stepy(),
            steps = self.children();

        // when
        steps.eq(0).find('.button-next').click();
        steps.eq(1).find('.button-next').click();
        steps.eq(2).find('.button-back').click();

        // then
        expect(steps.eq(0)).toBeHidden();
        expect(steps.eq(1)).toBeVisible();
        expect(steps.eq(2)).toBeHidden();
      });
    });
  });
});
