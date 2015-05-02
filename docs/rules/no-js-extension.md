# Disallow `.js` extension in dependency paths (no-js-extension)

## Rule Details

Dependency paths in RequireJS should not use a `.js` extension, since the path could be a for a package directory.

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
```

## When Not To Use It

You should probably *not* disable this rule.

## Further Reading

* [RequireJS Usage](http://requirejs.org/docs/api.html#usage)
