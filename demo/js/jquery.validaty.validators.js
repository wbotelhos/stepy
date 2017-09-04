$.validaty

.register('contain', 'Must contain "{word}"!', function(helper, el, word) {
  'use strict';

  return this.val() === '' || helper.contains(this.val(), word);
})

.register('dateiso', 'Must be a valid date ISO (yyyy-MM-dd)!', function(helper, el) {
  'use strict';

  var value = $.trim(this.val());

  return value === '' || helper.isDateISO(value);
})

.register('digits', 'Must be digits!', function(helper, el) {
  'use strict';

  return this.val() === '' || helper.isDigits(this.val());
})

.register('email', 'Must be a valid e-mail!', function(helper, el) {
  'use strict';

  var value = $.trim(this.val());

  return value === '' || helper.isEmail(value);
})

.register('equal', 'Must be equals to "{value}"!', function(helper, el, value) {
  'use strict';

  return this.val() == value;
})

.register('maxcheck', 'Check at most {max} checkboxes!', function(helper, el, max) {
  'use strict';

  return $(el).find('[name="' + this.attr('name') + '"]:checked:enabled').length <= max;
})

.register('maxlength', 'Too long (max is {max} characters)!', function(helper, el, max) {
  'use strict';

  return $.trim(this.val()).length <= max;
})

.register('maxselect', 'Select at most {max} options!', function(helper, el, max) {
  'use strict';

  return $(this).children(':enabled').filter(':selected').length <= max;
})

.register('mincheck', 'Check at least {min} checkboxes!', function(helper, el, min) {
  'use strict';

  return $(el).find('[name="' + this.attr('name') + '"]:checked:enabled').length >= min;
})

.register('minlength', 'Too short (min is {min} characters)!', function(helper, el, min) {
  'use strict';

  return $.trim(this.val()).length >= min;
})

.register('minselect', 'Select at least {min} options!', function(helper, el, min) {
  'use strict';

  return $(this).children(':enabled').filter(':selected').length >= min;
})

.register('number', 'Must be a number!', function(helper, el) {
  'use strict';

  return this.val() === '' || helper.isNumber(this.val());
})

.register('range', 'Must be a number between {min} and {max}!', function(helper, el, min, max) {
  'use strict';

  return this.val() === '' || helper.isNumber(this.val()) && (this.val() >= min && this.val() <= max);
})

.register('rangecheck', 'Check between {min} and {max} checkboxes!', function(helper, el, min, max) {
  'use strict';

  var count = $(el).find('[name="' + this.attr('name') + '"]:checked:enabled').length;

  return count >= min && count <= max;
})

.register('rangelength', 'Wrong length (min is {min} and max is {max} characters)!', function(helper, el, min, max) {
  'use strict';

  var value = $.trim(this.val());

  return value === '' || (value.length >= min && value.length <= max);
})

.register('rangeselect', 'Select between {min} and {max} options!', function(helper, el, min, max) {
  'use strict';

  var count = $(this).children(':enabled').filter(':selected').length;

  return count >= min && count <= max;
})

.register('required', {
  text:     'Can\'t be blank or empty!',
  textarea: 'Can\'t be blank or empty!',
  checkbox: 'Should be checked!',
  radio:    'Should be chosen!',
  select:   'Should be selected!'
}, function(helper, el) {
  'use strict';

  if (helper.isCheckable(this[0])) {
    var attributes = '[name="' + this.attr('name') + '"]:checked';

    return $(el).find(':radio' + attributes + ', :checkbox' + attributes).length > 0;
  } else {
    return $.trim(this.val()) !== '';
  }
})

.register('url', 'Must be a valid URL!', function(helper, el) {
  'use strict';

  return this.val() === '' || helper.isUrl(this.val());
})

.register('username', 'Must be a valid username (a-z, A-Z and _) only!', function(helper, el) {
  'use strict';

  return this.val() === '' || helper.isUsername(this.val());
})

;
