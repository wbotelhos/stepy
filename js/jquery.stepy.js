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

        var self = this,
            that = $(this),
            id   = that.attr('id');

        if (id === undefined || id === '') {
          var id = methods._hash.call(this);

          that.attr('id', id);
        }

        if (self.opt.validate) {
          jQuery.validator.setDefaults({ ignore: self.opt.ignore });

          that.append('<div class="stepy-errors" />');
        }

        var header = methods._header.call(this),
            steps  = that.children('fieldset');

        steps.each(function(index) {
          var step = $(this).attr('id', id + '-step-' + index).addClass('stepy-step'),
               head = methods._head.call(self, index);

          head.append(methods._title.call(self, step));

          if (self.opt.description) {
            head.append(methods._description.call(self, step));
          }

          header.append(head);

          var nav = methods._navigator.call(self).appendTo(step);

          if (index == 0) {
            if (steps.length > 1) {
              methods._createNextButton.call(self, nav, index);
            }
          } else {
            methods._createBackButton.call(self, nav, index);

            step.hide();

            if (index < steps.length - 1) {
              methods._createNextButton.call(self, nav, index);
            }
          }
        });

            var $titles  = header.children();

            $titles.first().addClass('current-step');

            var $finish = that.children('.finish');

        if (self.opt.finishButton) {
              if ($finish.length) {
                var isForm    = that.is('form'),
                  onSubmit  = undefined;

                if (self.opt.finish && isForm) {
                  onSubmit = that.attr('onsubmit');
                  that.attr('onsubmit', 'return false;');
                }

                $finish.click(function(evt) {
                if (self.opt.finish && !methods._execute.call(that, self.opt.finish, steps.length - 1)) {
                   evt.preventDefault();
                } else {
                  if (isForm) {
                    if (onSubmit) {
                      that.attr('onsubmit', onSubmit);
                    } else {
                      that.removeAttr('onsubmit');
                    }

                    var isSubmit = $finish.attr('type') == 'submit';

                    if (!isSubmit && (!self.opt.validate || methods.validate.call(that, steps.length - 1))) {
                      that.submit();
                    }
                  }
                }
                });

                $finish.appendTo(that.find('p:last'));
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
              if (self.opt.next && !methods._execute.call(that, self.opt.next, clicked)) {
                return false;
              }
            } else if (clicked < current) {
              if (self.opt.back && !methods._execute.call(that, self.opt.back, clicked)) {
                return false;
              }
            }

            if (clicked != current) {
              methods.step.call(self, (clicked) + 1);
            }
              });
          } else {
            $titles.css('cursor', 'default');
          }

          if (self.opt.enter) {
            steps.delegate('input[type="text"], input[type="password"]', 'keypress', function(evt) {
              var key = (evt.keyCode ? evt.keyCode : evt.which);

              if (key == 13) {
                evt.preventDefault();

                var $buttons = $(this).parent().children('.stepy-navigator');

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

          steps.first().find(':input:visible:enabled').first().select().focus();

        that.data({ 'settings': this.opt, 'stepy': true });
      });
    }, _createBackButton: function(nav, index) {
      var self       = this,
          that       = $(this),
          id         = that.attr('id') + '-back-' + index,
          attributes = { id: id, href: 'javascript:void(0);', 'class': 'button-back', html: self.opt.backLabel };

      $('<a />', attributes).on('click.stepy', function() {
        if (!self.opt.back || methods._execute.call(self, self.opt.back, index - 1)) {
          methods.step.call(self, (index - 1) + 1);
        }
      }).appendTo(nav);
    }, _createNextButton: function(nav, index) {
      var self       = this,
          that       = $(this),
          id         = that.attr('id') + '-next-' + index,
          attributes = { id: id, href: 'javascript:void(0);', 'class': 'button-next', html: self.opt.nextLabel };

      $('<a/>', attributes).on('click.stepy', function() {
        if (!self.opt.next || methods._execute.call(that, self.opt.next, index + 1)) {
          methods.step.call(self, (index + 1) + 1);
        }
      }).appendTo(nav);
    }, _description: function(step) {
      var legend = step.children('legend');

      if (!this.opt.legend) {
        legend.hide();
      }

      if (legend.length) {
        return $('<span />', { html: legend.html() });
      }

      methods._error.call(this, '<legend /> element missing!');
    }, _error: function(message) {
      $(this).html(message);

      $.error(message);
    }, _execute: function(callback, index) {
      var isValid = callback.call(this, index + 1);

      return isValid || isValid === undefined;
    }, _hash: function() {
      this.hash = 'stepy-' + Math.random().toString().substring(2)

      return this.hash;
    }, _head: function(index) {
      return $('<li />', { id: $(this).attr('id') + '-head-' + index });
    }, _header: function() {
      var header = $('<ul />', { id: $(this).attr('id') + '-header', 'class': 'stepy-header' });

      if (this.opt.titleTarget) {
        header.appendTo(this.opt.titleTarget);
      } else {
        header.insertBefore(this);
      }

      return header;
    }, _navigator: function(index) {
      return $('<p />', { id: $(this).attr('id') + '-navigator-' + index, 'class': 'stepy-navigator' });
    }, _title: function(step) {
      return $('<div />', { html: step.attr('title') || '--' });
    }, destroy: function() {
      return $(this).each(function() {
        var that  = $(this).data('stepy', false),
            steps = that.children('fieldset').css('display', '');

        that.children('.stepy-errors').remove();
        steps.last().find('.finish').appendTo(steps.last());
        steps.find('p.stepy-navigator').remove();
      });
    }, step: function(index) {
      var self = this
      		that = $(this),
          opt  = that[0].opt;

      index--;

			var steps = that.children('fieldset');

      if (index > steps.length - 1) {
        index = steps.length - 1;
      }

      var max = index;

      if (opt.validate) {
        var isValid = true;

        for (var i = 0; i < index; i++) {
          isValid &= methods.validate.call(this, i);

          if (opt.block && !isValid) {
            max = i;
            break;
          }
        }
      }

        if (opt.transition == 'fade') {
          var stepsCount = steps.length;

          steps.fadeOut(opt.duration, function(){
            if (--stepsCount > 0) {
              return;
            }

            steps.eq(max).fadeIn(opt.duration);
          });
        } else if (opt.transition == 'slide') {
          var stepsCount = steps.length;

          steps.slideUp(opt.duration, function(){
            if (--stepsCount > 0) {
              return;
            }

            steps.eq(max).slideDown(opt.duration);
          });
        } else {
          steps.hide(opt.duration).eq(max).show(opt.duration);
        }

        var $titles  = $('#' + that.attr('id') + '-header').children();

      $titles.removeClass('current-step').eq(max).addClass('current-step');

      if (that.is('form')) {
        var $fields = undefined;

            if (max == index) {
              $fields = steps.eq(max).find(':input:enabled:visible');
            } else {
              $fields = steps.eq(max).find('.error').select().focus();
            }

            $fields.first().select().focus();
          }

          if (opt.select) {
        opt.select.call(this, max + 1);
      }

          return that;
    }, validate: function(index) {
    	var that = $(this);

      if (!that.is('form')) {
        return true;
      }

      var self = this,
        step    = that.children('fieldset').eq(index),
        isValid    = true,
        $title    = $('#' + that.attr('id') + '-header').children().eq(index),
        $validate  = that.validate();

      $(step.find(':input:enabled').get().reverse()).each(function() {
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
