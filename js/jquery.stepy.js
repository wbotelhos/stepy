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
 * @author			Washington Botelho
 * @documentation	wbotelhos.com/stepy
 * @twitter			twitter.com/wbotelhos
 * @license			opensource.org/licenses/mit-license.php
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

	var methods = {
		init: function(options) {
			return this.each(function() {

				var opt		= $.extend({}, $.fn.stepy.defaults, options),
					$this	= $(this).data('options', opt),
					id		= $this.attr('id');

				if (id === undefined) {
					id = 'stepy-' + $this.index();
					$this.attr('id', id); 
				}

				var $titlesWrapper = $('<ul/>', { id: id + '-titles', 'class': 'stepy-titles' });

				if (opt.titleTarget) {
					$(opt.titleTarget).html($titlesWrapper);
				} else {
					$titlesWrapper.insertBefore($this);
				}

		        if (opt.validate) {
		        	$this.append('<div class="stepy-error"/>');
		        }

		        var	$steps		= $this.children('fieldset'),
		        	$step		= undefined,
		        	$legend		= undefined,
		        	description	= '',
		        	title		= '';

		        $steps.each(function(index) {
		        	$step = $(this);

		        	$step
		        	.addClass('step')
		        	.attr('id', id + '-step-' + index)
		        	.append('<p id="' + id + '-buttons-' + index + '" class="' + id + '-buttons"/>');

		        	$legend = $step.children('legend');

		        	if (!opt.legend) {
		        		$legend.hide();
		        	}

		        	description = '';

		        	if (opt.description) {
		        		if ($legend.length) {
		        			description = '<span>' + $legend.html() + '</span>';
		        		} else {
		        			$.error(id + ': the legend element of the step ' + (index + 1) + ' is required to set the description!');
		        		}
		        	}

		        	title = $step.attr('title');
		        	title = (title != '') ? '<div>' + title + '</div>': '--';

		        	$titlesWrapper.append('<li id="' + id + '-title-' + index + '">' + title + description + '</li>');

		        	if (index == 0) {
		        		if ($steps.length > 1) {
		        			methods.createNextButton.call($this, index);
		        		}
		        	} else {
		        		methods.createBackButton.call($this, index);

		        		$step.hide();

		        		if (index < $steps.length - 1) {
		        			methods.createNextButton.call($this, index);
			        	}
		        	}
		        });

		        var $titles	= $titlesWrapper.children();

		        $titles.first().addClass('current-step');

		        var $finish = $this.children('.finish');

				if (opt.finishButton) {
			        if ($finish.length) {
			        	var isForm		= $this.is('form'),
			        		onSubmit	= undefined;

			        	if (opt.finish && isForm) {
			        		onSubmit = $this.attr('onsubmit');
			        		$this.attr('onsubmit', 'return false;');
			        	}

		        		$finish.click(function(evt) {
		    				if (opt.finish && !methods.execute.call($this, opt.finish, $steps.length - 1)) {
		   						evt.preventDefault();
		    				} else {
		    					if (isForm) {
		    						if (onSubmit) {
		    							$this.attr('onsubmit', onSubmit);
		    						} else {
		    							$this.removeAttr('onsubmit');
		    						}

		    						var isSubmit = $finish.attr('type') == 'submit';

		    						if (!isSubmit && (!opt.validate || methods.validate.call($this, $steps.length - 1))) {
		    							$this.submit();
		    						}
		    					}
		    				}
		        		});

//		        		if ($steps.length > 1) {
//		        			$finish.hide();
//		                }
		
		        		$finish.appendTo($this.find('p:last'));
			        } else {
			        	$.error(id + ': element with class name "finish" missing!');
			        }
		        }

		        if (opt.titleClick) {
		        	$titles.click(function() {
		        		var	array	= $titles.filter('.current-step').attr('id').split('-'), // TODO: try keep the number in an attribute.
			        		current	= parseInt(array[array.length - 1], 10),
			        		clicked	= $(this).index(),
		        			maxStep	= clicked;

						if (clicked > current) {
							if (opt.next && !methods.execute.call($this, opt.next, clicked)) {
								return false;
							}

							maxStep = methods.getMaxStep.call($this, clicked);
						} else if (clicked < current) {
							if (opt.back && !methods.execute.call($this, opt.back, clicked)) {
								return false;
							}
						}

						if (clicked != current) {
							var isBlocked = (maxStep <= clicked); // TODO why <= se foi no que cliquei é porque não esta bloqueado, não indice zero??

							methods.selectStep.call($this, maxStep, isBlocked);

					        if (opt.finishButton && maxStep + 1 == $steps.length) {
			                	$finish.show();
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

		        		var $buttons = $(this).parent().children('.' + id + '-buttons');

		        		if ($buttons.length) {
		        			var $next = $buttons.children('.button-next');

		        			if ($next.length) {
		        				$next.click();
		        			} else {
			        			var $finish = $buttons.children('.finish');
		
			        			if ($finish.length) {
			        				$finish.click();
			        			}
		        			}
		        		}
		        	}
		        });

		        $steps.first().find(':input:visible:enabled').first().select().focus();
			});
		}, createBackButton: function(index) {
			var $this	= this,
				id		= this.attr('id'),
				opt		= this.data('options');

        	$('<a/>', { id: id + '-back-' + index, href: 'javascript:void(0);', 'class': 'button-back', html: opt.backLabel }).click(function() {
        		if (!opt.back || methods.execute.call($this, opt.back, index - 1)) {
        			methods.selectStep.call($this, index - 1);

//	                if (index + 1 == $steps.length) {
//	                	$finish.hide();
//	                }
        		}
            })
            .appendTo($('#' + id + '-buttons-' + index));
        }, createNextButton: function(index) {
			var $this	= this,
				id		= this.attr('id'),
				opt		= this.data('options');

        	$('<a/>', { id: id + '-next-' + index, href: 'javascript:void(0);', 'class': 'button-next', html: opt.nextLabel }).click(function() {
        		if (!opt.next || methods.execute.call($this, opt.next, index + 1)) {
	        		var maxStep = methods.getMaxStep.call($this, index + 1);
//	        		, isBlocked	= (maxStep <= index);

					methods.selectStep.call($this, maxStep);

//			        if (opt.finishButton && maxStep + 1 == $steps.length) {
//	                	$finish.show();
//	                }
        		}
            })
            .appendTo($('#' + id + '-buttons-' + index));
        }, execute: function(callback, clicked) {
        	var isValid = callback.call(this, clicked + 1);

        	return isValid || isValid === undefined;
        }, getMaxStep: function(clicked) { // TODO: give support of validation from public function. .data().
        	var maxStep	= clicked,
        		opt		= this.data('options');

	    	if (opt.validate) {
	    		var isValid = true;

	        	for (var index = 0; index < clicked; index++) {
					isValid &= methods.validate.call(this, index);

					if (opt.block && !isValid) {
						maxStep = index;
						break;
					}
				}
	    	}

	    	return maxStep;
	    }, selectStep: function(index) {
			var $steps	= this.children('fieldset'),
				maxStep	= $steps.length - 1;

			if (index > maxStep) {
				index = maxStep;
			}

			$steps.hide().eq(index).show();

			var $titles	= $('#' + this.attr('id') + '-titles').children();

			$titles.removeClass('current-step').eq(index).addClass('current-step');

	        var opt = this.data('options');

			if (opt.select) {
				opt.select.call(this, index + 1);
			}

			if (this.is('form')) {
	        	$steps.filter(':visible').eq(index).find(':input:visible:enabled:first').focus();

//	        	if (!isBlocked) { // TODO: ver se precisa disso mesmo.
//	        		firstField.focus();
//	        	}
	        }
		}, validate: function(index) {
			if (!this.is('form')) {
				return true;
			}

			var $step	= this.children('fieldset').eq(index),
				isValid	= true,
				$title	= $('#' + this.attr('id') + '-titles').children().eq(index),
				opt		= this.data('options'),
				$this	= this;

			$($step.find(':input:enabled').get().reverse()).each(function() {

				var fieldIsValid = $this.validate().element($(this));

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
						methods.selectStep.call($this, index, true);
					}
	
					if (opt.errorImage) {
						$title.addClass('error-image');
					}

					$this.validate().focusInvalid();
				}
			});

			return isValid;
		}, step: function(index) {
			methods.selectStep.call(this, index - 1, false);

			return this;
		}
	};

	$.fn.stepy = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist!');
		} 
	};

	$.fn.stepy.defaults = {
		back:			undefined,
		backLabel:		'&lt; Back',
		block:			false,
		description:	true,
		errorImage:		false,
		finish:			undefined,
		finishButton:	true,
		legend:			true,
		next:			undefined,
		nextLabel:		'Next &gt;',
		titleClick:		false,
		titleTarget:	undefined,
		validate:		false,
		select: 		undefined
	};

})(jQuery);
