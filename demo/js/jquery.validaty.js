/*!
 * jQuery Validaty - A Validation Plugin
 *
 * The MIT License
 *
 * @author  Washington Botelho
 * @doc     wbotelhos.com/validaty
 * @version 0.5.0
 */

;(function($) {
  'use strict';

  var
    helper  = {},
    methods = {};

  methods.init = function(settings) {
    return this.each(function() {
      methods.destroy.call(this);

      this.opt = $.extend({}, $.fn.validaty.defaults, settings);

      var self = $(this).addClass('validaty');

      methods._bind.call(this);

      self.data({ settings: this.opt, validaty: true });
    });
  };

  methods._bind = function() {
    var that = this;

    that.inputs = methods._fields.call(that);

    $(this).on('submit.validaty', function(evt) {
      methods._process.call(that, that.inputs, evt);
    });

    for (var i = 0; i < that.inputs.length; i++) {
      var
        field   = that.inputs[i],
        actions = helper.getParams(field).actions;

      methods._setHash.call(that, field);

      field = $(field);

      for (var index in actions) {
        var binds = actions[index].args.join('.validaty ') + '.validaty';

        field.on(binds, function(evt, forced) {
          if (!forced) {
            methods._process.call(that, [this], evt);
          }
        });
      }
    }
  };

  methods._balloon = function(result) {
    var
      offset     = result.el.offset(),
      html       = '<ul></ul>',
      attributes = { id: result.el[0].hash, 'class': 'validaty-message' };

    if (this.opt.balloon) {
      html               += '<div></div>';
      attributes['class'] = 'validaty-balloon';
      attributes['css']   = { top: offset.top, left: offset.left + result.el.outerWidth() - 15 };
    }

    attributes['html'] = html;

    var message = $('<div />', attributes);

    if (this.opt.errorTarget) {
      this.opt.errorTarget.call(this, result.el, message);
    } else {
      message.insertAfter(result.el[0]);
    }

    return message;
  };

  methods._clear = function(field) {
    $('#' + field.hash).remove();

    $(field).removeClass('invalid valid');
  };

  methods._display = function(result) {
    var balloon = methods._balloon.call(this, result);

    methods._writeBalloon.call(this, balloon, result);
    methods._showBalloon.call(this, balloon);
  };

  methods._distinct = function(fields) {
    var
      names    = [],
      distinct = [],
      inputs   = this.opt.balloon ? fields : $($(fields).get().reverse());

    for (var i = 0; i < inputs.length; i++) {
      if (helper.isCheckable(inputs[i])) {
        if ($.inArray(inputs[i].name, names) === -1) {
          names.push(inputs[i].name);
          distinct.push(inputs[i]);
        }
      } else {
        distinct.push(inputs[i]);
      }
    }

    return distinct;
  };

  methods._fade = function() {
    var
      that     = this,
      balloons = $(that).children(that.opt.balloon ? '.validaty-balloon' : '.validaty-message');

    if (balloons.length > 1) {
      balloons.on('mouseenter.validaty', function() {
        var
          overed = this,
          other  = balloons.filter(function() {
            return this !== overed;
          });

        other.animate({ opacity: .2 }, { duration: that.opt.fadeSpeed, queue: false });
      }).on('mouseleave.validaty', function() {
        balloons.animate({ opacity: 1 }, { duration: that.opt.fadeSpeed, queue: false });
      });
    }
  };

  methods._fields = function() {
    var
      self   = $(this),
      fields = self.is('form') ? $(this).find(':input') : self;

    return fields.not(this.opt.ignore);
  }

  methods._format = function(message, args) {
    message = message || 'Message type missing!';

    var holders = message.match(/{[^}]*}/g);

    if (holders) {
      for (var i = 0; i < holders.length; i++) {
        if (i == args.length) {
          break;
        }

        message = message.replace(holders[i], args[i]);
      }
    }

    return message;
  };

  methods._highlight = function(result) {
    var inputs = result.el;

    if (helper.isCheckable(result.el[0])) {
      inputs = $(this).find('[name="' + result.el.attr('name') + '"]');
    }

    inputs.addClass(result.fail.length ? 'invalid' : 'valid')
  };

  methods._message = function(field, validator, args) {
    var message = validator.message;

    if (typeof validator.message === 'object') {
      if (field.is('input')) {
        message = validator.message[field.attr('type')];
      } else if (field.is('select')) {
        message = validator.message.select;
      } else if (field.is('textarea')) {
        message = validator.message.textarea;
      }
    }

    return methods._format.call(this, message, args);
  };

  methods._process = function(fields, evt) {
    fields = (fields && fields.length && fields) || this.inputs;

    var
      distinct = methods._distinct.call(this, fields),
      that     = this,
      submit   = evt && evt.type === 'submit';

    $.each(fields, function() {
      methods._clear.call(that, this);
    });

    $.each(distinct, function() {
      var result = methods._validate.call(that, this);

      if (result.fail.length > 0) {
        if (submit) {
          evt.preventDefault();
        }

        methods._display.call(that, result);
      }

      methods._highlight.call(that, result);
    });

    if (this.opt.focus && submit) {
      var forced = true;

      $(this).find('.invalid:visible:' + this.opt.focus).trigger('focus', forced);
    }

    if (this.opt.fade) {
      methods._fade.call(this);
    }

    var valid = !$(fields).filter('.invalid').length;

    $(this).data('valid', valid);

    if (valid && this.opt.onValid) {
      this.opt.onValid.call(this, fields, evt);
    }
  };

  methods._setHash = function(field) {
    field.hash = 'validaty-' + Math.random().toString().substring(2)
  };

  methods._showBalloon = function(balloon) {
    var position = balloon.offset().top - balloon.height();

    if (this.opt.balloon) {
      balloon.css({ top: position })
    }

    balloon.animate({ opacity: 1 });
  };

  methods._writeBalloon = function(balloon, result) {
    var ul = balloon.children('ul');

    $.each(result.fail, function() {
      $('<li />', { text: this.message }).appendTo(ul);
    });
  };

  methods._validate = function(input) {
    var
      that        = this,
      validations = helper.getParams(input).validations;

    input = $(input);

    var result = { el: input, pass: [], fail: [] };

    for (var i = 0; i < validations.length; i++) {
      var
        name      = validations[i].name,
        validator = that.opt.validators[name];

      if (!validator) {
        $.error('Validator "' + name + '" not registered!');
      }

      var
        args    = validations[i].args,
        valid   = validator.validate.apply(input, [helper, that].concat(args)),
        message = methods._message.call(that, input, validator, args);

      result[valid ? 'pass' : 'fail'].push({ type: name, message: message });
    }

    return result;
  };

  methods.destroy = function() {
    return $(this).each(function() {
      $(this).off('.validaty').removeClass('validaty');
    });
  };

  methods.helper = function(name) {
    return helper;
  };

  methods.valid = function() {
    return $(this).data('valid');
  };

  methods.validate = function(fields) {
    return this.each(function() {
      methods._process.call(this, [].concat.apply([], fields));
    });
  };

  methods.validator = function(name) {
    return $.fn.validaty.defaults.validators[name] || $.error('Validator "' + name + '" not registered!');
  };

  helper.contains = function(value, word) {
    return value.indexOf(word) !== -1;
  };

  helper.getParams = function(input) {
    var
      data   = $(input).attr('data-validaty'),
      params = { validations: [], actions: [] };

    if (data) {
      var items = data.split(/\s+/);

      for (var i = 0; i < items.length; i++) {
        var args     = $(items[i].split(':')).get().reverse(),
          name     = args.pop(),
          isAction = /^on/.test(name);

        args = $(args).get().reverse();

        if (!isAction) {
          for (var j = 0; j < args.length; j++) {
            if (isNaN(args[j])) {
              args[j] = args[j].replace('%20', ' ');
            } else if (name !== 'equal') {
              args[j] = parseInt(args[j]);
            }
          }
        }

        params[isAction ? 'actions' : 'validations'].push({ name: name, args: args });
      }
    }

    return params;
  };

  helper.isCheckable = function(input) {
    return /checkbox|radio/i.test(input.type);
  };

  helper.isDateISO = function(value) {
    return /^(\d{4})\-(0[1-9]|1[0-2])\-([12]\d|0[1-9]|3[01])$/.test(value);
  };

  helper.isDigits = function(value) {
    return /^\d+$/.test(value);
  };

  helper.isEmail = function(value) {
    return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(value);
  };

  helper.isNumber = function(value) {
    return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  };

  helper.isUrl = function(value) {
    return /^(https?|s?ftp|git):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
  };

  helper.isUsername = function(value) {
    return /^[a-zA-Z0-9]+(_?[a-zA-Z0-9]+)*$/i.test(value);
  };

  $.fn.validaty = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist!');
    }
  };

  $.fn.validaty.defaults = {
    balloon:     true,
    errorTarget: undefined,
    fade:        true,
    fadeSpeed:   200,
    focus:       'first',
    ignore:      ':submit, :reset, :image, :disabled',
    onValid:     undefined,
    validators:  {}
  };

  $.validaty = {
    register: function() {
      $.fn.validaty.defaults.validators[arguments[0]] = { message: arguments[1], validate: arguments[2] };

      return this;
    }
  };

})(jQuery);
