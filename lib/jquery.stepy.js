/*!
 * jQuery Stepy - A Wizard Plugin
 *
 * The MIT License
 *
 * @author:  Washington Botelho
 * @doc:     wbotelhos.com/stepy
 * @version: 1.1.0
 *
 */

;(function($) {
  'use strict';

  var methods = {
    init: function(settings) {
      return this.each(function() {
        methods.destroy.call(this);

        this.opt = $.extend({}, $.fn.stepy.defaults, settings);

        var
          self = $(this),
          id   = this.id;

        if (id === undefined || id === '') {
          var id = methods._hash.call(this);

          self.attr('id', id);
        }

        // Remove Validator...
        if (this.opt.validate) {
          jQuery.validator.setDefaults({ ignore: this.opt.ignore });

          self.append($('<div />', { 'class': 'stepy-errors' }));
        }

        if (this.opt.header) {
          this.header = methods._header.call(this);
        }

        this.steps = self.children('fieldset');

        var that = this;

        this.steps.each(function(index) {
          $(this).addClass('stepy-step');

          if (that.opt.header) {
            methods._createHead.call(that, this, index);
          }

          methods._createButtons.call(that, this, index);
        });

        methods._bindFinishButton.call(this);

        if (this.opt.header) {
          this.heads = this.header.children('li');

          this.heads.first().addClass('stepy-active');

          if (this.opt.titleClick) {
            this.heads.click(function() {
              var
                array   = that.heads.filter('.stepy-active').attr('id').split('-'), // TODO: try keep the number in an attribute.
                current = parseInt(array[array.length - 1], 10),
                clicked = $(this).index();

              if (clicked > current) {
                if (that.opt.next && !methods._execute.call(self, that.opt.next, clicked)) {
                  return false;
                }
              } else if (clicked < current) {
                if (that.opt.back && !methods._execute.call(self, that.opt.back, clicked)) {
                  return false;
                }
              }

              if (clicked != current) {
                methods.step.call(that, (clicked) + 1);
              }
            });
          } else {
            that.heads.css('cursor', 'default');
          }
        }

        if (that.opt.enter) {
          methods._bindEnter.call(that);
        }

        that.steps.first().find(':input:visible:enabled').first().select().focus();

        self.data({ 'settings': this.opt, 'stepy': true });
      });
    },

    _bindEnter: function() {
      var that = this;

      this.steps.delegate(':text, :password', 'keypress', function(evt) {
        var key = (evt.keyCode ? evt.keyCode : evt.which);

        if (key == 13) {
          evt.preventDefault();

          var next = $(this).closest('fieldset').find('.stepy-next');

          if (next.length) {
            next.trigger('click');
          } else if (that.finishButton) {
            that.finishButton.trigger('click');
          }
        }
      });
    },

    _bindFinishButton: function() {
      this.finishButton = $(this).find('.stepy-finish');

      if (!this.finishButton.length) {
        return $.error('submit button ".stepy-finish" missing.');
      }

      this.finishButton.hide().on('click.stepy', methods._onFinishButton.bind(this));
    },

    _createBackButton: function(step, index) {
      var attributes = { href: 'javascript:void(0);', 'class': 'stepy-back', html: this.opt.backLabel };

      $('<a />', attributes).on('click.stepy', function(e) {
        e.preventDefault();

        if (!this.opt.back || methods._execute.call(this, this.opt.back, index - 1, this.steps.length)) {
          methods.step.call(this, (index - 1) + 1);
        }
      }.bind(this)).appendTo(step);
    },

    _createButtons: function(step, index) {
      if (index === 0) {
        if (this.steps.length > 1) {
          methods._createNextButton.call(this, step, index);
        }
      } else {
        $(step).hide();

        methods._createBackButton.call(this, step, index);

        if (index < this.steps.length - 1) {
          methods._createNextButton.call(this, step, index);
        }
      }
    },

    _createHead: function(step, index) {
      var
        step = $(step).attr('id', this.id + '-step-' + index),
        head = methods._head.call(this, index);

      head.append(methods._title.call(this, step));

      if (this.opt.description) {
        head.append(methods._description.call(this, step));
      }

      this.header.append(head);
    },

    _createNextButton: function(step, index) {
      var attributes = { href: 'javascript:void(0);', 'class': 'stepy-next', html: this.opt.nextLabel };

      $('<a />', attributes).on('click.stepy', function(e) {
        e.preventDefault();

        if (!this.opt.next || methods._execute.call(this, this.opt.next, index + 1, this.steps.length)) {
          methods.step.call(this, (index + 1) + 1);
        }
      }.bind(this)).appendTo(step);
    },

    _description: function(step) {
      var legend = step.children('legend');

      if (!this.opt.legend) {
        legend.hide();
      }

      if (legend.length) {
        return $('<span />', { html: legend.html() });
      }

      methods._error.call(this, '<legend /> element missing!');
    },

    _error: function(message) {
      $(this).html(message);

      $.error(message);
    },

    _execute: function(callback, index, totalSteps) {
      var isValid = callback.call(this, index + 1, totalSteps);

      return isValid || isValid === undefined;
    },

    _hash: function() {
      this.hash = 'stepy-' + Math.random().toString().substring(2)

      return this.hash;
    },

    _head: function(index) {
      return $('<li />', { id: this.id + '-head-' + index });
    },

    _header: function() {
      var header = $('<ul />', { id: this.id + '-header', 'class': 'stepy-header' });

      if (this.opt.titleTarget) {
        header.appendTo(this.opt.titleTarget);
      } else {
        header.insertBefore(this);
      }

      return header;
    },

    _onFinishButton: function(evt) {
      var onSubmit = undefined;

      if (this.tagName === 'FORM') {
        onSubmit = this.getAttribute('onsubmit');

        this.setAttribute('onsubmit', 'return false;');
      }

      if (!methods._execute.call(this, this.opt.finish, this.steps.length - 1)) {
        evt.preventDefault();
      } else if (this.tagName === 'FORM') {
        if (onSubmit) {
          this.setAttribute('onsubmit', onSubmit);
        } else {
          this.removeAttribute('onsubmit');
        }

        var isSubmit = this.finishButton.attr('type') === 'submit';

        if (!isSubmit && (!this.opt.validate || methods.validate.call(this, this.steps.length - 1))) {
          this.submit();
        }
      }
    },

    _title: function(step) {
      return $('<div />', { html: step.attr('title') || '--' });
    },

    destroy: function() {
      return $(this).each(function() {
        var self = $(this);

        if (self.data('stepy')) {
          var steps = self.data('stepy', false).children('fieldset').css('display', '');

          self.children('.stepy-errors').remove();
        }
      });
    },

    step: function(index) {
      var self = $(this);

      index--;

      var steps = self.children('fieldset');

      if (index > steps.length - 1) {
        index = steps.length - 1;
      }

      var max = index;

      if (this.opt.validate) {
        var isValid = true;

        for (var i = 0; i < index; i++) {
          isValid &= methods.validate.call(this, i);

          if (this.opt.block && !isValid) {
            max = i;
            break;
          }
        }
      }

      if (this.opt.transition == 'fade') {
        steps.fadeOut(this.opt.duration, function() {
          if (--steps.length > 0) {
            return;
          }

          steps.eq(max).fadeIn(this.opt.duration);
        });
      } else if (this.opt.transition == 'slide') {
        steps.slideUp(this.opt.duration, function() {
          if (--steps.length > 0) {
            return;
          }

          steps.eq(max).slideDown(this.opt.duration);
        });
      } else {
        steps.hide(this.opt.duration).eq(max).show(this.opt.duration);
      }

      if (this.opt.header) {
        this.heads.removeClass('stepy-active').eq(max).addClass('stepy-active');
      }

      if (this.tagName === 'FORM') {
        var $fields = undefined;

        if (max == index) {
          $fields = steps.eq(max).find(':input:enabled:visible');
        } else {
          $fields = steps.eq(max).find('.error').select().focus();
        }

        $fields.first().select().focus();
      }

      if (this.opt.select) {
        this.opt.select.call(this, max + 1, steps.length);
      }

      if (methods._isLastStep.call(this, index, steps)) {
        self.find('.stepy-finish').show();
      } else {
        self.find('.stepy-finish').hide();
      }

      return self;
    },

    _isLastStep: function(index, steps) {
      return index === steps.length - 1;
    },

    validate: function(index) {
      var self = $(this);

      if (!this.tagName === 'FORM') {
        return true;
      }

      var
        that      = this,
        step      = self.children('fieldset').eq(index),
        isValid   = true,
        $title    = $('#' + this.id + '-header').children().eq(index),
        $validate = self.validate();

      $(step.find(':input:enabled').get().reverse()).each(function() {
        var fieldIsValid = $validate.element($(this));

        if (fieldIsValid === undefined) {
          fieldIsValid = true;
        }

        isValid &= fieldIsValid;

        if (isValid) {
          if (that.opt.errorImage) {
            $title.removeClass('stepy-error');
          }
        } else {
          if (that.opt.errorImage) {
            $title.addClass('stepy-error');
          }

          $validate.focusInvalid();
        }
      });

      return isValid;
    }
  };

  $.fn.stepy = function(method) {
    if (methods[method]) {
      return methods[method].apply($(this)[0], Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist!');
    }
  };

  $.fn.stepy.defaults = {
    back:         undefined,
    backLabel:    '&lt; Back',
    block:        false,
    description:  true,
    duration:     undefined, // TODO: set default duration to avoid error on fade
    enter:        true,
    errorImage:   false,
    finish:       undefined,
    finishButton: undefined,
    header:       true,
    ignore:       '',
    legend:       true,
    next:         undefined,
    nextLabel:    'Next &gt;',
    select:       undefined,
    titleClick:   false,
    titleTarget:  undefined,
    transition:   undefined,
    validate:     false
  };

})(jQuery);
