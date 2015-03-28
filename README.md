# eslint-plugin-requirejs

[![Maintenance Status][status-image]][status-url] [![Build Status][travis-image]][travis-url]

Enforce code conventions for RequireJS modules with ESLint

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) either locally or globally.

    npm install eslint

If you installed `ESLint` globally, you have to install the RequireJS plugin globally too. Otherwise, install it locally.

    $ npm install eslint-plugin-requirejs

# Configuration

Add the `plugins` section to your config file and specify `eslint-plugin-requirejs` as a plugin.

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
  }
}
```

# List of supported rules

* [no-invalid-define](docs/rules/no-invalid-define.md): Disallow invalid or undesired forms of `define`

## To Do

* Split options of no-invalid-define into own rules for easier config
* no-multiple-define: Disallow multiple `define` calls in a single file
* no-exports: Disallow assignment to `exports` or `module.exports` when using CommonJS wrapper, prefer return instead
* require-return: Enforce returning a value from module definition functions

# License

eslint-plugin-requirejs is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[status-url]: https://github.com/cvisco/eslint-plugin-requirejs/pulse
[status-image]: http://img.shields.io/badge/status-maintained-brightgreen.svg?style=flat-square

[travis-url]: https://travis-ci.org/cvisco/eslint-plugin-requirejs
[travis-image]: http://img.shields.io/travis/cvisco/eslint-plugin-requirejs/master.svg?style=flat-square
