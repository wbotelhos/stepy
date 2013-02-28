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
      Helper.submit({ value: 'Finish!', 'class': 'finish' })
    ]}));
  });

  afterEach(function() { Helper.clear(); });

  it ('should chainable', function() {
    // given
    var $form    = $('#stepy'),
      className  = 'my-class';

    // when
    $form.stepy().addClass(className);

    // then
      expect($form).toHaveClass(className);
  });

  it ('should create the titles', function() {
    // given
    $('#stepy').stepy();

    // when
    var $menus  = $('#stepy-titles').children('li'),
      $first  = $menus.eq(0),
      $second  = $menus.eq(1),
      $third   = $menus.eq(2);

    // then
    expect($first.children('div')).toHaveHtml('Step 1');
    expect($second.children('div')).toHaveHtml('Step 2');
    expect($third.children('div')).toHaveHtml('Step 3');

    expect($first.children('span')).toHaveHtml('description 1');
    expect($second.children('span')).toHaveHtml('description 2');
    expect($third.children('span')).toHaveHtml('description 3');
  });

  it ('should be at first title', function() {
    // given
    $('#stepy').stepy();

    // when
    var $menus  = $('#stepy-titles').children('li'),
      $first  = $menus.eq(0),
      $second  = $menus.eq(1),
      $third   = $menus.eq(2);

    // then
      expect($first).toHaveClass('current-step');
      expect($second).not.toHaveClass('current-step');
      expect($third).not.toHaveClass('current-step');
  });

  it ('should be at first step', function() {
    // given
    var $form  = $('#stepy'),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $form.stepy();

    // then
      expect($first).not.toBeHidden();
      expect($second).toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should focus the first field', function() {
    // given
    var $form = $('#stepy');

    // when
    $form.stepy();

    // then
    expect($form.children('fieldset').first().find(':input:enabled:visible:first')).toBeFocused();
  });

  it ('should have the navigation buttons', function() {
    // given
    var $form  = $('#stepy'),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $form.stepy();

    // then
    expect($first).toContain('p.stepy-buttons');
    expect($second).toContain('p.stepy-buttons');
    expect($third).toContain('p.stepy-buttons');

    $first  = $first.children('p.stepy-buttons');
    $second  = $second.children('p.stepy-buttons');
    $third  = $third.children('p.stepy-buttons');

    expect($first).not.toContain('.button-back');
    expect($first).toContain('.button-next');

    expect($second).toContain('.button-back');
    expect($second).toContain('.button-next');

    expect($third).toContain('.button-back');
    expect($third).not.toContain('.button-next');
    expect($third).toContain('input.finish');
  });

  it ('should have default label on navigation buttons', function() {
    // given
    var $form  = $('#stepy'),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $form.stepy();

    // then
    var $firstNext  = $first.find('.button-next'),
      $secondBack  = $second.find('.button-back'),
      $secondNext  = $second.find('.button-next'),
      $thirdBack  = $third.find('.button-back');

    expect($firstNext).toHaveHtml('Next &gt;');

    expect($secondBack).toHaveHtml('&lt; Back');
    expect($secondNext).toHaveHtml('Next &gt;');

    expect($thirdBack).toHaveHtml('&lt; Back');
  });

  it ('should not include the finish button', function() {
    // given
    var $form = $('#stepy');

    // when
    $form.stepy({ finishButton: false });

    // then
    expect($form.children().eq(2)).not.toContain('input.finish');
  });

  it ('should have titleClick disabled', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $('#stepy-titles').children('li').eq(1);

    // then
    expect($first).not.toBeHidden();
      expect($second).toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should forward to second step', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $steps.first().find('.button-next').click();

    // then
    expect($first).toBeHidden();
      expect($second).not.toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should forward to third step', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $steps.eq(0).find('.button-next').click();
    $steps.eq(1).find('.button-next').click();

    // then
    expect($first).toBeHidden();
      expect($second).toBeHidden();
      expect($third).not.toBeHidden();
  });

  it ('should backward to second step', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $steps.eq(0).find('.button-next').click();
    $steps.eq(1).find('.button-next').click();

    // when
    $steps.eq(2).find('.button-back').click();

    // then
    expect($first).toBeHidden();
      expect($second).not.toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should backward to first step', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $steps.eq(0).find('.button-next').click();
    $steps.eq(1).find('.button-next').click();

    // when
    $steps.eq(2).find('.button-back').click();
    $steps.eq(1).find('.button-back').click();

    // then
    expect($first).not.toBeHidden();
      expect($second).toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should call back callback', function() {
    // given
    var $form  = $('#stepy').stepy({ back: function() { this.addClass('my-class'); } }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $steps.eq(0).find('.button-next').click();

    // when
    $steps.eq(1).find('.button-back').click();

    // then
    expect($form).toHaveClass('my-class');

    expect($first).not.toBeHidden();
      expect($second).toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should call next callback', function() {
    // given
    var $form  = $('#stepy').stepy({ next: function() { this.addClass('my-class'); } }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $steps.eq(0).find('.button-next').click();

    // then
    expect($form).toHaveClass('my-class');

    expect($first).toBeHidden();
      expect($second).not.toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should call finish callback', function() {
    // given
    var $form  = $('#stepy').stepy({ finish: function() { this.addClass('my-class'); } }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $steps.eq(1).find('.button-next').click();

    $form.submit (function(evt) {
      evt.preventDefault();
    });

    // when
    $steps.eq(2).find('input.finish').click();

    // then
    expect($form).toHaveClass('my-class');

    expect($first).toBeHidden();
      expect($second).toBeHidden();
      expect($third).not.toBeHidden();
  });

  it ('should have custom label on navigation buttons', function() {
    // given
    var $form  = $('#stepy'),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $form.stepy({ backLabel: '&lt;&lt;', nextLabel: '&gt;&gt;' });

    // then
    var $firstNext  = $first.find('.button-next'),
      $secondBack  = $second.find('.button-back'),
      $secondNext  = $second.find('.button-next'),
      $thirdBack  = $third.find('.button-back');

    expect($firstNext).toHaveHtml('>>');

    expect($secondBack).toHaveHtml('&lt;&lt;');
    expect($secondNext).toHaveHtml('&gt;&gt;');

    expect($thirdBack).toHaveHtml('&lt;&lt;');
  });

  it ('should display error when exists invalid fields', function() {
    // given
    var $form  = $('#stepy').stepy({ validate: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    // when
    $first.find('.button-next').click();

    // then
    expect($form.children('.stepy-error')).toContain('label.error');
    expect($first).toBeHidden();
    expect($second).not.toBeHidden();
    expect($third).toBeHidden();
  });

  it ('should block step when exists invalid fields', function() {
    // given
    var $form  = $('#stepy').stepy({ block: true, validate: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    // when
    $first.find('.button-next').click();

    // then
    expect($form.children('.stepy-error')).toContain('label.error');
    expect($first).not.toBeHidden();
    expect($second).toBeHidden();
    expect($third).toBeHidden();
  });

  it ('should not block step when not exists invalid fields', function() {
    // given
    var $form  = $('#stepy').stepy({ block: true, validate: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    $form.find('input[name="password"]').val('password');

    // when
    $first.find('.button-next').click();

    // then
    expect($form.children('.stepy-error')).not.toContain('label.error');
    expect($first).toBeHidden();
    expect($second).not.toBeHidden();
    expect($third).toBeHidden();
  });

  it ('should block step with custom icon error when exists invalid fields', function() {
    // given
    var $form  = $('#stepy').stepy({ block: true, errorImage: true, validate: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $form.validate({
      errorPlacement: function(error, element) {
        $('#stepy div.stepy-error').append(error);
      }, rules: {
        'password':  'required'
      }, messages: {
        'password':  { required: 'Password field is requerid!' }
      }
    });

    // when
    $first.find('.button-next').click();

    // then
    expect($('#stepy-titles').children('li').eq(0)).toHaveClass('error-image');
    expect($form.children('.stepy-error')).toContain('label.error');
    expect($first).not.toBeHidden();
    expect($second).toBeHidden();
    expect($third).toBeHidden();
  });

  it ('should not display description', function() {
    // given
    var $form = $('#stepy');

    // when
    $form.stepy({ description: false });

    var $menus  = $('#stepy-titles').children('li'),
      $first  = $menus.eq(0),
      $second  = $menus.eq(1),
      $third   = $menus.eq(2);

    // then
    expect($first).not.toContain('span');
    expect($second).not.toContain('span');
    expect($third).not.toContain('span');
  });

  it ('should not display legend', function() {
    // given
    var $form  = $('#stepy'),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $form.stepy({ legend: false });

    // then
    expect($first.children('legend')).toBeHidden();
    expect($second.children('legend')).toBeHidden();
    expect($third.children('legend')).toBeHidden();
  });

  it ('should have titleClick enabled', function() {
    // given
    var $form  = $('#stepy').stepy({ titleClick: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $('#stepy-titles').children('li').eq(2).click();

    // then
    expect($first).toBeHidden();
      expect($second).toBeHidden();
      expect($third).not.toBeHidden();
  });

  it ('should block step when exists invalid fields using titleClick', function() {
    // given
    var $form  = $('#stepy').stepy({ block: true, titleClick: true, validate: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $form.validate({
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
    expect($form.children('.stepy-error')).toContain('label.error');
    expect($first).not.toBeHidden();
    expect($second).toBeHidden();
    expect($third).toBeHidden();
  });

  it ('should block step with errorImage when exists invalid fields using titleClick', function() {
    // given
    var $form  = $('#stepy').stepy({ block: true, errorImage: true, titleClick: true, validate: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2),
      $titles = $('#stepy-titles');

    $form.validate({
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
    expect($form.children('.stepy-error')).toContain('label.error');
    expect($first).not.toBeHidden();
    expect($second).toBeHidden();
    expect($third).toBeHidden();
  });

  it ('should move titles to target', function() {
    // given
    var $target = $('<div id="target"></div>').appendTo('body');

    // when
    $('#stepy').stepy({ titleTarget: '#target' });

    var $menus  = $target.children('#stepy-titles').children('li'),
      $first  = $menus.eq(0),
      $second  = $menus.eq(1),
      $third   = $menus.eq(2);

    // then
    expect($first.children('div')).toHaveHtml('Step 1');
    expect($second.children('div')).toHaveHtml('Step 2');
    expect($third.children('div')).toHaveHtml('Step 3');

    $target.remove();
  });

  it ('should have titleClick enabled', function() {
    // given
    var $form  = $('#stepy').stepy({ titleClick: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $('#stepy-titles').children('li').eq(2).click();

    // then
    expect($first).toBeHidden();
      expect($second).toBeHidden();
      expect($third).not.toBeHidden();
  });

  it ('should move titles to target and works titleClick', function() {
    // given
    var $target = $('<div id="target"></div>').appendTo('body');

    // when
    var $form   = $('#stepy').stepy({ titleClick: true, titleTarget: '#target' }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $target.children('#stepy-titles').children('li').eq(2).click();

    // then
    expect($first).toBeHidden();
      expect($second).toBeHidden();
      expect($third).not.toBeHidden();

    $target.remove();
  });

  it ('should be hidden the finish button', function() {
    // given
    var $form  = $('#stepy'),
      $steps  = $form.children(),
      $third  = $steps.eq(2);

    // when
    $form.stepy();

    // then
    expect($third.find('input.finish')).toBeHidden();
  });

  it ('should be visible the finish button', function() {
    // given
    var $form   = $('#stepy').stepy(),
      $steps  = $form.children(),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $second.find('.button-next').click();

    // then
    expect($third.find('input.finish')).not.toBeHidden();
  });

  it ('should forward step with enter', function() {
    // given
    var $form     = $('#stepy').stepy(),
      $steps    = $form.children(),
      $first    = $steps.eq(0),
      $second    = $steps.eq(1),
      $third    = $steps.eq(2),
      $password  = $form.find('input[name="password"]').val('password'),
      evt      = jQuery.Event('keypress');

      evt.which = 13;
      evt.keyCode = 13;

    // when
    $password.trigger(evt);

    // then
    expect($first).toBeHidden();
      expect($second).not.toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should submit on last step with enter', function() {
    // given
    var $form   = $('#stepy').stepy({ finish: function() { this.addClass('my-class'); } }),
      $steps  = $form.children(),
      $first  = $steps.eq(0);
      $second  = $steps.eq(1);
      $third  = $steps.eq(2),
      $site  = $form.find('input[name="site"]'),
      evt    = jQuery.Event('keypress');

    evt.which = 13;
    evt.keyCode = 13;

    $form.submit (function(evt) {
      evt.preventDefault();
    });

    $second.find('.button-next').click();

    // when
    $site.trigger(evt);

    // then
    expect($first).toBeHidden();
      expect($second).toBeHidden();
      expect($third).not.toBeHidden();
      expect($form).toHaveClass('my-class');
  });

  it ('should focus the first field on next step', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1);

    // when
    $first.find('.button-next').click();

    // then
    expect($second.find(':input:enabled:visible:first')).toBeFocused();
  });

  it ('should focus the first field on back step', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1);

    // when
    $first.find('.button-next').click();
    $second.find('.button-back').click();

    // then
    expect($first.find(':input:enabled:visible:first')).toBeFocused();
  });

  it ('should focus on next step with enter', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $second  = $steps.eq(1);
      evt    = jQuery.Event('keypress');

    evt.which = 13;
    evt.keyCode = 13;

    // when
    $('input[name="email"]').trigger(evt);

    // then
    expect($second.find(':input:enabled:visible:first')).toBeFocused();
  });

  it ('should return the correct index on next callback with enter', function() {
    // given
    var $email  = $('input[name="email"]'),
      evt    = jQuery.Event('keypress');

    evt.which = 13;
    evt.keyCode = 13;

    $('#stepy').stepy({ next: function(index) { $email.val(index); } });

    // when
    $email.trigger(evt);

    // then
    expect($email).toHaveValue(2);
  });

  it ('should return the correct index on next callback', function() {
    // given
    var $email  = $('input[name="email"]'),
      $form  = $('#stepy').stepy({ next: function(index) { $email.val(index); } }),
      $steps  = $form.children(),
      $first  = $steps.eq(0);

    // when
    $first.find('.button-next').click();

    // then
    expect($email).toHaveValue(2);
  });

  it ('should return the correct index on back callback', function() {
    // given
    var $email  = $('input[name="email"]'),
      $form  = $('#stepy').stepy({ back: function(index) { $email.val(index); } }),
      $steps  = $form.children(),
      $second  = $steps.eq(1);

    // when
    $second.find('.button-back').click();

    // then
    expect($email).toHaveValue(1);
  });

  it ('should return the correct index on next title callback', function() {
    // given
    var $email = $('input[name="email"]');

    $('#stepy').stepy({ next: function(index) { $email.val(index); }, titleClick: true });

    // when
    $('#stepy-titles').children('li').eq(1).click();

    // then
    expect($email).toHaveValue(2);
  });

  it ('should return the correct index on back title callback', function() {
    // given
    var $email  = $('input[name="email"]');

    $('#stepy').stepy({ back: function(index) { $email.val(index); }, titleClick: true });

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

    $('#stepy').stepy({ select: function(index) { $email.val(index); }, titleClick: true });

    var $titles = $('#stepy-titles').children('li');

    // when
    $titles.eq(1).click();

    // then
    expect($email).toHaveValue(2);
  });

  it ('should return the correct index on back-select callback', function() {
    // given
    var $email = $('input[name="email"]');

    $('#stepy').stepy({ select: function(index) { $email.val(index); }, titleClick: true });

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
      $form  = $('#stepy').stepy({ block: true, select: function(index) { $email.val(index); }, validate: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0);

    $form.validate({ rules: { 'email': 'required' }, messages: { 'email': { required: '--' } } });

    // when
    $first.find('.button-next').click();

    // then
    expect($email).toHaveValue(1);
  });

  it ('should return the correct index on far next-select title with invalid fields', function() {
    // given
    var $email  = $('input[name="email"]').val('1'),
      $form  = $('#stepy').stepy({ block: true, select: function(index) { $email.val(index); }, validate: true }),
      $titles = $('#stepy-titles').children('li');

    $form.validate({ rules: { 'email': 'required' }, messages: { 'email': { required: '--' } } });

    // when
    $titles.eq(2).click();

    // then
    expect($email).toHaveValue(1);
  });

  it ('should be chainable the function step', function() {
    // given
    var $form    = $('#stepy').stepy(),
      className  = 'my-class';

    // when
    $form.stepy('step', 2).addClass(className);

    // then
    expect($form).toHaveClass(className);
  });

  it ('should be chainable the function step', function() {
    // given
    var $form    = $('#stepy').stepy(),
      className  = 'my-class';

    // when
    $form.stepy('step', 2).addClass(className);

    // then
    expect($form).toHaveClass(className);
  });

  it ('should go to step 2 using function step', function() {
    // given
    var $form  = $('#stepy').stepy(),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    // when
    $form.stepy('step', 2);

    // then
      expect($first).toBeHidden();
      expect($second).not.toBeHidden();
      expect($third).toBeHidden();
  });

  it ('should valid checkable field even when it is hidden (ignore overrided)', function() {
    // given
    var $form  = $('#stepy').stepy({ block: true, validate: true }),
      $steps  = $form.children(),
      $first  = $steps.eq(0),
      $second  = $steps.eq(1),
      $third  = $steps.eq(2);

    $form.validate({
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
    $first.find('.button-next').click();

    $checked.click();
    $second.find('.button-next').click();

    // then
    expect($form.children('.stepy-error')).toContain('label.error');
    expect($first).not.toBeHidden();
    expect($second).toBeHidden();
    expect($third).toBeHidden();
  });

});
