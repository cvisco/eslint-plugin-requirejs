# eslint-plugin-requirejs

[![Maintenance Status][status-image]][status-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

Enforce code conventions for RequireJS modules with ESLint

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

    npm install eslint

If you installed `ESLint` globally, you have to install the RequireJS plugin globally too. Otherwise, install it locally.

    $ npm install eslint-plugin-requirejs

# Configuration

Add the `plugins` section to your [config](http://eslint.org/docs/user-guide/configuring) file and specify `eslint-plugin-requirejs` as a plugin.

```json
{
  "plugins": [
    "requirejs"
  ]
}
```

Enable the rules that you would like to use.

```json
{
  "rules": {
    "requirejs/no-invalid-define": 2,
    "requirejs/no-multiple-define": 2,
    "requirejs/no-object-define": 1,
    "requirejs/no-function-define": 2,
    "requirejs/no-amd-define": 0,
    "requirejs/no-named-define": 2,
    "requirejs/no-commonjs-wrapper": 2
  }
}
```

# List of supported rules

* [no-invalid-define](docs/rules/no-invalid-define.md): Disallow invalid module definitions
* [no-multiple-define](docs/rules/no-multiple-define.md): Disallow multiple module definitions in one file
* [no-object-define](docs/rules/no-object-define.md): Disallow Simple Name/Value Pairs form of `define` (off by default)
* [no-function-define](docs/rules/no-function-define.md): Disallow Simple Function form of `define` (off by default)
* [no-amd-define](docs/rules/no-amd-define.md): Disallow AMD (dependency array) form of `define` (off by default)
* [no-named-define](docs/rules/no-named-define.md): Disallow named module form of `define` (off by default)
* [no-commonjs-wrapper](docs/rules/no-commonjs-wrapper.md): Disallow use of Simplified CommonJS Wrapper (off by default)

## To Do

* no-exports: Disallow assignment to `exports` or `module.exports` when using CommonJS wrapper, prefer return instead
* require-return: Enforce returning a value from module definition functions
* validate-relative: Make sure `require` is declared as a dependency if using relative dependency paths inside a module

# License

eslint-plugin-requirejs is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[status-url]: https://github.com/cvisco/eslint-plugin-requirejs/pulse
[status-image]: http://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square

[travis-url]: https://travis-ci.org/cvisco/eslint-plugin-requirejs
[travis-image]: http://img.shields.io/travis/cvisco/eslint-plugin-requirejs/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/cvisco/eslint-plugin-requirejs?branch=master
[coveralls-image]: https://img.shields.io/coveralls/cvisco/eslint-plugin-requirejs/master.svg?style=flat-square
