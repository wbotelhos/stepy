describe('Using one element', function() {

	beforeEach(function() {
		$('body').append(
			'<form id="stepy">' +
				'<fieldset title="Step 1">' +
					'<legend>description 1</legend>' +
					'<label>User:</label>' +
					'<input type="hidden" />' +
					'<input type="text" value="wbotelhos" name="user" disabled="disabled" />' +
					'<label>E-mail:</label> <input type="text" name="email" />' +
					'<label>Password:</label> <input type="password" name="password" />' +
				'</fieldset>' +
				'<fieldset title="Step 2">' +
					'<legend>description 2</legend>' +
					'<label>Bio:</label> <textarea name="bio"></textarea>' +
				'</fieldset>' +
				'<fieldset title="Step 3">' +
					'<legend>description 3</legend>' +
					'<label>Birthday:</label>' +
					'<select name="day">' +
						'<option></option>' +
						'<option>23</option>' +
					'</select>' +
					'<label>Gender:</label>' +
					'<input id="male" type="radio" name="gender" /> Male' +
					'<input id="female" type="radio" name="gender" /> Female' +
				'</fieldset>' +
				'<input type="submit" class="finish" value="Finish!" />' +
			'</form>'
		);
	});

	afterEach(function() {
		var $body = $('body');

		$body.children('form').remove();
		$body.children('ul').remove();
	});

	it('should chainable', function() {
		// given
		var $form		= $('#stepy'),
			className	= 'my-class';

		// when
		$form.stepy().addClass(className);

		// then
	    expect($form).toHaveClass(className);
	});
	
	it('should create the titles', function() {
		// given
		$('#stepy').stepy();
		
		// when
		var $menus	= $('#stepy-titles').children('li'),
			$first	= $menus.eq(0),
			$second	= $menus.eq(1),
			$third 	= $menus.eq(2);
		
		// then
		expect($first.children('div')).toHaveHtml('Step 1');
		expect($second.children('div')).toHaveHtml('Step 2');
		expect($third.children('div')).toHaveHtml('Step 3');
		
		expect($first.children('span')).toHaveHtml('description 1');
		expect($second.children('span')).toHaveHtml('description 2');
		expect($third.children('span')).toHaveHtml('description 3');
	});

	it('should be at first title', function() {
		// given
		$('#stepy').stepy();

		// when
		var $menus	= $('#stepy-titles').children('li'),
			$first	= $menus.eq(0),
			$second	= $menus.eq(1),
			$third 	= $menus.eq(2);

		// then
	    expect($first).toHaveClass('current-step');
	    expect($second).not.toHaveClass('current-step');
	    expect($third).not.toHaveClass('current-step');
	});

	it('should be at first step', function() {
		// given
		var $form	= $('#stepy'),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$form.stepy();

		// then
	    expect($first).not.toBeHidden();
	    expect($second).toBeHidden();
	    expect($third).toBeHidden();
	});

	it('should focus the first field', function() {
		// given
		var $form = $('#stepy');

		// when
		$form.stepy();

		// then
		expect($form.children('fieldset').first().find('input:enabled:').first()).toBeFocused();
	});

	it('should have the navigation buttons', function() {
		// given
		var $form	= $('#stepy'),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$form.stepy();

		// then
		expect($first).toContain('p.stepy-buttons');
		expect($second).toContain('p.stepy-buttons');
		expect($third).toContain('p.stepy-buttons');

		$first	= $first.children('p.stepy-buttons');
		$second	= $second.children('p.stepy-buttons');
		$third	= $third.children('p.stepy-buttons');

		expect($first).not.toContain('a.button-back');
		expect($first).toContain('a.button-next');

		expect($second).toContain('a.button-back');
		expect($second).toContain('a.button-next');

		expect($third).toContain('a.button-back');
		expect($third).not.toContain('a.button-next');
		expect($third).toContain('input.finish');
	});

	it('should have default label on navigation buttons', function() {
		// given
		var $form	= $('#stepy'),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$form.stepy();

		// then
		var $firstNext	= $first.find('a.button-next'),
			$secondBack	= $second.find('a.button-back'),
			$secondNext	= $second.find('a.button-next'),
			$thirdBack	= $third.find('a.button-back');

		expect($firstNext).toHaveHtml('Next &gt;');

		expect($secondBack).toHaveHtml('&lt; Back');
		expect($secondNext).toHaveHtml('Next &gt;');

		expect($thirdBack).toHaveHtml('&lt; Back');
	});

	it('should not include the finish button', function() {
		// given
		var $form = $('#stepy');

		// when
		$form.stepy({ finishButton: false });

		// then
		expect($form.children().eq(2)).not.toContain('input.finish');
	});

	it('should have titleClick disabled', function() {
		// given
		var $form	= $('#stepy').stepy(),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$('#stepy-titles').children('li').eq(1);

		// then
		expect($first).not.toBeHidden();
	    expect($second).toBeHidden();
	    expect($third).toBeHidden();
	});

	it('should forward to second step', function() {
		// given
		var $form	= $('#stepy').stepy(),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$steps.first().find('a.button-next').click();

		// then
		expect($first).toBeHidden();
	    expect($second).not.toBeHidden();
	    expect($third).toBeHidden();
	});

	it('should forward to third step', function() {
		// given
		var $form	= $('#stepy').stepy(),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$steps.eq(0).find('a.button-next').click();
		$steps.eq(1).find('a.button-next').click();

		// then
		expect($first).toBeHidden();
	    expect($second).toBeHidden();
	    expect($third).not.toBeHidden();
	});

	it('should backward to second step', function() {
		// given
		var $form	= $('#stepy').stepy(),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$steps.eq(0).find('a.button-next').click();
		$steps.eq(1).find('a.button-next').click();

		// when
		$steps.eq(2).find('a.button-back').click();

		// then
		expect($first).toBeHidden();
	    expect($second).not.toBeHidden();
	    expect($third).toBeHidden();
	});

	it('should backward to first step', function() {
		// given
		var $form	= $('#stepy').stepy(),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$steps.eq(0).find('a.button-next').click();
		$steps.eq(1).find('a.button-next').click();

		// when
		$steps.eq(2).find('a.button-back').click();
		$steps.eq(1).find('a.button-back').click();

		// then
		expect($first).not.toBeHidden();
	    expect($second).toBeHidden();
	    expect($third).toBeHidden();
	});

	it('should call back callback', function() {
		// given
		var $form	= $('#stepy').stepy({ back: function() { this.addClass('my-class'); } }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$steps.eq(0).find('a.button-next').click();

		// when
		$steps.eq(1).find('a.button-back').click();

		// then
		expect($form).toHaveClass('my-class');

		expect($first).not.toBeHidden();
	    expect($second).toBeHidden();
	    expect($third).toBeHidden();
	});

	it('should call next callback', function() {
		// given
		var $form	= $('#stepy').stepy({ next: function() { this.addClass('my-class'); } }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$steps.eq(0).find('a.button-next').click();

		// then
		expect($form).toHaveClass('my-class');

		expect($first).toBeHidden();
	    expect($second).not.toBeHidden();
	    expect($third).toBeHidden();
	});

	it('should call finish callback', function() {
		// given
		var $form	= $('#stepy').stepy({ finish: function() { this.addClass('my-class'); } }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$steps.eq(1).find('a.button-next').click();

		$form.submit(function(evt) {
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

	it('should have custom label on navigation buttons', function() {
		// given
		var $form	= $('#stepy'),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$form.stepy({ backLabel: '&lt;&lt;', nextLabel: '&gt;&gt;' });

		// then
		var $firstNext	= $first.find('a.button-next'),
			$secondBack	= $second.find('a.button-back'),
			$secondNext	= $second.find('a.button-next'),
			$thirdBack	= $third.find('a.button-back');

		expect($firstNext).toHaveHtml('>>');

		expect($secondBack).toHaveHtml('&lt;&lt;');
		expect($secondNext).toHaveHtml('&gt;&gt;');

		expect($thirdBack).toHaveHtml('&lt;&lt;');
	});

	it('should display error when exists invalid fields', function() {
		// given
		var $form	= $('#stepy').stepy({ validate: true }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$form.validate({
			errorPlacement: function(error, element) {
				$('#stepy div.stepy-error').append(error);
			}, rules: {
				'password':	'required'
			}, messages: {
				'password':	{ required: 'Password field is requerid!' }
			}
		});

		// when
		$first.find('a.button-next').click();

		// then
		expect($form.children('.stepy-error')).toContain('label.error');
		expect($first).toBeHidden();
		expect($second).not.toBeHidden();
		expect($third).toBeHidden();
	});

	it('should block step when exists invalid fields', function() {
		// given
		var $form	= $('#stepy').stepy({ block: true, validate: true }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$form.validate({
			errorPlacement: function(error, element) {
				$('#stepy div.stepy-error').append(error);
			}, rules: {
				'password':	'required'
			}, messages: {
				'password':	{ required: 'Password field is requerid!' }
			}
		});

		// when
		$first.find('a.button-next').click();

		// then
		expect($form.children('.stepy-error')).toContain('label.error');
		expect($first).not.toBeHidden();
		expect($second).toBeHidden();
		expect($third).toBeHidden();
	});

	it('should not block step when not exists invalid fields', function() {
		// given
		var $form	= $('#stepy').stepy({ block: true, validate: true }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$form.validate({
			errorPlacement: function(error, element) {
				$('#stepy div.stepy-error').append(error);
			}, rules: {
				'password':	'required'
			}, messages: {
				'password':	{ required: 'Password field is requerid!' }
			}
		});

		$form.find('input[name="password"]').val('password');

		// when
		$first.find('a.button-next').click();

		// then
		expect($form.children('.stepy-error')).not.toContain('label.error');
		expect($first).toBeHidden();
		expect($second).not.toBeHidden();
		expect($third).toBeHidden();
	});

	it('should block step with custom icon error when exists invalid fields', function() {
		// given
		var $form	= $('#stepy').stepy({ block: true, errorImage: true, validate: true }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$form.validate({
			errorPlacement: function(error, element) {
				$('#stepy div.stepy-error').append(error);
			}, rules: {
				'password':	'required'
			}, messages: {
				'password':	{ required: 'Password field is requerid!' }
			}
		});

		// when
		$first.find('a.button-next').click();

		// then
		expect($('#stepy-titles').children('li').eq(0)).toHaveClass('error-image');
		expect($form.children('.stepy-error')).toContain('label.error');
		expect($first).not.toBeHidden();
		expect($second).toBeHidden();
		expect($third).toBeHidden();
	});

	it('should not display description', function() {
		// given
		var $form = $('#stepy');

		// when
		$form.stepy({ description: false });

		var $menus	= $('#stepy-titles').children('li'),
			$first	= $menus.eq(0),
			$second	= $menus.eq(1),
			$third 	= $menus.eq(2);

		// then
		expect($first).not.toContain('span');
		expect($second).not.toContain('span');
		expect($third).not.toContain('span');
	});

	it('should not display legend', function() {
		// given
		var $form	= $('#stepy'),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$form.stepy({ legend: false });

		// then
		expect($first.children('legend')).toBeHidden();
		expect($second.children('legend')).toBeHidden();
		expect($third.children('legend')).toBeHidden();
	});

	it('should have titleClick enabled', function() {
		// given
		var $form	= $('#stepy').stepy({ titleClick: true }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$('#stepy-titles').children('li').eq(2).click();

		// then
		expect($first).toBeHidden();
	    expect($second).toBeHidden();
	    expect($third).not.toBeHidden();
	});

	it('should block step when exists invalid fields using titleClick', function() {
		// given
		var $form	= $('#stepy').stepy({ block: true, titleClick: true, validate: true }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$form.validate({
			errorPlacement: function(error, element) {
				$('#stepy div.stepy-error').append(error);
			}, rules: {
				'password':	'required'
			}, messages: {
				'password':	{ required: 'Password field is requerid!' }
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

	it('should block step with errorImage when exists invalid fields using titleClick', function() {
		// given
		var $form	= $('#stepy').stepy({ block: true, errorImage: true, titleClick: true, validate: true }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2),
			$titles = $('#stepy-titles');

		$form.validate({
			errorPlacement: function(error, element) {
				$('#stepy div.stepy-error').append(error);
			}, rules: {
				'password':	'required'
			}, messages: {
				'password':	{ required: 'Password field is requerid!' }
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

	it('should move titles to target', function() {
		// given
		var $target = $('<div id="target"></div>').appendTo('body');

		// when
		$('#stepy').stepy({ titleTarget: '#target' });

		var $menus	= $target.children('#stepy-titles').children('li'),
			$first	= $menus.eq(0),
			$second	= $menus.eq(1),
			$third 	= $menus.eq(2);

		// then
		expect($first.children('div')).toHaveHtml('Step 1');
		expect($second.children('div')).toHaveHtml('Step 2');
		expect($third.children('div')).toHaveHtml('Step 3');

		$target.remove();
	});

	it('should have titleClick enabled', function() {
		// given
		var $form	= $('#stepy').stepy({ titleClick: true }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		// when
		$('#stepy-titles').children('li').eq(2).click();

		// then
		expect($first).toBeHidden();
	    expect($second).toBeHidden();
	    expect($third).not.toBeHidden();
	});
	
	it('should move titles to target and works titleClick', function() {
		// given
		var $target = $('<div id="target"></div>').appendTo('body');

		// when
		var $form = $('#stepy').stepy({ titleClick: true, titleTarget: '#target' }),
			$steps	= $form.children(), 
			$first	= $steps.eq(0),
			$second	= $steps.eq(1),
			$third	= $steps.eq(2);

		$target.children('#stepy-titles').children('li').eq(2).click();

		// then
		expect($first).toBeHidden();
	    expect($second).toBeHidden();
	    expect($third).not.toBeHidden();

		$target.remove();
	});

});