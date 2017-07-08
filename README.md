# jQuery Stepy - A Wizard Plugin

[![Build Status](https://img.shields.io/travis/wbotelhos/stepy/master.svg)](https://travis-ci.org/wbotelhos/stepy)
[![NPM Version](https://badge.fury.io/js/stepy.svg)](https://badge.fury.io/js/stepy)
[![Dependency](https://david-dm.org/wbotelhos/stepy.svg)](https://david-dm.org/wbotelhos/stepy)
[![Dev Dependency](https://david-dm.org/wbotelhos/stepy/dev-status.svg)](https://david-dm.org/wbotelhos/stepy#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/wbotelhos/stepy.png)](https://codeclimate.com/github/wbotelhos/stepy)
[![Support](http://img.shields.io/gittip/wbotelhos.svg)](https://gratipay.com/~wbotelhos)

jQuery Stepy is a plugin that generates a customizable wizard.

## Options

```js
back:        undefined  // Callback before the backward action.
block:       false      // Block the next step if the current is invalid.
description: false      // Choose if the descriptions of the titles will be showed.
duration:    0          // Duration of the transition between steps in ms.
enter:       true       // Enables the enter key to change to the next step.
errorImage:  false      // If an error occurs, a image is showed in the title of the corresponding step.
finish:      undefined  // Callback before the finish action.
finishButto: true       // Include the button with class called '.finish' into the last step.
header:      true       // Creates a header with title and description.
ignore:      ''         // Choose the fields to be ignored on validation.
legend:      false      // Choose if the legends of the steps will be showed.
next:        undefined  // Callback before the forward action.
select:      undefined  // Callback executed when the step is shown.
titleClick:  true       // Active the back and next action in the titles.
titleTarget: undefined  // Choose the place where titles will be placed.
transition:  'hide'     // Use transition between steps ('hide', 'fade' or 'slide').
validate:    undefined  // Callback to each field of each step.
```

## Usage

```html
<form>
  <fieldset title="Step 1" class="stepy-step">
    <legend class="stepy-legend">description one</legend>

    <!-- inputs -->
  </fieldset>

  <fieldset title="Step 2" class="stepy-step">
    <legend class="stepy-legend">description two</legend>

    <!-- inputs -->
  </fieldset>

  <a class="stepy-back">back</a>
  <a class="stepy-next">next</a>
  <input type="submit" class="stepy-finish" />
</form>
```

```js
$('form').stepy();
```

## Functions

```js
$('form').stepy('step', 2); // Changes the form to the second step.

$('form').stepy('destroy'); // Destroy the Stepy's bind and gives you the raw element.
```

## Contributors

[Check it out](http://github.com/wbotelhos/stepy/graphs/contributors)

## Love it!

Via [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=stepy) or [Gratipay](https://gratipay.com/stepy). Thanks! (:
