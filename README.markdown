# jQuery Stepy - A Wizard Plugin - http://wbotelhos.com/stepy

jQuery Stepy is a plugin based on FormToWizard that generates a customizable wizard.

## Version

	@version        1.1.0
	@since          2010.07.03
	@author         Washington Botelho
	@documentation  wbotelhos.com/stepy
	@twitter        twitter.com/wbotelhos

## Required Files

+ jquery.stepy.min.js
+ jquery.stepy.css

## Default values

    back:           undefined          // Callback before the backward action.
    backLabel:      '< Back'           // Change the back button label.
    block:          false              // Block the next step if the current is invalid.
    description:    false              // Choose if the descriptions of the titles will be showed.
    errorImage:     false              // If an error occurs, a image is showed in the title of the corresponding step.
    finish:         undefined          // Callback before the finish action.
    finishButton:   true               // Include the button with class called '.finish' into the last step.
    ignore:         ''                 // Choose the fields to be ignored on validation.
    legend:         false              // Choose if the legends of the steps will be showed.
    nextLabel:      'Next >'           // Change the next button label.
    next:           undefined          // Callback before the forward action.
    titleClick:     true               // Active the back and next action in the titles.
    titleTarget:    undefined          // Choose the place where titles will be placed.
    select:         undefined          // Callback executed when the step is shown.
    validate:       false              // Active the jQuery Validation for each step.

## Usage with default values

    $('#step').stepy();

	<form id="step">
		<fieldset title="Step 1">
			<legend>description one</legend>
			<!-- input fields -->
		</fieldset>

		<fieldset title="Step 2">
			<legend>description two</legend>
			<!-- input fields -->
		</fieldset>

		<input type="submit" class="finish"/>
	</form>

## Public functions

    $('#step').stepy('step', 2);  // Change the form to the second step.

## Contributors:

+ Almir Mendes
+ Andrey Fedoseev
+ Igor Tamashchuk
+ Rafael Machado

The MIT License

Copyright (c) 2012 Washington Botelho

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Buy me a coffee

You can do it by [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Stepy). Thanks! (:
