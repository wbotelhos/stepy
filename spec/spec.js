describe('Stepy', function() {
  beforeEach(function() {
    Helper.append(Helper.form({ id: 'stepy', html: [
      Helper.fieldset({ title: 'Step 1', html: [
        Helper.legend({ html: 'description 1' }),
        Helper.label({ html: 'User' }),
        Helper.hidden({ name: 'hidden' }),
        Helper.text({ value: 'wbotelhos', name: 'user', disabled: true }),

        Helper.label({ html: 'E-mail' }),
        Helper.text({ name: 'email' }),

        Helper.label({ html: 'Checked?' }),
        Helper.checkbox({ name: 'checked' }),

        Helper.label({ html: 'Newsletter?' }),
        Helper.label({ html: 'Yep' }),
        Helper.radio({ name: 'newsletter' }),
        Helper.label({ html: 'Nop' }),
        Helper.radio({ name: 'newsletter' }),

        Helper.label({ html: 'Password' }),
        Helper.password({ name: 'password' })
      ]}), Helper.fieldset({ title: 'Step 2', html: [
        Helper.legend({ html: 'description 2' }),
        Helper.label({ html: 'Bio' }),
        Helper.textarea({ name: 'bio' })
      ]}), Helper.fieldset({ title: 'Step 3', html: [
        Helper.legend({ html: 'description 3' }),
        Helper.label({ html: 'Birthday' }),
        Helper.select({ name: 'day', html: [Helper.option(), Helper.option({ html: 23 })]}),
        Helper.label({ html: 'Site' }),
        Helper.text({ name: 'site' })
      ]}),
      Helper.submit({ value: 'Finish!', class: 'finish' })
    ]}));
  });

  afterEach(function() { Helper.clear(); });

  it ('is chainable', function() {
    // given
    var self = $('form');

    // when
    var ref = self.stepy();

    // then
    expect(ref).toBe(self);
  });

  describe('header', function() {
    it ('is created', function() {
      // given
      var self = $('form');

      // when
      self.stepy();

      // then
      expect($('#stepy-titles')).toExist();
    });

    it ('starts with the first actived', function() {
      // given
      var self = $('form');

      // when
      self.stepy();

      // then
      var menus = $('#stepy-titles').children('li');

      expect(menus.eq(0)).toHaveClass('current-step');
      expect(menus.eq(1)).not.toHaveClass('current-step');
      expect(menus.eq(2)).not.toHaveClass('current-step');
    });

    describe('titles', function() {
      it ('is created', function() {
        // given
        $('form').stepy();

        // when
        var menus  = $('#stepy-titles').children('li');

        // then
        expect(menus.eq(0).children('div')).toHaveHtml('Step 1');
        expect(menus.eq(1).children('div')).toHaveHtml('Step 2');
        expect(menus.eq(2).children('div')).toHaveHtml('Step 3');
      });

      it ('has the click disabled', function() {
        // given
        var form  = $('form').stepy(),
            steps = form.children();

        // when
        $('#stepy-titles').children('li:eq(1)').click();

        // then
        expect(steps.eq(0)).toBeVisible();
        expect(steps.eq(1)).toBeHidden();
        expect(steps.eq(2)).toBeHidden();
      });
    });

    describe('descriptions', function() {
      it ('is created', function() {
        // given
        $('form').stepy();

        // when
        var menus  = $('#stepy-titles').children('li');

        // then
        expect(menus.eq(0).children('span')).toHaveHtml('description 1');
        expect(menus.eq(1).children('span')).toHaveHtml('description 2');
        expect(menus.eq(2).children('span')).toHaveHtml('description 3');
      });
    });
  });

  describe('body', function() {
    describe('steps', function() {
      describe('fields', function() {
        it ('focused the first', function() {
          // given
          var form  = $('form'),
              steps = form.children('fieldset');

          // when
          form.stepy();

          // then
          expect(steps.first().find(':input:enabled:visible:first')).toBeFocused();
        });
      });

      describe('first', function() {
        it ('starts actived', function() {
          // given
          var form  = $('form'),
              steps = form.children();

          // when
          form.stepy();

          // then
            expect(steps.eq(0)).toBeVisible();
            expect(steps.eq(1)).toBeHidden();
            expect(steps.eq(2)).toBeHidden();
        });

        describe('buttons', function() {
          it ('has the next', function() {
            // given
            var form = $('form'),
                step = form.children('fieldset:first');

            // when
            form.stepy();

            // then
            var buttons = step.children('.stepy-buttons');

            expect(step).toContain('p.stepy-buttons');
            expect(buttons).not.toContain('.button-back');
            expect(buttons).toContain('.button-next');
          });

          it ('has the right labels', function() {
            // given
            var form = $('form'),
                step = form.children('fieldset:first');

            // when
            form.stepy();

            // then
            expect(step.find('.button-next')).toHaveHtml('Next &gt;');
          });

          context('clicking on next', function() {
            it ('goes to second step', function() {
              // given
              var form  = $('form').stepy(),
                  steps = form.children();

              // when
              steps.eq(0).find('.button-next').click();

              // then
              expect(steps.eq(0)).toBeHidden();
              expect(steps.eq(1)).toBeVisible();
              expect(steps.eq(2)).toBeHidden();
            });
          });
        });
      });

      describe('middle', function() {
        describe('buttons', function() {
          it ('has the back and next', function() {
            // given
            var form = $('form'),
                step = form.children('fieldset:eq(1)');

            // when
            form.stepy();

            // then
            var buttons = step.children('.stepy-buttons');

            expect(step).toContain('.stepy-buttons');
            expect(buttons).toContain('.button-back');
            expect(buttons).toContain('.button-next');
          });

          it ('has the right labels', function() {
            // given
            var form = $('form'),
                step = form.children('fieldset:eq(1)');

            // when
            form.stepy();

            // then
            expect(step.find('.button-back')).toHaveHtml('&lt; Back');
            expect(step.find('.button-next')).toHaveHtml('Next &gt;');
          });

          context('clicking on next', function() {
            it ('goes to third step', function() {
              // given
              var form  = $('form').stepy(),
                  steps = form.children();

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
              var form  = $('form').stepy(),
                  steps = form.children();

              // when
              steps.eq(0).find('.button-next').click();
              steps.eq(1).find('.button-back').click();

              // then
              expect(steps.eq(0)).toBeVisible();
              expect(steps.eq(1)).toBeHidden();
              expect(steps.eq(2)).toBeHidden();
            });
          });
        });
      });
    });

    describe('last', function() {
      it ('has the back', function() {
        // given
        var form = $('form'),
            step = form.children('fieldset:last');

        // when
        form.stepy();

        // then
        var buttons = step.children('.stepy-buttons');

        expect(step).toContain('.stepy-buttons');
        expect(buttons).toContain('.button-back');
        expect(buttons).not.toContain('.button-next');
      });

      it ('has the right labels', function() {
        // given
        var form = $('form'),
            step = form.children('fieldset:last');

        // when
        form.stepy();

        // then
        expect(step.find('.button-back')).toHaveHtml('&lt; Back');
      });

      it ('has the finish button', function() {
        // given
        var form = $('form'),
            step = form.children('fieldset:last');

        // when
        form.stepy();

        // then
        expect(step.find('input[type="submit"]')).toExist();
      });

      context('clicking on back', function() {
        it ('goes to first step', function() {
          // given
          var form  = $('form').stepy(),
              steps = form.children();

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

  describe('options', function() {
    describe('finishButton', function() {
      context('disabled', function() {
        it ('is not created', function() {
          // given
          var form = $('form'),
              step = form.children('fieldset:last');

          // when
          form.stepy({ finishButton: false });

          // then
          expect(step).not.toContain('input[type="submit"]');
        });
      });
    });
  });






  // Refactoring...










  it ('should call back callback', function() {
    // given
    var form  = $('form').stepy({ back: function() { this.addClass('my-class'); } }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    steps.eq(0).find('.button-next').click();

    // when
    steps.eq(1).find('.button-back').click();

    // then
    expect(form).toHaveClass('my-class');

    expect(first).not.toBeHidden();
      expect(second).toBeHidden();
      expect(third).toBeHidden();
  });

  it ('should call next callback', function() {
    // given
    var form  = $('form').stepy({ next: function() { this.addClass('my-class'); } }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    // when
    steps.eq(0).find('.button-next').click();

    // then
    expect(form).toHaveClass('my-class');

    expect(first).toBeHidden();
      expect(second).not.toBeHidden();
      expect(third).toBeHidden();
  });

  it ('should call finish callback', function() {
    // given
    var form  = $('form').stepy({ finish: function() { this.addClass('my-class'); } }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    steps.eq(1).find('.button-next').click();

    form.submit (function(evt) {
      evt.preventDefault();
    });

    // when
    steps.eq(2).find('input.finish').click();

    // then
    expect(form).toHaveClass('my-class');

    expect(first).toBeHidden();
      expect(second).toBeHidden();
      expect(third).not.toBeHidden();
  });

  it ('should have custom label on navigation buttons', function() {
    // given
    var form  = $('form'),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    // when
    form.stepy({ backLabel: '&lt;&lt;', nextLabel: '&gt;&gt;' });

    // then
    var firstNext  = first.find('.button-next'),
      secondBack  = second.find('.button-back'),
      secondNext  = second.find('.button-next'),
      thirdBack  = third.find('.button-back');

    expect(firstNext).toHaveHtml('>>');

    expect(secondBack).toHaveHtml('&lt;&lt;');
    expect(secondNext).toHaveHtml('&gt;&gt;');

    expect(thirdBack).toHaveHtml('&lt;&lt;');
  });

  it ('should display error when exists invalid fields', function() {
    // given
    var form  = $('form').stepy({ validate: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    // when
    first.find('.button-next').click();

    // then
    expect(form.children('.stepy-error')).toContain('label.error');
    expect(first).toBeHidden();
    expect(second).not.toBeHidden();
    expect(third).toBeHidden();
  });

  it ('should block step when exists invalid fields', function() {
    // given
    var form  = $('form').stepy({ block: true, validate: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    // when
    first.find('.button-next').click();

    // then
    expect(form.children('.stepy-error')).toContain('label.error');
    expect(first).not.toBeHidden();
    expect(second).toBeHidden();
    expect(third).toBeHidden();
  });

  it ('should not block step when not exists invalid fields', function() {
    // given
    var form  = $('form').stepy({ block: true, validate: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    form.find('input[name="password"]').val('password');

    // when
    first.find('.button-next').click();

    // then
    expect(form.children('.stepy-error')).not.toContain('label.error');
    expect(first).toBeHidden();
    expect(second).not.toBeHidden();
    expect(third).toBeHidden();
  });

  it ('should block step with custom icon error when exists invalid fields', function() {
    // given
    var form  = $('form').stepy({ block: true, errorImage: true, validate: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    // when
    first.find('.button-next').click();

    // then
    expect($('#stepy-titles').children('li').eq(0)).toHaveClass('error-image');
    expect(form.children('.stepy-error')).toContain('label.error');
    expect(first).not.toBeHidden();
    expect(second).toBeHidden();
    expect(third).toBeHidden();
  });

  it ('should not display description', function() {
    // given
    var form = $('form');

    // when
    form.stepy({ description: false });

    var menus  = $('#stepy-titles').children('li'),
      first  = menus.eq(0),
      second  = menus.eq(1),
      third   = menus.eq(2);

    // then
    expect(first).not.toContain('span');
    expect(second).not.toContain('span');
    expect(third).not.toContain('span');
  });

  it ('should not display legend', function() {
    // given
    var form  = $('form'),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    // when
    form.stepy({ legend: false });

    // then
    expect(first.children('legend')).toBeHidden();
    expect(second.children('legend')).toBeHidden();
    expect(third.children('legend')).toBeHidden();
  });

  it ('should have titleClick enabled', function() {
    // given
    var form  = $('form').stepy({ titleClick: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    // when
    $('#stepy-titles').children('li').eq(2).click();

    // then
    expect(first).toBeHidden();
      expect(second).toBeHidden();
      expect(third).not.toBeHidden();
  });

  it ('should block step when exists invalid fields using titleClick', function() {
    // given
    var form  = $('form').stepy({ block: true, titleClick: true, validate: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    // when
    $('#stepy-titles').children('li').eq(2).click();

    // then
    expect(form.children('.stepy-error')).toContain('label.error');
    expect(first).not.toBeHidden();
    expect(second).toBeHidden();
    expect(third).toBeHidden();
  });

  it ('should block step with errorImage when exists invalid fields using titleClick', function() {
    // given
    var form  = $('form').stepy({ block: true, errorImage: true, titleClick: true, validate: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2),
      $titles = $('#stepy-titles');

    form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    // when
    $titles.children('li').eq(2).click();

    // then
    expect($titles.children('li').eq(0)).toHaveClass('error-image');
    expect(form.children('.stepy-error')).toContain('label.error');
    expect(first).not.toBeHidden();
    expect(second).toBeHidden();
    expect(third).toBeHidden();
  });

  it ('should move titles to target', function() {
    // given
    var $target = $('<div id="target"></div>').appendTo('body');

    // when
    $('form').stepy({ titleTarget: '#target' });

    var menus  = $target.children('#stepy-titles').children('li'),
      first  = menus.eq(0),
      second  = menus.eq(1),
      third   = menus.eq(2);

    // then
    expect(first.children('div')).toHaveHtml('Step 1');
    expect(second.children('div')).toHaveHtml('Step 2');
    expect(third.children('div')).toHaveHtml('Step 3');

    $target.remove();
  });

  it ('should have titleClick enabled', function() {
    // given
    var form  = $('form').stepy({ titleClick: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    // when
    $('#stepy-titles').children('li').eq(2).click();

    // then
    expect(first).toBeHidden();
      expect(second).toBeHidden();
      expect(third).not.toBeHidden();
  });

  it ('should move titles to target and works titleClick', function() {
    // given
    var $target = $('<div id="target"></div>').appendTo('body');

    // when
    var form   = $('form').stepy({ titleClick: true, titleTarget: '#target' }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    $target.children('#stepy-titles').children('li').eq(2).click();

    // then
    expect(first).toBeHidden();
      expect(second).toBeHidden();
      expect(third).not.toBeHidden();

    $target.remove();
  });

  it ('should be hidden the finish button', function() {
    // given
    var form  = $('form'),
      steps  = form.children(),
      third  = steps.eq(2);

    // when
    form.stepy();

    // then
    expect(third.find('input.finish')).toBeHidden();
  });

  it ('should be visible the finish button', function() {
    // given
    var form   = $('form').stepy(),
      steps  = form.children(),
      second  = steps.eq(1),
      third  = steps.eq(2);

    // when
    second.find('.button-next').click();

    // then
    expect(third.find('input.finish')).not.toBeHidden();
  });

  it ('should forward step with enter', function() {
    // given
    var form     = $('form').stepy(),
      steps    = form.children(),
      first    = steps.eq(0),
      second    = steps.eq(1),
      third    = steps.eq(2),
      $password  = form.find('input[name="password"]').val('password'),
      evt      = jQuery.Event('keypress');

      evt.which = 13;
      evt.keyCode = 13;

    // when
    $password.trigger(evt);

    // then
    expect(first).toBeHidden();
      expect(second).not.toBeHidden();
      expect(third).toBeHidden();
  });

  it ('should submit on last step with enter', function() {
    // given
    var form   = $('form').stepy({ finish: function() { this.addClass('my-class'); } }),
      steps  = form.children(),
      first  = steps.eq(0);
      second  = steps.eq(1);
      third  = steps.eq(2),
      $site  = form.find('input[name="site"]'),
      evt    = jQuery.Event('keypress');

    evt.which = 13;
    evt.keyCode = 13;

    form.submit (function(evt) {
      evt.preventDefault();
    });

    second.find('.button-next').click();

    // when
    $site.trigger(evt);

    // then
    expect(first).toBeHidden();
      expect(second).toBeHidden();
      expect(third).not.toBeHidden();
      expect(form).toHaveClass('my-class');
  });

  it ('should focus the first field on next step', function() {
    // given
    var form  = $('form').stepy(),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1);

    // when
    first.find('.button-next').click();

    // then
    expect(second.find(':input:enabled:visible:first')).toBeFocused();
  });

  it ('should focus the first field on back step', function() {
    // given
    var form  = $('form').stepy(),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1);

    // when
    first.find('.button-next').click();
    second.find('.button-back').click();

    // then
    expect(first.find(':input:enabled:visible:first')).toBeFocused();
  });

  it ('should focus on next step with enter', function() {
    // given
    var form  = $('form').stepy(),
      steps  = form.children(),
      second  = steps.eq(1);
      evt    = jQuery.Event('keypress');

    evt.which = 13;
    evt.keyCode = 13;

    // when
    $('input[name="email"]').trigger(evt);

    // then
    expect(second.find(':input:enabled:visible:first')).toBeFocused();
  });

  it ('should return the correct index on next callback with enter', function() {
    // given
    var $email  = $('input[name="email"]'),
      evt    = jQuery.Event('keypress');

    evt.which = 13;
    evt.keyCode = 13;

    $('form').stepy({ next: function(index) { $email.val(index); } });

    // when
    $email.trigger(evt);

    // then
    expect($email).toHaveValue(2);
  });

  it ('should return the correct index on next callback', function() {
    // given
    var $email  = $('input[name="email"]'),
      form  = $('form').stepy({ next: function(index) { $email.val(index); } }),
      steps  = form.children(),
      first  = steps.eq(0);

    // when
    first.find('.button-next').click();

    // then
    expect($email).toHaveValue(2);
  });

  it ('should return the correct index on back callback', function() {
    // given
    var $email  = $('input[name="email"]'),
      form  = $('form').stepy({ back: function(index) { $email.val(index); } }),
      steps  = form.children(),
      second  = steps.eq(1);

    // when
    second.find('.button-back').click();

    // then
    expect($email).toHaveValue(1);
  });

  it ('should return the correct index on next title callback', function() {
    // given
    var $email = $('input[name="email"]');

    $('form').stepy({ next: function(index) { $email.val(index); }, titleClick: true });

    // when
    $('#stepy-titles').children('li').eq(1).click();

    // then
    expect($email).toHaveValue(2);
  });

  it ('should return the correct index on back title callback', function() {
    // given
    var $email  = $('input[name="email"]');

    $('form').stepy({ back: function(index) { $email.val(index); }, titleClick: true });

    var $titles = $('#stepy-titles').children('li');
    $titles.eq(1).click();

    // when
    $titles.eq(0).click();

    // then
    expect($email).toHaveValue(1);
  });

  it ('should return the correct index on next-select title callback', function() {
    // given
    var $email = $('input[name="email"]');

    $('form').stepy({ select: function(index) { $email.val(index); }, titleClick: true });

    var $titles = $('#stepy-titles').children('li');

    // when
    $titles.eq(1).click();

    // then
    expect($email).toHaveValue(2);
  });

  it ('should return the correct index on back-select callback', function() {
    // given
    var $email = $('input[name="email"]');

    $('form').stepy({ select: function(index) { $email.val(index); }, titleClick: true });

    var $titles = $('#stepy-titles').children('li');
    $titles.eq(1).click();

    // when
    $titles.eq(0).click();

    // then
    expect($email).toHaveValue(1);
  });

  it ('should return the correct index on next-select with invalid fields', function() {
    // given
    var $email  = $('input[name="email"]'),
      form  = $('form').stepy({ block: true, select: function(index) { $email.val(index); }, validate: true }),
      steps  = form.children(),
      first  = steps.eq(0);

    form.validate({ rules: { 'email': 'required' }, messages: { 'email': { required: '--' } } });

    // when
    first.find('.button-next').click();

    // then
    expect($email).toHaveValue(1);
  });

  it ('should return the correct index on far next-select title with invalid fields', function() {
    // given
    var $email  = $('input[name="email"]').val('1'),
      form  = $('form').stepy({ block: true, select: function(index) { $email.val(index); }, validate: true }),
      $titles = $('#stepy-titles').children('li');

    form.validate({ rules: { 'email': 'required' }, messages: { 'email': { required: '--' } } });

    // when
    $titles.eq(2).click();

    // then
    expect($email).toHaveValue(1);
  });

  it ('should be chainable the function step', function() {
    // given
    var form    = $('form').stepy(),
      className  = 'my-class';

    // when
    form.stepy('step', 2).addClass(className);

    // then
    expect(form).toHaveClass(className);
  });

  it ('should be chainable the function step', function() {
    // given
    var form    = $('form').stepy(),
      className  = 'my-class';

    // when
    form.stepy('step', 2).addClass(className);

    // then
    expect(form).toHaveClass(className);
  });

  it ('should go to step 2 using function step', function() {
    // given
    var form  = $('form').stepy(),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    // when
    form.stepy('step', 2);

    // then
      expect(first).toBeHidden();
      expect(second).not.toBeHidden();
      expect(third).toBeHidden();
  });

  it ('should valid checkable field even when it is hidden (ignore overrided)', function() {
    // given
    var form  = $('form').stepy({ block: true, validate: true }),
      steps  = form.children(),
      first  = steps.eq(0),
      second  = steps.eq(1),
      third  = steps.eq(2);

    form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'checked':  'required'
      }, messages: {
        'checked':  { required: 'Checked field is requerid!' }
      }
    });

    var $checked = $('input[name="checked"]');

    // when
    $checked.click();
    first.find('.button-next').click();

    $checked.click();
    second.find('.button-next').click();

    // then
    expect(form.children('.stepy-error')).toContain('label.error');
    expect(first).not.toBeHidden();
    expect(second).toBeHidden();
    expect(third).toBeHidden();
  });

});
