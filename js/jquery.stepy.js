/**
 * jQuery Stepy - A Wizard Plugin - http://wbotelhos.com/stepy
 * ---------------------------------------------------------------------------------
 *
 * jQuery Stepy is a plugin based on FormToWizard that generates a customizable wizard.
 * 
 * Licensed under The MIT License
 * 
 * @version			0.3.0
 * @since			07.03.2010
 * @author			Washington Botelho dos Santos
 * @documentation	http://wbotelhos.com/raty
 * @twitter			http://twitter.com/wbotelhos
 * @license			http://opensource.org/licenses/mit-license.php MIT
 * @package			jQuery Plugins
 * 
 * Usage with default values:
 * ---------------------------------------------------------------------------------
 * $('#default').stepy();
 *  
 *	<form id="default">
 *		<fieldset title="Step 1">
 *			<legend>description one</legend>
 *			<!-- input fields -->
 *		</fieldset>
 *
 *		<fieldset title="Step 2">
 *			<legend>description one</legend>
 *			<!-- input fields -->
 *		</fieldset>
 *
 *		// and so on..
 *
 *		<input type="submit" class="finish" value="Finish!"/>
 *	</form>
 *
 */

;(function($) {

	$.fn.stepy = function(settings) {
		options = $.extend({}, $.fn.stepy.defaults, settings);

		if (this.length == 0) {
			debug('Invalid selector!');
			return;
		} else if (this.length > 1) {
			return this.each(function() {
				$.fn.stepy.apply($(this), [settings]);
			});
		}

		$global = $(this);

		var id			= $global.attr('id'),
			steps		= $global.children('fieldset'),
			size		= steps.size(),
			description	= '',
			title		= '',
			step,
			$titles = $('<ul class="stepy-titles"></ul>').insertBefore($global);

        if (options.validate && $global.is('form')) {
        	$global.append('<div class="stepy-error"></div>');
        }

        steps.each(function(index) { // fieldset
        	step = $(this);

        	step
        	.attr('id', id + '-step-' + index)
        	.addClass('step')
        	.append('<p id="' + id + '-buttons-' + index + '" class="' + id + '-buttons"></p>');

        	title = (step.attr('title') != '') ? step.attr('title') : '--';

        	description = step.children('legend:first').html();

        	$titles.append('<li id="' + id + '-title-' + index + '">' + title  + '<span>' + description + '</span></li>');

        	if (index == 0) {
        		createNextButton(index);
        	} else {
        		createBackButton(index);
        		step.hide();

        		if (index != size - 1) {
	        		createNextButton(index);
	        	}
        	}
        });

        $titles.children('li:first').addClass('current-step');

        var finish = $global.children('.finish'),
        	$this	= $global,
        	opt		= options;

		if (options.finish) {
	        if (finish.length) {
        		finish
        		.hide()
        		.click(function() {
        			validate($this, size - 1, opt);
        		})
        		.appendTo($global.find('p:last'));
	        } else if ($global.is('form')) {
	        	debug('You should create a button with a class named "finish" when the attribute \'finish\' is true.');
	        }
        }

        if (options.titleClick) {
        	$titles.children().click(function() {
        		var clicked = parseInt($(this).attr('id').match(/\d/)),
        			current = parseInt($titles.children('.current-step').attr('id').match(/\d/)),
        			maxStep = clicked;

				if (clicked > current) {									// Validate only clickeds steps ahead.
					if (isStopCallback(opt.onNext, clicked)) {
						return;
					}

					maxStep = getMaxStep($this, opt, clicked);
				} else if (clicked < current) {
					if (isStopCallback(opt.onBack, clicked)) {
						return;
					}
				}

				if (clicked != current) {									// Avoid change to the same step.
					selectStep($this, maxStep);
	
			        if (opt.finish && maxStep + 1 == size) {
	                	finish.show();
	                }
				}
        	});
    	} else {
    		$titles.children().css('cursor', 'default');
    	}

        function isStopCallback(callback, clicked) {
        	var isValid = callback.apply($this, [clicked + 1]);

        	if (isValid || isValid === undefined) { 
				return false;
			}
        	
        	return true;
        };

        function createBackButton(index) {
        	$('<a/>', {
        		id:			id + '-back-' + index,
        		href:		'javascript:void(0);',
        		'class':	'button-back',
        		html:		options.backLabel
        	})
        	.click(function() {
        		if (!isStopCallback(opt.onBack, index - 1)) {
	                selectStep($this, index - 1);
	                finish.hide();
        		}
            })
        	.appendTo($('p#' + id + '-buttons-' + index));

        };

        function createNextButton(index) {
        	$('<a/>', {
        		id:			id + '-next-' + index,
        		href:		'javascript:void(0);',
        		'class':	'button-next',
        		html:		options.nextLabel
        	})
        	.click(function() {
        		if (!isStopCallback(opt.onNext, index + 1)) {
	        		var maxStep	= getMaxStep($this, opt, index + 1);
	
					selectStep($this, maxStep);
	
			        if (opt.finish && maxStep + 1 == size) {
	                	finish.show();
	                }
        		}
            })
            .appendTo($('p#' + id + '-buttons-' + index));
        };

        function getMaxStep(context, opt, clicked) {
        	var maxStep = clicked,
        		isValid = true;

        	if (opt.validate) {
	        	for (var i = 0; i < clicked; i++) {
					isValid = validate($this, i, opt) && isValid;	// Accumulates validations.
	
					if (opt.block && !isValid) {					// In the first invalid step the function stops or not.
						maxStep = i;								// The first invalid step.
						break;
					}
				}
        	}

        	return maxStep;
        };

		return $global;
	};
	
	$.fn.stepy.defaults = {
		backLabel:		'&lt; Back',
		block:			false,
		errorImage:		false,
		finish:			true,
		onBack:			function(index) { return true; },
		onNext:			function(index) { return true; },
		nextLabel:		'Next &gt;',
		titleClick:		false,
		validate:		false
	};

	$.fn.stepy.step = function(index, id) {
		selectStep(getContext(index, id, 'step'), index - 1);
		$.fn.stepy;
	};

	function debug(message) {
		if (console && console.log) {
			console.log(message);
		}
	};

	function getContext(value, idOrClass, name) {
		var context = $global;

		if (id) {
			context	= $(idOrClass);

			if (!context.length) {
				debug('"' + idOrClass + '" is a invalid identifier for the public funtion $.fn.raty.' + name + '().');
				return;
			}
		}

		return context;
	};

	function selectStep(context, index) {
		var id		= context.attr('id'),
			size	= context.children('fieldset').size(),
			step;

		if (index > size - 1) {
			index = size - 1;
		}

		context
			.children('fieldset').hide()
		.end()
			.children('fieldset')
				.eq(index).show();

		context
			.prev()
				.children().removeClass('current-step')
			.end()
			.children()
				.eq(index).addClass('current-step');

        if (context.is('form')) {
        	context
        		.children('fieldset')
	        		.eq(index)
		        		.find(':input:visible')
			        		.each(function() {
			        			step = $(this);
			
					        	if (!step.attr('disabled')) {
					    			step.focus();
					    			return false;
					        	}
			        		});
        }
	};

    function validate(context, index, options) {
    	if (!context.is('form')) {
    		return true;
    	}

    	var id		= context.attr('id'),
    		isValid	= true,
    		step	= context.children('fieldset').eq(index),
    		titles	= context.prev('ul.stepy-titles').children();

    	step.find(':input').each(function() {
    		isValid = isValid && context.validate().element($(this));

    		if (isValid === undefined) {
    			isValid = true;
    		}

    		if (!isValid) {
    			if (options.block) {
    				selectStep(context, index);
    			}

    			if (options.errorImage) {
    				titles.eq(index).addClass('error-image');
    			}

    			context.validate().focusInvalid();
    		} else {
    			if (options.errorImage) {
    				titles.eq(index).removeClass('error-image');
    			}
    		}
    	});

    	return isValid;
    };
    
})(jQuery);