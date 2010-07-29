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
 * Usage (default values):
 * --------------------------------------------------------------------------
 *  $('#default').stepy({
 *      backLabel:        '&lt; Back',  // Change the back button label.
 *      includeFinish:    true,         // Include the button with class called '.finish' into the last step.
 *      nextLabel:        'Next &gt;',  // Change the next button label.
 *      titleClick:       true,         // Active the back and next action in the titles.
 *      validate:         false         // Active the jQuery Validation. Depends of jquery.validation.js. A div with class 'error-step' is created automatically to put the errors.
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
 *  $.fn.stepy.step(2, 'default');  // Go to step 2 with ID called 'default' later. If validation is enabled this feature should come after the call of validate.
 *
 */

(function($) {

	$.fn.stepy = function(settings) {
		options = $.extend({}, $.fn.stepy.defaults, settings);

		if (this.attr('id') === undefined) {
			debug('Invalid selector!'); return;
		}

		$this = $(this);

		var id = $this.attr('id'),
			steps = $this.find('fieldset'),
			count = steps.size(),
			isValidate = options.validate,
			title = '',
			description = '';

        $this.before('<ul id="' + id + '-titles" class="titles"></ul>');

        if (isForm(id) && isValidate) {
        	$this.append('<div class="error-step"></div>');
        }

        steps.each(function(i) {
        	$(this).attr('id', id + '-step-' + i).append('<p id="' + id + '-buttons-' + i + '"></p>').addClass('step');

        	description = $(this).children('legend:first').html();
        	title = ($(this).attr('title') != '') ? $(this).attr('title') : '--';
        	$('ul#' + id + '-titles').append('<li id="' + id + '-title-' + i + '">' + title  + '<span>' + description + '</span></li>');

        	if (i == 0) {
        		createNextButton(i);
        	} else if (i == (count - 1)) {
        		createBackButton(i);
        		$('fieldset#' + id + '-step-' + i).hide();
        	} else {
        		createBackButton(i);
        		createNextButton(i);
        		$('fieldset#' + id + '-step-' + i).hide();
        	}
        });
        
        $('li#' + id + '-title-0').addClass('current-step');

        var finish = $('#' + id + ' .finish');
        
        if (finish[0]) {
        	if (options.includeFinish) {
        		finish = finish.removeClass('finish').addClass('button-finish').hide().appendTo('p#' + id + '-buttons-' + (count - 1));
        	}
        } else {
        	if (isForm(id)) {
        		debug('You should create a button with a class named "finish" when the attribute includeFinish is true.');
        	}
        }

        function getCurrentStepId(id) {
			var vet = $('ul#' + id + '-titles').find('li.current-step').attr('id').split('-');
			return parseInt(vet[vet.length - 1]);
        }

        function getClickedStepId(title) {
        	var vet = title.attr('id').split('-');
			return parseInt(vet[vet.length - 1]);
        }

        if (options.titleClick) {
			$('li', $('ul#' + id + '-titles')[0]).live('click', function() {
				var idCurrent = getCurrentStepId(id), idClicked = getClickedStepId($(this));

				if (idClicked == idCurrent) {
					return false;
				}

				var maxStep = idClicked, isValid = true;

				if (isValidate) {
					$('fieldset.step', $('#' + id)[0]).each(function(index) {
						if (index >= idClicked) {
							return false;
						}
						
						if (idClicked > idCurrent) {									// Validate only clickeds steps ahead.
							isValid = validate(id, index) && isValid;					// Accumulates validations.

							if (!isValid) {												// In the first invalid step the function stops.
								maxStep = index;										// The first invalid step.
								return false;
							}
						}
					});
				}

				if (maxStep != idCurrent) {												// Avoid change to the same step.
					selectStep(id, maxStep);
	
			        if (maxStep + 1 == count) {
	                	finish.show();
	                }
				}
        	});
    	}

        function createBackButton(i) {
        	var buttonId = id + '-back-' + i;
            $('p#' + id + '-buttons-' + i).append('<a id="' + buttonId + '" href="javascript:void(0);" class="button-back">' + options.backLabel + '</a>');

            $('a#' + buttonId).live('click', function() {
                selectStep(id, i - 1);
                finish.hide();
            });
        }

        function createNextButton(i) {
        	var buttonId = id + '-next-' + i;
            $('p#' + id + '-buttons-' + i).append('<a id="' + buttonId + '" href="javascript:void(0);" class="button-next">' + options.nextLabel + '</a>');
            $('a#' + buttonId).live('click', function() {
            	if (!isValidate || validate(id, i)) {
	                selectStep(id, i + 1);
	                
	                if (i + 2 == count) {
	                	finish.show();
	                }
            	}
            });
        }

		return $this;
	};
	
	$.fn.stepy.defaults = {
		backLabel:			'&lt; Back',
		includeFinish:		true,
		nextLabel:			'Next &gt;',
		titleClick:			true,
		validate:			false
	};

	$.fn.stepy.step = function(index, id) {
		$('p#' + getPublicId(id) + '-buttons-' + (index - 2) + ' a.button-next').trigger('click');
	};
	
	function getPublicId(id) {
		if (id) {
			if ($('#' + id)[0]) {
				return id;
			} else {
				debug('Invalid selector of the public funtion $.fn.stepy.step()!');
			}
		} else {
			return $this.attr('id');
		}
	};

	function selectStep(id, index) {
		var count = $('#' + id + ' fieldset').size();

		if (index > count) {
			index = count - 1;
		}

		$('#' + id + ' fieldset.step').hide();
		$('#' + id + ' fieldset#' + id + '-step-' + index).show();

		$('ul#' + id + '-titles li').removeClass('current-step');
        $('li#' + id + '-title-' + index).addClass('current-step');

        if (isForm(id)) {
	        $(':input:visible', $('#' + id + ' fieldset#' + id + '-step-' + index)[0]).each(function() {
	        	if (!$(this).attr('disabled')) {
	    			$(this).focus();
	    			return false;
	        	}
	        });
        }
	};

	function isForm(id) {
		var tipo = $('#' + id).get().toString();
    	if (tipo === '[object HTMLFormElement]') {
    		return true;
    	}
    	return false;
	};

    function validate(id, index) {
    	if (!isForm(id)) {
    		return true;
    	}

    	var isValid = true, container = $('#' + id);

    	$('#' + id + ' div.error-step').html('');
    	$(':input', $('#' + id + ' fieldset#' + id + '-step-' + index)[0]).each(function() {
    		isValid = isValid && container.validate().element($(this));

    		if (isValid === undefined) {
    			isValid = true;
    		}

    		if (isValid || isValid === undefined) {
    			selectStep(id, index);
    		} else {
    			container.validate().focusInvalid();
    			isValid = false;
    		}
    	});

    	return isValid;
    };
    
	function debug(message) {
		if (window.console && window.console.log) {
			window.console.log(message);
		}
	};

})(jQuery);