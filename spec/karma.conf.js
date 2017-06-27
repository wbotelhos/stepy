module.exports = function(config) {
  'use strict';

  config.set({
    autoWatch:  true,
    debug:      true,
    browsers:   ['Firefox'],
    frameworks: ['jasmine'],
    logLevel:   config.LOG_ERROR,
    port:       9876,
    reporters:  ['dots'],
    singleRun:  true,

    files: [
      '../vendor/jquery.min.js',
      '../vendor/jquery.validate.min.js',
      '../lib/*.css',
      '../lib/*.js',
      'lib/jasmine-jquery.js',
      'lib/jquery.factory.js',
      '**/*_spec.js'
    ]
  });
};
