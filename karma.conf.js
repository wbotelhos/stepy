module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch:  true,
    debug:      true,
    browsers:   ['Chrome', 'Firefox'],
    frameworks: ['jasmine', 'fixture'],
    logLevel:   config.LOG_ERROR,
    port:       9876,
    reporters:  ['dots'],
    singleRun:  true,

    files: [
      'vendor/jquery.min.js',
      'vendor/jquery.validate.min.js',

      'lib/*.css',
      'lib/*.js',

      'spec/fixtures/*.html',

      'spec/lib/jasmine-jquery.js',
      'spec/spec_helper.js',

      'spec/javascripts/**/*.js'
    ],

    preprocessors: {
      '**/*.html': ['html2js']
    }
  });
};
