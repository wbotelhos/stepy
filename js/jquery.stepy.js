/*!
 * jQuery Stepy - A Wizard Plugin - http://wbotelhos.com/stepy
 * ---------------------------------------------------------------------------------
 *
 * jQuery Stepy is a plugin based on FormToWizard that generates a customizable wizard.
 * 
 * Licensed under The MIT License
 * 
 * @version			1.0.0
 * @since			2010.07.03
 * @author			Washington Botelho dos Santos
 * @documentation	wbotelhos.com/raty
 * @twitter			twitter.com/wbotelhos
 * @license			opensource.org/licenses/mit-license.php MIT
 * @package			jQuery Plugins
 * 
 * Usage with default values:
 * ---------------------------------------------------------------------------------
 * $('#stepy').stepy();
 *
 *	<form id="stepy">
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

		var opt				= $.extend({}, $.fn.stepy.defaults, settings),
			$this			= $(this),
			id				= this.attr('id'),
			$steps			= $this.children('fieldset'),
			size			= $steps.size(),
			$titlesWrapper	= $('<ul/>', { id: id + '-titles', 'class': 'stepy-titles' }),
			description		= '',
			title			= '',
			$legend			= null,
			isForm			= $this.is('form'),
			onSubmit		= '',
			step;

		if (opt.titleTarget) {
			$(opt.titleTarget).html($titlesWrapper);
		} else {
			$titlesWrapper.insertBefore($this);
		}

		if (id === undefined) {
			id = 'stepy-' + $this.index();
			$this.attr('id', id); 
		}

		$this.data('options', opt);

        if (opt.validate) {
        	$this.append('<div class="stepy-error"/>');
        }

        $steps.each(function(index) {
        	step = $(this);

        	step
        	.attr('id', id + '-step-' + index)
        	.addClass('step')
        	.append('<p id="' + id + '-buttons-' + index + '" class="' + id + '-buttons"/>');

        	title = (step.attr('title') != '') ? step.attr('title') : '--';

        	$legend = step.children('legend');

        	if (!opt.legend) {
        		$legend.hide();
        	}

        	description = '';

        	if (opt.description) {
        		if ($legend.length) {
        			description = '<span>' + $legend.html() + '</span>';
        		} else {
        			debug(id + ': the legend element of the step ' + (index + 1) + ' is required to set the description!');
        		}
        	}

        	$titlesWrapper.append('<li id="' + id + '-title-' + index + '">' + title  + description + '</li>');

        	if (index == 0) {
        		if (size > 1) {
        			createNextButton(index);
        		}
        	} else {
        		createBackButton(index);
        		step.hide();

        		if (index < size - 1) {
	        		createNextButton(index);
	        	}
        	}
        });

        var $titles	= $titlesWrapper.children(),
        	finish	= $this.children('.finish');

        $titles.first().addClass('current-step');

		if (opt.finishButton) {
	        if (finish.length) {
	        	if (opt.finish && isForm) {
	        		onSubmit = $this.attr('onsubmit');
	        		$this.attr('onsubmit', 'return false;');
	        	}

        		finish.click(function(evt) {
        			var isSubmit = finish.attr('type') == 'submit';

    				if (opt.finish && isStopCallback(opt.finish, size - 1)) {
   						evt.preventDefault();
    				} else {
    					if (isForm) {
    						if (onSubmit) {
    							$this.attr('onsubmit', onSubmit);
    						} else {
    							$this.removeAttr('onsubmit');
    						}

    						if (!isSubmit && (!opt.validate || validate($this, size - 1, opt))) {
    							$this.submit();
    						}
    					}
    				}
        		});

        		if (size > 1) {
        			finish.hide();
                }

        		finish.appendTo($this.find('p:last'));
	        } else {
	        	debug(id + ': element with class name "finish" missing!');
	        }
        }

        if (opt.titleClick) {
        	$titles.click(function() {
        		var	currentArray	= $titlesWrapper.children('.current-step').attr('id').split('-'),
	        		current			= parseInt(currentArray[currentArray.length - 1]),
	        		clicked			= $(this).index(),
        			maxStep			= clicked;

				if (clicked > current) {
					if (opt.next && isStopCallback(opt.next, clicked)) {
						return;
					}

					maxStep = getMaxStep($this, opt, clicked);
				} else if (clicked < current) {
					if (opt.back && isStopCallback(opt.back, clicked)) {
						return;
					}
				}

				var isBlocked = (maxStep <= clicked);

				if (clicked != current) {
					selectStep($this, maxStep, isBlocked, opt);

			        if (opt.finishButton && maxStep + 1 == size) {
	                	finish.show();
	                }
				}
        	});
    	} else {
    		$titles.css('cursor', 'default');
    	}

        $steps.delegate('input[type="text"], input[type="password"]', 'keypress', function(evt) {
        	var key = (evt.keyCode ? evt.keyCode : evt.which);

        	if (key == 13) {
        		evt.preventDefault();

        		var buttons = $(this).parent().children('p.' + id + '-buttons');

        		if (buttons.length) {
        			var next = buttons.children('a.button-next');

        			if (next.length) {
        				next.click();
        			} else {
	        			var finish = buttons.children('input.finish');

	        			if (finish.length) {
	        				finish.click();
	        			}
        			}
        		}
        	}
        });

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
        		if (!opt.back || !isStopCallback(opt.back, index - 1)) {
	                selectStep($this, index - 1, false, opt);

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
        		if (!opt.next || !isStopCallback(opt.next, index + 1)) {
	        		var maxStep		= getMaxStep($this, opt, index + 1),
	        			isBlocked	= (maxStep <= index);

					selectStep($this, maxStep, isBlocked, opt);
	
			        if (opt.finishButton && maxStep + 1 == size) {
	                	finish.show();
	                }
        		}
            })
            .appendTo($('p#' + id + '-buttons-' + index));
        };

        function getMaxStep(context, opt, clicked) { // TODO: give support of validation from public function. .data().
        	var maxStep = clicked,
        		isValid = true;

        	if (opt.validate) {
	        	for (var i = 0; i < clicked; i++) {
					isValid &= validate($this, i, opt);

					if (opt.block && !isValid) {
						maxStep = i;
						break;
					}
				}
        	}

        	return maxStep;
        };

		return $this;
	};

	function selectStep(context, index, isBlocked, opt) {
		var id		= context.attr('id'),
			$steps	= context.children('fieldset'),
			size	= $steps.size(),
			$titles	= $('ul#' + id + '-titles').children(),
			step;

		if (index > size - 1) {
			index = size - 1;
		}

		$steps.hide().eq(index).show();

		$titles.removeClass('current-step').eq(index).addClass('current-step');

        if (context.is('form')) {
        	var firstField = $steps.eq(index).find(':input:visible:enabled:first');

        	if (!isBlocked) {
        		firstField.focus();
        	}
        }

		if (opt.select) {
			opt.select.call(this, index +1);
		}
	};

	function validate(context, index, opt) {
		if (!context.is('form')) {
			return true;
		}

		var id		= context.attr('id'),
			isValid	= true,
			$step	= context.children('fieldset').eq(index),
			$title	= $('ul#' + id + '-titles').children().eq(index);

		$($step.find(':input:enabled').get().reverse()).each(function() {
			var fieldIsValid = context.validate().element($(this));

			if (fieldIsValid === undefined) {
				fieldIsValid = true;
			}

			isValid &= fieldIsValid;

			if (isValid) {
				if (opt.errorImage) {
					$title.removeClass('error-image');
				}
			} else {
				if (opt.block) {
					selectStep(context, index, true, opt);
				}

				if (opt.errorImage) {
					$title.addClass('error-image');
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

		selectStep(context, index - 1, false, {});

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
		back:			null,
		backLabel:		'&lt; Back',
		block:			false,
		description:	true,
		errorImage:		false,
		finish:			null,
		finishButton:	true,
		legend:			true,
		next:			null,
		nextLabel:		'Next &gt;',
		titleClick:		false,
		titleTarget:	'',
		validate:		false,
		select: 		null
	};

})(jQuery);
