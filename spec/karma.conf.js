module.exports = function(config) {
  config.set({
    autoWatch  : true,
    browsers   : ['Firefox'],
    files      : ['../vendor/jquery.min.js', '../vendor/jquery.validate.min.js', '../lib/*.css', '../lib/*.js', 'lib/*.js', '*spec.js' ],
    frameworks : ['jasmine'],
    logLevel   : config.LOG_ERROR,
    port       : 9876,
    reporters  : ['dots'],
    singleRun  : true
  });
};
