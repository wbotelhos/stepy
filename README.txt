/**
 * jQuery Stepy - A Wizard Plugin - http://wbotelhos.com/stepy
 * --------------------------------------------------------------------------
 *
 * jQuery Stepy is a plugin based on FormToWizard that generates a customizable wizard.
 * 
 * Licensed under The MIT License
 *
 * @version     0.5.0
 * @since       07.03.2010
 * @author      Washington Botelho dos Santos
 * @link        http://wbotelhos.com/stepy
 * @twitter     http://twitter.com/wbotelhos
 * @license     http://www.opensource.org/licenses/mit-license.php MIT 
 * @package     jQuery Plugins
 *
 *
 * Default values:
 * --------------------------------------------------------------------------
 * back:           null                 // Callback before the backward action.
 * backLabel:      '< Back'             // Change the back button label.
 * block:          false                // Block the next step if the current is invalid.
 * description:    false                // Choose if the descriptions of the titles will be showed.
 * errorImage:     false                // If an error occurs, a image is showed in the title of the corresponding step.
 * finish:         null                 // Callback before the finish action.
 * finishButton:   true                 // Include the button with class called '.finish' into the last step.
 * legend:         false                // Choose if the legends of the steps will be showed.
 * nextLabel:      'Next >'             // Change the next button label.
 * next:           null                 // Callback before the forward action.
 * titleClick:     true                 // Active the back and next action in the titles.
 * titleTarget:    ''                   // Choose the place where titles will be placed.
 * validate:       false                // Active the jQuery Validation for each step.
 *
 *
 * Usage with default values:
 * --------------------------------------------------------------------------
 *
 * $('#form').stepy();
 *
 * <form id="default">
 *     <fieldset title="Step 1">
 *         <legend>description one</legend>
 *         <!-- input fields -->
 *     </fieldset>
 *
 *     <fieldset title="Step 2">
 *         <legend>description two</legend>
 *         <!-- input fields -->
 *     </fieldset>
 *
 *     <input type="submit" class="finish"/>
 *  </form>
 *
 *
 * Public functions:
 * --------------------------------------------------------------------------
 * You must pass a ID or a class to be the target of the action:
 *
 * $.fn.stepy.step(2, '#stepy');       // Change the form to step 2.
 *
 */