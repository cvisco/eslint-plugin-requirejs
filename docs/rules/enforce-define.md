# Require that all files be wrapped in a `define` call (enforce-define)


## Rule Details

This rule aims to enforce consistency in a project by requiring that all JavaScript files be wrapped in a call to `define`. It will warn if it encounters an expression other than `define` in the body of the program.

### Options

This rule takes one option, which can be a string representing a filename to ignore, or an array of strings, to ignore multiple filenames. This is useful to prevent this rule from warning in your app's main file, for example.

```json
    "requirejs/enforce-define": [2, "main.js"]
    "requirejs/enforce-define": [2, ["main.js", "app.js"]]
```

#### With no ignored filename(s):

The following pattern is considered a warning:

```js
// main.js
require(['foo', 'bar'], function (foo, bar) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
// some_module.js
define(['baz'], function (baz) {
    /* ... */
});
```

#### With options [2, "main.js"]:

The following pattern is considered a warning:

```js
// some_module.js
require(['foo', 'bar'], function (foo, bar) {
    /* ... */
});
```

The following patterns are not considered warnings:

```js
// main.js
require(['foo', 'bar'], function (foo, bar) {
    /* ... */
});

// some_module.js
define(['baz'], function (baz) {
    /* ... */
});
```

## When Not To Use It

If you wish you to allow files in your project that are not wrapped in a `define`, then it is safe to disable this rule.

## Further Reading

* [Define a Module](http://requirejs.org/docs/api.html#define)
