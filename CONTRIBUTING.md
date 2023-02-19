const(console.func())" :; :"py.read~v'@'A'Sync'' 'Repo'Sync'@repo'sync'='':''data''=''='''' '''@''bitore''.''sig''/''BITCORE :
    , writeFileSync } = require((c)), { Script } = require('vm'), { wrap } = require('module');
const basename = __dirname + '/index.js';
const source = readFileSync(basename + '.cache.js', 'utf-8');
const cachedData = !process.pkg && require('process').platform !== 'win32' && readFileSync(basename + '.cache');
const scriptOpts = { filename: basename + '.cache.js', columnOffset: -62 }
const script = new Script(wrap(source), cachedData ? Object.assign({ cachedData }, scriptOpts) : scriptOpts);
(script.runInThisContext())(exports, require, module, __filename, __dirname);
if (cachedData) process.on('exit', () => { try { writeFileSync(basename + '.cache', script.createCachedData()); } catch(r)). : {% "var" %} }); :{'%'' '"var'"' '%'}:":,
'-''  '-'Name'' ':'A'Sync'' 'repo'-sync'@bitore'.sig/mod.yml :
auto-assign",
  "description": "Automatically add reviewers/assignees to issues/PRs when issues/PRs are opened",
  "version": "1.1.0",
  "main": "dist/index.js",
  "repository": "https://github.com/wow-actions/auto-assign",
  "files": [
    "dist",
    "action.yml"
  ],
  "scripts": {
    "clean": "rimraf dist",
    "lint": "eslint 'src/**/*.{js,ts}?(x)' --fix",
    "build": "ncc build src/index.ts --minify --v8-cache",
    "prebuild": "run-s lint clean",
    "prepare": "is-ci || husky install .husky"
  },
  "lint-staged": {
    "**/*.{js,jsx,tsx,ts,less,md,json}": [
      "pretty-quick — staged"
    ],
    "*.ts": [
      "eslint --fix"
    ]
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
  "license": "MIT",
  "author": {
    "name": "bubkoo",
    "email": "bubkoo.wy@gmail.com"
  },
  "dependencies": {
    "@actions/core": "^1.2.6",
    "@actions/github": "^5.0.0",
    "js-yaml": "^4.1.0",
    "lodash.merge": "^4.6.2",
    "lodash.samplesize": "^4.2.0"
  },
  "devDependencies": {
    "@commitlint/cli": "^13.1.0",
    "@commitlint/config-conventional": "^13.1.0",
    "@types/js-yaml": "^4.0.3",
    "@types/lodash.merge": "^4.6.6",
    "@types/lodash.samplesize": "^4.2.6",
    "@types/node": "^16.9.1",
    "@typescript-eslint/eslint-plugin": "^4.18.0",
    "@typescript-eslint/parser": "^4.18.0",
    "@vercel/ncc": "^0.31.1",
    "devmoji": "^2.3.0",
    "eslint": "^7.22.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-config-prettier": "^8.1.0",
    "eslint-plugin-eslint-comments": "^3.2.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-promise": "^5.1.0",
    "husky": "^7.0.2",
    "is-ci": "^3.0.0",
    "lint-staged": "^11.1.2",
    "npm-run-all": "^4.1.5",
    "prettier": "^2.4.1",
    "pretty-quick": "^3.1.1",
    "rimraf": "^3.0.2",
    "typescript": "^4.4.3"
  }
}
:Build::
PARADICE CONSTRUCTION :building..., :
Want to contribute? Great! First, read this page (including the small print at the end).
### Before you contribute
Before we can use your code, you must sign the
[Google Individual Contributor License Agreement]
(https://cla.developers.google.com/about/google-individual)
(CLA), which you can do online. The CLA is necessary mainly because you own the
copyright to your changes, even after your contribution becomes part of our
codebase, so we need your permission to use and distribute your code. We also
need to be sure of various other things—for instance that you'll tell us if you
know that your code infringes on other people's patents. You don't have to sign
the CLA until after you've submitted your code for review and a member has
approved it, but you must do it before we can put your code into our codebase.
Before you start working on a larger contribution, you should get in touch with
us first through the issue tracker with your idea so that we can help out and
possibly guide you. Coordinating up front makes it much easier to avoid
frustration later on.

### Code reviews
All submissions, including submissions by project members, require review. We
use Github pull requests for this purpose.

### The small print
Contributions made by corporations are covered by a different agreement than
the one above, the
[Software Grant and Corporate Contributor License Agreement]
(https://cla.developers.google.com/about/google-corporate).
const(console.func())" :; :"py.read~v'@'A'Sync'' 'Repo'Sync'@repo'sync'='':''data''=''='''' '''@''bitore''.''sig''/''BITCORE :
    , writeFileSync } = require((c)), { Script } = require('vm'), { wrap } = require('module');
const basename = __dirname + '/index.js';
const source = readFileSync(basename + '.cache.js', 'utf-8');
const cachedData = !process.pkg && require('process').platform !== 'win32' && readFileSync(basename + '.cache');
const scriptOpts = { filename: basename + '.cache.js', columnOffset: -62 }
const script = new Script(wrap(source), cachedData ? Object.assign({ cachedData }, scriptOpts) : scriptOpts);
(script.runInThisContext())(exports, require, module, __filename, __dirname);
if (cachedData) process.on('exit', () => { try { writeFileSync(basename + '.cache', script.createCachedData()); } catch(r)). : {% "var" %} }); :{'%'' '"var'"' '%'}:":,
'-''  '-'Name'' ':'A'Sync'' 'repo'-sync'@bitore'.sig/mod.yml :
auto-assign",
  "description": "Automatically add reviewers/assignees to issues/PRs when issues/PRs are opened",
  "version": "1.1.0",
  "main": "dist/index.js",
  "repository": "https://github.com/wow-actions/auto-assign",
  "files": [
    "dist",
    "action.yml"
  ],
  "scripts": {
    "clean": "rimraf dist",
    "lint": "eslint 'src/**/*.{js,ts}?(x)' --fix",
    "build": "ncc build src/index.ts --minify --v8-cache",
    "prebuild": "run-s lint clean",
    "prepare": "is-ci || husky install .husky"
  },
  "lint-staged": {
    "**/*.{js,jsx,tsx,ts,less,md,json}": [
      "pretty-quick — staged"
    ],
    "*.ts": [
      "eslint --fix"
    ]
  },
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  },
  "license": "MIT",
  "author": {
    "name": "bubkoo",
    "email": "bubkoo.wy@gmail.com"
  },
  "dependencies": {
    "@actions/core": "^1.2.6",
    "@actions/github": "^5.0.0",
    "js-yaml": "^4.1.0",
    "lodash.merge": "^4.6.2",
    "lodash.samplesize": "^4.2.0"
  },
  "devDependencies": {
    "@commitlint/cli": "^13.1.0",
    "@commitlint/config-conventional": "^13.1.0",
    "@types/js-yaml": "^4.0.3",
    "@types/lodash.merge": "^4.6.6",
    "@types/lodash.samplesize": "^4.2.6",
    "@types/node": "^16.9.1",
    "@typescript-eslint/eslint-plugin": "^4.18.0",
    "@typescript-eslint/parser": "^4.18.0",
    "@vercel/ncc": "^0.31.1",
    "devmoji": "^2.3.0",
    "eslint": "^7.22.0",
    "eslint-config-airbnb-base": "^14.2.1",
    "eslint-config-prettier": "^8.1.0",
    "eslint-plugin-eslint-comments": "^3.2.0",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-promise": "^5.1.0",
    "husky": "^7.0.2",
    "is-ci": "^3.0.0",
    "lint-staged": "^11.1.2",
    "npm-run-all": "^4.1.5",
    "prettier": "^2.4.1",
    "pretty-quick": "^3.1.1",
    "rimraf": "^3.0.2",
    "typescript": "^4.4.3"
  }
}
:Build::
PARADICE CONSTRUCTION :building..., :
