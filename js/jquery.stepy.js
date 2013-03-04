/*!
 * jQuery Stepy - A Wizard Plugin
 * --------------------------------------------------------------
 *
 * jQuery Stepy is a plugin that generates a customizable wizard.
 *
 * Licensed under The MIT License
 *
 * @version        1.1.0
 * @since          2010-07-03
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/stepy
 *
 * --------------------------------------------------------------
 *
 *  <form>
 *    <fieldset title="Step 1">
 *      <legend>description one</legend>
 *      <!-- inputs -->
 *    </fieldset>
 *
 *    <fieldset title="Step 2">
 *      <legend>description two</legend>
 *      <!-- inputs -->
 *    </fieldset>
 *
 *    <input type="submit" class="finish" />
 *  </form>
 *
 *  $('form').stepy();
 *
 */

;(function($) {

  var methods = {
    init: function(settings) {
      return this.each(function() {
				methods.destroy.call(this);

				this.opt = $.extend({}, $.fn.stepy.defaults, settings);

        var self  = this,
        		$this = $(this).data('settings', self.opt),
          	id    = $this.attr('id');

        if (id === undefined || id == '') {
          id = 'stepy-' + $('.' + $this.attr('class')).index(this);
          $this.attr('id', id);
        }

        var $titlesWrapper = $('<ul/>', { id: id + '-titles', 'class': 'stepy-titles' });

        if (self.opt.titleTarget) {
          $(self.opt.titleTarget).html($titlesWrapper);
        } else {
          $titlesWrapper.insertBefore($this);
        }

            if (self.opt.validate) {
              jQuery.validator.setDefaults({ ignore: self.opt.ignore });

              $this.append('<div class="stepy-errors"/>');
            }

            var  $steps    = $this.children('fieldset'),
              $step    = undefined,
              $legend    = undefined,
              description  = '',
              title    = '';

            $steps.each(function(index) {
              $step = $(this);

              $step
              .addClass('step')
              .attr('id', id + '-step-' + index)
              .append('<p id="' + id + '-buttons-' + index + '" class="stepy-buttons"/>');

              $legend = $step.children('legend');

              if (!self.opt.legend) {
                $legend.hide();
              }

              description = '';

              if (self.opt.description) {
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

            var $titles  = $titlesWrapper.children();

            $titles.first().addClass('current-step');

            var $finish = $this.children('.finish');

        if (self.opt.finishButton) {
              if ($finish.length) {
                var isForm    = $this.is('form'),
                  onSubmit  = undefined;

                if (self.opt.finish && isForm) {
                  onSubmit = $this.attr('onsubmit');
                  $this.attr('onsubmit', 'return false;');
                }

                $finish.click(function(evt) {
                if (self.opt.finish && !methods.execute.call($this, self.opt.finish, $steps.length - 1)) {
                   evt.preventDefault();
                } else {
                  if (isForm) {
                    if (onSubmit) {
                      $this.attr('onsubmit', onSubmit);
                    } else {
                      $this.removeAttr('onsubmit');
                    }

                    var isSubmit = $finish.attr('type') == 'submit';

                    if (!isSubmit && (!self.opt.validate || methods.validate.call($this, $steps.length - 1))) {
                      $this.submit();
                    }
                  }
                }
                });

                $finish.appendTo($this.find('p:last'));
              } else {
                $.error(id + ': element with class name "finish" missing!');
              }
            }

            if (self.opt.titleClick) {
              $titles.click(function() {
                var  array  = $titles.filter('.current-step').attr('id').split('-'), // TODO: try keep the number in an attribute.
                  current  = parseInt(array[array.length - 1], 10),
                  clicked  = $(this).index();

                if (clicked > current) {
              if (self.opt.next && !methods.execute.call($this, self.opt.next, clicked)) {
                return false;
              }
            } else if (clicked < current) {
              if (self.opt.back && !methods.execute.call($this, self.opt.back, clicked)) {
                return false;
              }
            }

            if (clicked != current) {
              methods.step.call($this, (clicked) + 1);
            }
              });
          } else {
            $titles.css('cursor', 'default');
          }

          if (self.opt.enter) {
            $steps.delegate('input[type="text"], input[type="password"]', 'keypress', function(evt) {
              var key = (evt.keyCode ? evt.keyCode : evt.which);

              if (key == 13) {
                evt.preventDefault();

                var $buttons = $(this).parent().children('.stepy-buttons');

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
          }

          $steps.first().find(':input:visible:enabled').first().select().focus();
      });
    }, createBackButton: function(index) {
      var self  = this[0],
      		$this = this,
        	id    = this.attr('id');

          $('<a/>', { id: id + '-back-' + index, href: 'javascript:void(0);', 'class': 'button-back', html: self.opt.backLabel }).click(function() {
            if (!self.opt.back || methods.execute.call($this, self.opt.back, index - 1)) {
              methods.step.call($this, (index - 1) + 1);
            }
            }).appendTo($('#' + id + '-buttons-' + index));
    }, createNextButton: function(index) {
    	var self  = this[0],
      		$this = this,
        	id    = this.attr('id');

          $('<a/>', { id: id + '-next-' + index, href: 'javascript:void(0);', 'class': 'button-next', html: self.opt.nextLabel }).click(function() {
            if (!self.opt.next || methods.execute.call($this, self.opt.next, index + 1)) {
          methods.step.call($this, (index + 1) + 1);
            }
            }).appendTo($('#' + id + '-buttons-' + index));
		}, execute: function(callback, index) {
          var isValid = callback.call(this, index + 1);

          return isValid || isValid === undefined;
		}, step: function(index) {
			var self = this[0];

          index--;

      var $steps = this.children('fieldset');

      if (index > $steps.length - 1) {
        index = $steps.length - 1;
      }

      var max  = index;

        if (self.opt.validate) {
          var isValid = true;

          for (var i = 0; i < index; i++) {
            isValid &= methods.validate.call(this, i);

            if (self.opt.block && !isValid) {
              max = i;
              break;
            }
          }
        }

        if (self.opt.transition == 'fade') {
          var stepsCount = $steps.length;

          $steps.fadeOut(self.opt.duration, function(){
            if (--stepsCount > 0) {
              return;
            }

            $steps.eq(max).fadeIn(self.opt.duration);
          });
        } else if (self.opt.transition == 'slide') {
          var stepsCount = $steps.length;

          $steps.slideUp(self.opt.duration, function(){
            if (--stepsCount > 0) {
              return;
            }

            $steps.eq(max).slideDown(self.opt.duration);
          });
        } else {
          $steps.hide(self.opt.duration).eq(max).show(self.opt.duration);
        }

        var $titles  = $('#' + this.attr('id') + '-titles').children();

      $titles.removeClass('current-step').eq(max).addClass('current-step');

      if (this.is('form')) {
        var $fields = undefined;

            if (max == index) {
              $fields = $steps.eq(max).find(':input:enabled:visible');
            } else {
              $fields = $steps.eq(max).find('.error').select().focus();
            }

            $fields.first().select().focus();
          }

          if (self.opt.select) {
        self.opt.select.call(this, max + 1);
      }

          return this;
    }, destroy: function() {
      return $(this).each(function() {
      	var that  = $(this),
      			steps = $(this).children('fieldset').css('display', '');

      	that.children('.stepy-errors').remove();
        steps.last().find('.finish').appendTo(steps.last());
        steps.find('p.stepy-buttons').remove();
      });
    }, validate: function(index) {
      if (!this.is('form')) {
        return true;
      }

      var self = this[0],
      	$step    = this.children('fieldset').eq(index),
        isValid    = true,
        $title    = $('#' + this.attr('id') + '-titles').children().eq(index),
        $validate  = this.validate();

      $($step.find(':input:enabled').get().reverse()).each(function() {
        var fieldIsValid = $validate.element($(this));

        if (fieldIsValid === undefined) {
          fieldIsValid = true;
        }

        isValid &= fieldIsValid;

        if (isValid) {
          if (self.opt.errorImage) {
            $title.removeClass('error-image');
          }
        } else {
          if (self.opt.errorImage) {
            $title.addClass('error-image');
          }

          $validate.focusInvalid();
        }
      });

      return isValid;
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
    back         : undefined,
    backLabel    : '&lt; Back',
    block        : false,
    description  : true,
    duration     : 0,
    enter        : true,
    errorImage   : false,
    finish       : undefined,
    finishButton : true,
    ignore       : '',
    legend       : true,
    next         : undefined,
    nextLabel    : 'Next &gt;',
    select       : undefined,
    titleClick   : false,
    titleTarget  : undefined,
    transition   : 'hide',
    validate     : false
  };

})(jQuery);
