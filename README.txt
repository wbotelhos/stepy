/**
 * jQuery Stepy - A Wizard Plugin - http://wbotelhos.com/stepy
 * --------------------------------------------------------------------------
 *
 * jQuery Stepy is a plugin based on FormToWizard that generates a customizable wizard.
 * 
 * Licensed under The MIT License
 *
 * @version     0.1
 * @since       07.03.2010
 * @author      Washington Botelho dos Santos
 * @link        http://wbotelhos.com/stepy
 * @twitter     http://twitter.com/wbotelhos
 * @license     http://www.opensource.org/licenses/mit-license.php MIT 
 * @package     jQuery Plugins
 * 
 * 
 * Usage (default values):
 * --------------------------------------------------------------------------
 *  $('#default').stepy({
 *      backLabel:        '&lt; Back',  // Change the back button label.
 *      includeFinish:    true,         // Include the button with class called '.finish' into the last step.
 *      nextLabel:        'Next &gt;',  // Change the next button label.
 *      titleClick:       true,         // Active the back and next action in the titles.
 *      validate:         false         // Active the jQuery Validation. Depends of jquery.validation.js.
 *  });
 *  
 *  <form id="default">
 *      <fieldset title="Step 1">
 *          <legend>description one</legend>
 *          <!-- input fields -->
 *      </fieldset>
 *
 *      <fieldset title="Step 2">
 *          <legend>description one</legend>
 *          <!-- input fields -->
 *      </fieldset>
 *
 *      // and so on..
 *
 *      <input type="submit" class="finish" value="Finish!"/>
 *  </form>
 *
 * Public functions:
 * --------------------------------------------------------------------------
 *
 *  $.fn.stepy.step(2, 'default');  // Go to step 2 with ID called 'default' later.
 *
 */