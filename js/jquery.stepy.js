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

		if (this.length == 0) {
			debug('Selector invalid or missing!');
			return;
		} else if (this.length > 1) {
			return this.each(function() {
				$.fn.stepy.apply($(this), [settings]);
			});
		}

		var opt			= $.extend({}, $.fn.stepy.defaults, settings),
			$this		= $(this),
			id			= this.attr('id'),
			steps		= $this.children('fieldset'),
			size		= steps.size(),
			description	= '',
			title		= '',
			step,
			$titles		= $('<ul/>', { id: id + '-titles', 'class': 'stepy-titles' }).insertBefore($this);

		if (id === undefined) {
			id = 'stepy-' + $this.index();
			$this.attr('id', id); 
		}

        if (opt.validate && $this.is('form')) {
        	$this.append('<div class="stepy-error"/>');
        }

        steps.each(function(index) { // fieldset
        	step = $(this);

        	step
        	.attr('id', id + '-step-' + index)
        	.addClass('step')
        	.append('<p id="' + id + '-buttons-' + index + '" class="' + id + '-buttons"/>');

        	title = (step.attr('title') != '') ? step.attr('title') : '--';

        	description = step.children('legend:first').html();

        	$titles.append('<li id="' + id + '-title-' + index + '">' + title  + '<span>' + description + '</span></li>');

        	if (index == 0) {
        		createNextButton(index);
        	} else {
        		createBackButton(index);
        		step.hide();

        		if (index < size - 1) {
	        		createNextButton(index);
	        	}
        	}
        });

        $titles.children('li:first').addClass('current-step');

        var finish = $this.children('.finish');

		if (opt.finish) {
	        if (finish.length) {
        		finish.hide().click(function() {
        			validate($this, size - 1, opt);
        		})
        		.appendTo($this.find('p:last'));
	        } else if ($this.is('form')) {
	        	debug('Button with class "finish" missing!');
	        }
        }

        if (opt.titleClick) {
        	$titles.children().click(function() {
        		var clicked = parseInt($(this).attr('id').split('-')[2]),
        			current = parseInt($titles.children('.current-step').attr('id').split('-')[2]),
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

        	return !(isValid || isValid === undefined);
        };

        function createBackButton(index) {
        	$('<a/>', {
        		id:			id + '-back-' + index,
        		href:		'javascript:void(0);',
        		'class':	'button-back',
        		html:		opt.backLabel
        	}).click(function() {
        		if (!isStopCallback(opt.onBack, index - 1)) {
	                selectStep($this, index - 1);

	                if (index + 1 == size) {
	                	finish.hide();
	                }
        		}
            })
            .appendTo($('p#' + id + '-buttons-' + index));
        };

        function createNextButton(index) {
        	$('<a/>', {
        		id:			id + '-next-' + index,
        		href:		'javascript:void(0);',
        		'class':	'button-next',
        		html:		opt.nextLabel
        	}).click(function() {
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

		return $this;
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

    function validate(context, index, opt) {
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

    		if (isValid) {
    			if (opt.errorImage) {
    				titles.eq(index).removeClass('error-image');
    			}
    		} else {
    			if (opt.block) {
    				selectStep(context, index);
    			}

    			if (opt.errorImage) {
    				titles.eq(index).addClass('error-image');
    			}

    			context.validate().focusInvalid();
    		}
    	});

    	return isValid;
    };

    $.fn.stepy.step = function(index, idOrClass) {
    	var context = getContext(index, idOrClass, 'step');

		if (idOrClass.indexOf('.') >= 0) {
			return;
		}

		selectStep(context, index - 1);

		$.fn.stepy;
	};

    function getContext(value, idOrClass, name) {
		var context = undefined;

		if (idOrClass == undefined) {
			debug('Specify an ID or class to be the target of the action.');
			return;
		}

		if (idOrClass) {
			if (idOrClass.indexOf('.') >= 0) {
				var idEach;

				return $(idOrClass).each(function() {
					idEach = '#' + $(this).attr('id');

					if (name == 'step') {
						$.fn.stepy.step(value, idEach);
					}
				});
			}

			context = $(idOrClass);

			if (!context.length) {
				debug('"' + idOrClass + '" is a invalid identifier for the public funtion $.fn.stepy.' + name + '().');
				return;
			}
		}

		return context;
	};

    function debug(message) {
		if (window.console && window.console.log) {
			window.console.log(message);
		}
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

})(jQuery);