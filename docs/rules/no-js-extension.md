# Disallow `.js` extension in dependency paths (no-js-extension)

## Rule Details

Dependency paths in RequireJS should not use a `.js` extension, since the path could be a for a package directory. Extensions may only be used in combination with a plugin prefix.

### Options

This rule takes one argument, an array of strings where each string represents a plugin prefix. All paths starting with some of the listed plugin prefixes will be also checked for a missing `.js` extension. All other paths with unknown plugin prefixes will be skipped.

By default, paths with a plugin prefix are not checked.

#### With no argument

The following patterns are considered warnings:

```js
require(['foo.js'], function (foo) {
    /* ... */
});

define(['foo.js'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('foo.js');
    /* ... */
});
```

The following patterns are not warnings:

```js
require(['foo'], function (foo) {
    /* ... */
});

define(['foo'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('foo');
    /* ... */
});

require(['pluginname!foo'], function (foo) {
    /* ... */
});

define(['pluginname!foo'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('pluginname!foo');
    /* ... */
});
```

#### With options `[2, [ "first", "second", "third" ]]`

The following patterns are considered warnings:

```js
require(['first!foo.js'], function (foo) {
    /* ... */
});

define(['second!foo.js'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('third!foo.js');
    /* ... */
});
```

The following patterns are not warnings:

```js
require(['unknownplugin!foo.js'], function (foo) {
    /* ... */
});

define(['anotherunknownplugin!foo.js'], function (foo) {
    /* ... */
});

define(function (require) {
    var foo = require('foo');
    /* ... */
});
```

## When Not To Use It

You should probably *not* disable this rule.

## Further Reading

* [RequireJS Usage](http://requirejs.org/docs/api.html#usage)
