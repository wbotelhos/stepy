/**
 * jQuery Stepy - A Wizard Plugin - http://wbotelhos.com/stepy
 * ---------------------------------------------------------------------------------
 *
 * jQuery Stepy is a plugin based on FormToWizard that generates a customizable wizard.
 * 
 * Licensed under The MIT License
 * 
 * @version			0.2
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
			step;

        var $titles = $('<ul class="stepy-titles"></ul>').insertBefore($global);

        if (options.validate && $global.is('form')) {
        	$global.append('<div class="stepy-error"></div>');
        }


        steps.each(function(i) { // fieldset
        	step = $(this);

        	step
        	.attr('id', id + '-step-' + i)
        	.addClass('step')
        	.append('<p id="' + id + '-buttons-' + i + '"></p>');

        	title = (step.attr('title') != '') ? step.attr('title') : '--';

        	description = step.children('legend:first').html();

        	$titles.append('<li id="' + id + '-title-' + i + '">' + title  + '<span>' + description + '</span></li>');

        	if (i == 0) {
        		createNextButton(i);
        	} else {
        		createBackButton(i);
        		step.hide();

        		if (i != size - 1) {
	        		createNextButton(i);
	        	}
        	}
        });

        $titles.children('li:first').addClass('current-step');

        var finish = $global.children('.finish');

        if (options.finish) {
	        if (finish.length) {
        		finish.hide().appendTo($global.find('p:last'));
	        } else if ($global.is('form')) {
	        	debug('You should create a button with a class named "finish" when the attribute \'finish\' is true.');
	        }
        }

        var $this	= $global,
        	opt		= options;

        if (options.titleClick) {
        	$titles.children().click(function() {
        		var clicked = parseInt($(this).attr('id').match(/\d/)),
        			current = parseInt($titles.children('.current-step').attr('id').match(/\d/)),
        			maxStep = clicked;

				if (clicked > current) {									// Validate only clickeds steps ahead.
					var isValid = true;

					if (opt.validate) {
						for (var i = 0; i < clicked; i++) {
							isValid = validate($this, i) && isValid;		// Accumulates validations.

							if (!isValid) {									// In the first invalid step the function stops.
								maxStep = i;								// The first invalid step.
								break;
							}
						}
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

        function createBackButton(i) {
        	$('<a/>', {
        		id:			id + '-back-' + i,
        		href:		'javascript:void(0);',
        		'class':	'button-back',
        		html:		options.backLabel
        	})
        	.click(function() {
                selectStep($this, i - 1);
                finish.hide();
            })
        	.appendTo($('p#' + id + '-buttons-' + i));

        };

        function createNextButton(i) {
        	$('<a/>', {
        		id:			id + '-next-' + i,
        		href:		'javascript:void(0);',
        		'class':	'button-next',
        		html:		options.nextLabel
        	})
        	.click(function() {
            	if (!opt.validate || validate($this, i)) {
	                selectStep($this, i + 1);

	                if (i + 2 == size) {
	                	finish.show();
	                }
            	}
            })
            .appendTo($('p#' + id + '-buttons-' + i));
        };

		return $global;
	};
	
	$.fn.stepy.defaults = {
		backLabel:		'&lt; Back',
		finish:			true,
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

	function getContext(value, id, name) {
		var context = $global;

		if (id) {
			if (id.indexOf('.') == 0) {
				var idEach;

				return $(id).each(function() {
					idEach = '#' + $(this).attr('id');

					if (name == 'step') {
						$.fn.raty.step(value, idEach);
					}
				});
			}

			context	= $(id);

			if (!context.length) {
				debug('"' + id + '" is a invalid ID for the public funtion $.fn.stepy.' + name + '().');
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

    function validate(context, index) {
    	if (!context.is('form')) {
    		return true;
    	}

    	var id		= context.attr('id'),
    		isValid	= true,
    		step	= context.children('fieldset').eq(index);

    	context.children('.stepy-error').empty();

    	step.find(':input').each(function() {
    		isValid = isValid && context.validate().element($(this));

    		if (isValid === undefined) {
    			isValid = true;
    		}

    		if (!isValid) {
    			context.validate().focusInvalid();
    		}
    	});

    	return isValid;
    };
    
})(jQuery);