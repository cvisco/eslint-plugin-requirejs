# Ensure AMD callbacks have correct number of parameters (amd-function-arity)


## Rule Details

This rule aims to ensure that AMD callbacks have the correct number of parameters in order to avoid confusion and maintainability issues.

### Options

This rule takes one option, an object with the key `allowExtraDependencies`. This can either have a Boolean value (default is `false`) or be an array of named allowed dependency paths as strings.

```json
    "requirejs/amd-function-arity": [2, { "allowExtraDependencies": true }]
```


```json
    "requirejs/amd-function-arity": [2, { "allowExtraDependencies": ["a", "b"] }]
```


#### Without allowing extra dependencies

The following patterns are considered warnings:

```js
/* eslint requirejs/amd-function-arity: [2, { "allowExtraDependencies": false }] */

define(["a", "b"], function (a, b, c) {
    // ...
});

define(["a", "b"], function (a) {
    // ...
});

define("my-module", ["a", "b"], function (a, b, c) {
    // ...
});

define("my-module", ["a", "b"], function (a) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

require(["a", "b"], function (a) {
    // ...
}, function (err) { });

require("a", function () {
    // ...
});

require("a", function (a, b) {
    // ...
});

requirejs(["a", "b"], function (a, b, c) {
    // ...
});

requirejs(["a", "b"], function (a) {
    // ...
});

requirejs(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

requirejs(["a", "b"], function (a) {
    // ...
}, function (err) { });

requirejs("a", function () {
    // ...
});

requirejs("a", function (a, b) {
    // ...
});
```

The following patterns are not considered warnings:

```js
/* eslint requirejs/amd-function-arity: [2, { "allowExtraDependencies": false }] */

define(["a", "b"], function (a, b) {
    // ...
});

define("my-module", ["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a, b) {
    // ...
}, function (err) { });

requirejs(["a", "b"], function (a, b) {
    // ...
});

require("a", function (a) {
    // ...
});

require("a", function (a) {
    // ...
}, function (err) { });
```

#### Allowing extra dependencies

The following patterns are considered warnings:

```js
/* eslint requirejs/amd-function-arity: [2, { "allowExtraDependencies": true }] */

define(["a", "b"], function (a, b, c) {
    // ...
});

define("my-module", ["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

require("a", function (a, b) {
    // ...
});

requirejs(["a", "b"], function (a, b, c) {
    // ...
});

requirejs(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

requirejs(["a", "b"], function (a) {
    // ...
}, function (err) { });

requirejs("a", function (a, b) {
    // ...
});
```

The following patterns are not considered warnings:

```js
/* eslint requirejs/amd-function-arity: [2, { "allowExtraDependencies": false }] */

define(["a", "b"], function (a) {
    // ...
});

define(["a", "b"], function (a, b) {
    // ...
});

define("my-module", ["a", "b"], function (a) {
    // ...
});

define("my-module", ["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
});

require(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
}, function (err) { });

require(["a", "b"], function (a, b) {
    // ...
}, function (err) { });

requirejs(["a", "b"], function (a) {
    // ...
});

requirejs(["a", "b"], function (a, b) {
    // ...
});

require("a", function () {
    // ...
});

require("a", function (a) {
    // ...
});

requirejs("a", function () {
    // ...
});

requirejs("a", function (a) {
    // ...
});

require("a", function () {
    // ...
}, function (err) { });

require("a", function (a) {
    // ...
}, function (err) { });
```

#### Allowing extra named dependencies

The following patterns are considered warnings:

```js
/* eslint requirejs/amd-function-arity: [2, { "allowExtraDependencies": ["x", "y", "z"] }] */

define(["a", "b"], function (a, b, c) {
    // ...
});

define("my-module", ["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
});

require(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

require("a", function (a, b) {
    // ...
});

requirejs(["a", "b"], function (a, b, c) {
    // ...
});

requirejs(["a", "b"], function (a, b, c) {
    // ...
}, function (err) { });

requirejs(["a", "b"], function (a) {
    // ...
}, function (err) { });

requirejs("a", function (a, b) {
    // ...
});
```

The following patterns are not considered warnings:

```js
/* eslint requirejs/amd-function-arity: [2, { "allowExtraDependencies": ["a", "b"] }] */

define(["a", "b"], function (a) {
    // ...
});

define(["a", "b"], function (a, b) {
    // ...
});

define("my-module", ["a", "b"], function (a) {
    // ...
});

define("my-module", ["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
});

require(["a", "b"], function (a, b) {
    // ...
});

require(["a", "b"], function (a) {
    // ...
}, function (err) { });

require(["a", "b"], function (a, b) {
    // ...
}, function (err) { });

requirejs(["a", "b"], function (a) {
    // ...
});

requirejs(["a", "b"], function (a, b) {
    // ...
});

require("a", function () {
    // ...
});

require("a", function (a) {
    // ...
});

requirejs("a", function () {
    // ...
});

requirejs("a", function (a) {
    // ...
});

require("a", function () {
    // ...
}, function (err) { });

require("a", function (a) {
    // ...
}, function (err) { });
```

## When Not To Use It

If you do not care about potential errors from using extra (undefined) callback parameters and do not care about requiring dependencies for side effects only, you can disable this rule.

## Further Reading

* [Define a Module](http://requirejs.org/docs/api.html#define)
