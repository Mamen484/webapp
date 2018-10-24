// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'intl-shim'],
    plugins: [
        require("karma-intl-shim"),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-chrome-launcher'),
      require('karma-safari-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
      files: [
          './node_modules/intl/locale-data/jsonp/fr.js',
          './node_modules/intl/locale-data/jsonp/it.js',
          './node_modules/intl/locale-data/jsonp/es.js',
          './node_modules/intl/locale-data/jsonp/de.js',
          './node_modules/intl/locale-data/jsonp/en-AU.js',
          './node_modules/intl/locale-data/jsonp/en-US.js',
          './node_modules/intl/locale-data/jsonp/en-GB.js',
          './node_modules/intl/locale-data/jsonp/en-CA.js',
          './node_modules/intl/locale-data/jsonp/en-IN.js',
          './node_modules/intl/locale-data/jsonp/pt-BR.js',
      ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
