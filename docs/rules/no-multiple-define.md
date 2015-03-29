# Disallow multiple module definitions in one file (no-multiple-define)

Due to how RequireJS' lookup algorithm works, only one module should be defined per file.

## Rule Details

This rule aims to prevent definition of multiple modules in one file.

The following pattern is considered a warning:

```js
// MyModule.js
define('MyModule/first', ['path/to/foo'], function (foo) {
    /* ... */
});

define('MyModule/second', ['path/to/bar'], function (bar) {
    /* ... */
});
```

## When Not To Use It

You should probably *not* disable this rule.

## Further Reading

* [RequireJS Module Notes](http://requirejs.org/docs/api.html#modulenotes)

## Related Rules

* [no-invalid-define](no-invalid-define.md)
* [no-object-define](no-object-define.md)
* [no-function-define](no-function-define.md)
* [no-amd-define](no-amd-define.md)
* [no-named-define](no-named-define.md)
* [no-commonjs-wrapper](no-commonjs-wrapper.md)

