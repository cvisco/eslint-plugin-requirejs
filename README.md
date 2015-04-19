[![npm][version-image]][version-url]
[![Maintenance Status][status-image]][status-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]

# eslint-plugin-requirejs

Enforce code conventions for [RequireJS](http://requirejs.org) modules with [ESLint](https://www.github.com/eslint/eslint).

This plugin is under active development, and is updated frequently. Take a look at the [CHANGELOG](CHANGELOG.md) to see what's recently been added or fixed.

## Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally, and then install the plugin (see below). It is important to note that a global instance of ESLint can only use plugins that are also installed globally. A local instance of ESLint, however, can make use of both local and global ESLint plugins.

#### Global Installation

    $ npm install -g eslint
    $ npm install -g eslint-plugin-requirejs

#### Local Installation

    $ npm install --save-dev eslint
    $ npm install --save-dev eslint-plugin-requirejs

## Configuration

Add the `plugins` section to your [config](http://eslint.org/docs/user-guide/configuring) file if not already present and specify `eslint-plugin-requirejs` as a plugin. The `eslint-plugin-` prefix may be omitted:

```json
{
  "plugins": [
    "requirejs"
  ]
}
```

Enable the rules that you would like to use, for example:

```json
{
  "rules": {
    "requirejs/no-invalid-define": 2,
    "requirejs/no-multiple-define": 2,
    "requirejs/no-named-define": 2,
    "requirejs/no-commonjs-wrapper": 2,
    "requirejs/no-object-define": 1
  }
}
```

## List of supported rules

#### Possible Errors

* [no-invalid-define](docs/rules/no-invalid-define.md): Disallow invalid module definitions
* [no-multiple-define](docs/rules/no-multiple-define.md): Disallow multiple module definitions in one file
* [no-assign-exports](docs/rules/no-assign-exports.md): Disallow assignment to `exports` when using Simplified CommonJS Wrapper

#### Stylistic Choices

* [no-object-define](docs/rules/no-object-define.md): Disallow Simple Name/Value Pairs form of `define` (off by default)
* [no-function-define](docs/rules/no-function-define.md): Disallow Simple Function form of `define` (off by default)
* [no-amd-define](docs/rules/no-amd-define.md): Disallow AMD (dependency array) form of `define` (off by default)
* [no-named-define](docs/rules/no-named-define.md): Disallow named module form of `define` (off by default)
* [no-commonjs-wrapper](docs/rules/no-commonjs-wrapper.md): Disallow use of Simplified CommonJS Wrapper (off by default)
* [no-commonjs-return](docs/rules/no-commonjs-return.md): Disallow use of `return` statement in a module definition when using Simplified CommonJS Wrapper (off by default)
* [no-commonjs-exports](docs/rules/no-commonjs-exports.md): Disallow use of `exports` in a module definition when using Simplified CommonJS Wrapper (off by default)
* [no-commonjs-module-exports](docs/rules/no-commonjs-module-exports.md): Disallow use of `module.exports` in a module definition when using Simplified CommonJS Wrapper (off by default)
* [no-dynamic-require](docs/rules/no-dynamic-require.md): Disallow use of dynamically generated paths in a `require` call (off by default)

#### Don't see the rule you're looking for?

Take a look at what's in progress for the next [milestone](https://github.com/cvisco/eslint-plugin-requirejs/milestones), or suggest a new rule by filing an [issue](https://github.com/cvisco/eslint-plugin-requirejs/issues).

## Contributing

Contributions are encouraged. There are a few ways you can help:

* **Filing issues** - if you find a bug or would like to request a new rule or enhancement, [file an issue](https://github.com/cvisco/eslint-plugin-requirejs/issues)
* **Submitting pull requests** - pick one of the open [issues](https://github.com/cvisco/eslint-plugin-requirejs/issues) to work on and submit a [pull request](https://github.com/cvisco/eslint-plugin-requirejs/pulls)

## License

eslint-plugin-requirejs is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[version-url]: https://www.npmjs.com/package/eslint-plugin-requirejs
[version-image]: https://img.shields.io/npm/v/eslint-plugin-requirejs.svg?style=flat-square

[status-url]: https://github.com/cvisco/eslint-plugin-requirejs/pulse
[status-image]: http://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square

[travis-url]: https://travis-ci.org/cvisco/eslint-plugin-requirejs
[travis-image]: http://img.shields.io/travis/cvisco/eslint-plugin-requirejs/master.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/cvisco/eslint-plugin-requirejs?branch=master
[coveralls-image]: https://img.shields.io/coveralls/cvisco/eslint-plugin-requirejs/master.svg?style=flat-square

