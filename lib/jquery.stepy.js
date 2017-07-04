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

        var self = $(this);

        methods._generateId.call(this);

        // Remove Validator...
        if (this.opt.validate) {
          jQuery.validator.setDefaults({ ignore: this.opt.ignore });

          self.append($('<div />', { 'class': 'stepy-errors' }));
        }

        if (this.opt.header) {
          this.header = methods._header.call(this);
        }

        this.steps = self.find('fieldset');

        var that = this;

        this.steps.each(function(index) {
          var self = $(this);

          self.addClass('stepy-step');

          if (index !== 0) {
            self.hide();
          }

          if (that.opt.header) {
            methods._createHead.call(that, this, index);
          }

          methods._stateButton.call(that, index, that.steps);
        });

        methods._bindNextButton.call(this);
        methods._bindBackButton.call(this);
        methods._bindFinishButton.call(this);

        if (this.opt.header) {
          methods._bindHeader.call(this);
        }

        if (this.opt.enter) {
          methods._bindEnter.call(this);
        }

        this.steps.first().find(':input:visible:enabled:first').trigger('select').trigger('focus');

        methods._setState.call(this, { settings: this.opt, index: 0, stepy: true });
      });
    },

    _bindBackButton: function() {
      var button = $(this).find(this.opt.backButton);

      if (!button.length) {
        return;
      }

      button.on('click.stepy', function(e) {
        e.preventDefault();

        var index = $(this).data('index') - 1;

        if (!this.opt.back || methods._execute.call(this, this.opt.back, index, this.steps.length)) {
          methods.step.call(this, index);
        }
      }.bind(this));
    },

    _bindEnter: function() {
      var that = this;

      this.steps.find('input:not(:button, :submit)').on('keypress.stepy', function(evt) {
        var key = (evt.keyCode ? evt.keyCode : evt.which);

        if (key === 13) {
          evt.preventDefault();

          var
            step    = $(this).closest('fieldset'),
            hasNext = step.next('fieldset').length;

          if (hasNext) {
            step.find('.stepy-next').trigger('click');
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

    _bindHeader: function() {
      this.heads = this.header.find('li');

      this.heads.first().addClass('stepy-active');

      if (this.opt.titleClick) {
        var that = this;

        this.heads.on('click', function() {
          methods._bindHeaderHandler.call(that, this);
        });
      } else {
        this.heads.css('cursor', 'default');
      }
    },

    _bindHeaderHandler: function(head) {
      var
        current = parseInt($(this.heads).filter('.stepy-active')[0].id.match(/\d/)[0], 10),
        clicked = parseInt(head.id.match(/\d/)[0], 10);

      if (clicked > current) {
        if (this.opt.next && !methods._execute.call(this, this.opt.next, clicked)) {
          return false;
        }
      } else if (clicked < current) {
        if (this.opt.back && !methods._execute.call(this, this.opt.back, clicked)) {
          return false;
        }
      }

      if (clicked != current) {
        methods.step.call(this, clicked);
      }
    },

    _bindNextButton: function() {
      var button = $(this).find(this.opt.nextButton);

      if (!button.length) {
        return;
      }

      button.on('click.stepy', function(e) {
        e.preventDefault();

        var index = $(this).data('index') + 1;

        if (!this.opt.next || methods._execute.call(this, this.opt.next, index, this.steps.length)) {
          methods.step.call(this, index);
        }
      }.bind(this));
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

    _description: function(step) {
      var legend = step.find('legend');

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
      if (callback === undefined) {
        return true;
      }

      var isValid = callback.call(this, index, totalSteps);

      return isValid || isValid === undefined;
    },

    _generateId: function() {
      if (this.id === undefined || this.id === '') {
        $(this).attr('id', 'stepy-' + Math.random().toString().substring(2));
      }
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

        if (isSubmit && (!this.opt.validate || methods.validate.call(this, this.steps.length - 1))) {
          this.submit();
        }
      }
    },

    _setState: function(data) {
      var self = $(this);

      self.data($.extend({}, self.data(), data));
    },

    _stateButton: function(index, steps) {
      var
        self = $(this),
        step = steps.eq(index);

      if (index === 0) {
        step.find('.stepy-back').hide();
        step.find('.stepy-next').show();
        self.find('.stepy-finish').hide();
      } else if (index === steps.length - 1) {
        step.find('.stepy-back').show();
        step.find('.stepy-next').hide();
        self.find('.stepy-finish').show();
      } else {
        step.find('.stepy-back').show();
        step.find('.stepy-next').show();
        self.find('.stepy-finish').hide();
      }
    },

    _title: function(step) {
      return $('<div />', { html: step.attr('title') || '--' });
    },

    _transition: function(max) {
      var
        from = this.steps.eq($(this).data('index')),
        to   = this.steps.eq(max);

      if (this.opt.transition === 'fade') {
        from.animate({ opacity: 0 }, this.opt.duration, function() {
          from.hide();

          to.show().animate({ opacity: 1 }, this.opt.duration);
        }.bind(this));
      } else if (this.opt.transition === 'slide') {
        var
          forward = from.index() < to.index(),
          one     = (forward ? -1 : 1) * from.outerWidth(),
          two     = (forward ? 1 : -1) * to.outerWidth(),
          three   = 0;

        from.animate({ 'margin-left': one }, this.opt.duration, function() {
          from.hide();

          to.animate({ 'margin-left': two }, 0).show().animate({ 'margin-left': three }, this.opt.duration);
        }.bind(this));
      }
    },

    destroy: function() {
      return $(this).each(function() {
        var self = $(this);

        if (self.data('stepy')) {
          var steps = self.data('stepy', false).find('fieldset').css('display', '');

          self.find('.stepy-errors').remove();
        }
      });
    },

    step: function(index) {
      var
        max   = index,
        self  = $(this),
        steps = self.find('fieldset');

      if (index > steps.length - 1) {
        index = steps.length - 1;
      }

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

      if (this.opt.transition) {
        methods._transition.call(this, max);
      } else {
        steps.hide(this.opt.duration).eq(max).show(this.opt.duration);
      }

      if (this.opt.header) {
        this.heads.removeClass('stepy-active').eq(max).addClass('stepy-active');
      }

      if (this.tagName === 'FORM') {
        var fields = steps.eq(max);

        if (max === index) {
          fields = fields.find(':input:enabled:visible');
        } else {
          fields = fields.find('.error').trigger('select').trigger('focus');
        }

        fields.first().trigger('select').trigger('focus');
      }

      if (this.opt.select) {
        this.opt.select.call(this, max + 1, steps.length);
      }

      methods._stateButton.call(this, max, steps);
      methods._setState.call(this, { index: max });

      return self;
    },

    validate: function(index) {
      var self = $(this);

      if (!this.tagName === 'FORM') {
        return true;
      }

      var
        that      = this,
        step      = self.find('fieldset').eq(index),
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
    back:          undefined,
    backButton:    '.stepy-back',
    block:         false,
    description:   true,
    duration:      0,
    enter:         true,
    errorImage:    false,
    finish:        undefined,
    finishButton:  undefined,
    globalButtons: false,
    header:        true,
    ignore:        '',
    legend:        true,
    next:          undefined,
    nextButton:    '.stepy-next',
    select:        undefined,
    titleClick:    false,
    titleTarget:   undefined,
    transition:    undefined,
    validate:      false
  };

})(jQuery);
