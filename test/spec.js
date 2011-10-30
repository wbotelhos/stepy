describe('Using default', function() {

	beforeEach(function() {
		$('body').append(
			'<form id="stepy">' +
				'<fieldset title="Step 1">' +
					'<legend>description 1</legend>' +
					'<label>User:</label> <input type="text" value="wbotelhos" name="user" disabled="disabled" />' +
					'<label>E-mail:</label> <input type="text" name="email" />' +
					'<label>Password:</label> <input type="password" name="password" />' +
				'</fieldset>' +
				'<fieldset title="Step 2">' +
					'<legend>description 2</legend>' +
					'<label>Bio:</label> <textarea name="bio"></textarea>' +
				'</fieldset>' +
				'<fieldset title="Step 3">' +
					'<legend>description 3</legend>' +
					'<input type="hidden" />' +
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
		$('#stepy').prev('ul').remove().end().remove();
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

}); // USING DEFAULT