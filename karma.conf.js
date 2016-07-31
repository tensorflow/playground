'use strict';

module.exports = function(karma) {
  karma.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: ['browserify', 'jasmine'],

    files: [
      {pattern: 'playground.ts', included: false},
      {pattern: '*.spec.ts', included: true}
    ],

    preprocessors: {
      '**/*.ts': ['browserify']
    },

    browsers:  ['Chrome'],

    // logLevel: 'LOG_DEBUG',

    // singleRun: true,
    autoWatch: true,

    // browserify configuration
    browserify: {
      debug: true,
      plugin: [
        ['tsify', {target: 'ES5', module: "commonjs"}]
      ]
    }
  });
};