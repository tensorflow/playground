'use strict';

module.exports = function(karma) {
  karma.set({
    frameworks: ['browserify', 'jasmine'],
    files: [
      {pattern: 'playground.ts', included: false},
      {pattern: '*.spec.ts', included: true}
    ],
    preprocessors: {
      '**/*.ts': ['browserify']
    },
    browsers:  ['Chrome'],
    autoWatch: true,
    browserify: {
      debug: true,
      plugin: [
        ['tsify', {target: 'ES5', module: "commonjs"}]
      ]
    }
  });
};