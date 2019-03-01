# Disallow specific amd modules (no-restricted-amd-modules)

Disallowing usage of specific AMD modules can be useful if you want to limit the available methods a developer can use. For example, you can block usage of the `module-foo` module if you want to force using a more performant module named `module-bar`.

## Rule Details

This rule allows you to specify modules that you don’t want to use in your application.

## Options

The rule takes one or more strings as options: the names of restricted modules.

```json
"no-restricted-amd-modules": ["error", "module-foo", "module-bar"]
```

It can also take an object with lists of `paths` and gitignore-style `patterns` strings.

```json
"no-restricted-amd-modules": ["error", {
    "paths": ["module-foo", "module-bar"],
    "patterns": ["module-foo/private/*", "module-bar/*", "!module-bar/good"]
}]
```

You may also specify a custom message for any paths you want to restrict as follows:

```json
"no-restricted-amd-modules": ["error",
  {
    "name": "module-foo1",
    "message": "Please use module-foo2 instead."
  },
 {
    "name": "module-bar2",
    "message": "Please use module-bar2 instead."
  }
]
```

or like this:

```json
"no-restricted-amd-modules": ["error", {
  "paths": [{
    "name": "module-foo",
    "message": "Please use module-bar instead."
  }]
}]
```

The custom message will be appended to the default error message. Please note that you may not specify custom error messages for restricted patterns as a particular module may match more than one pattern.


## Examples

Examples of **incorrect** code for this rule:

```js
/*eslint no-restricted-amd-modules: ["error", "foo", "bar"]*/

define(['foo', 'bar', 'baz'], function () {
    /* ... */
});
```

```js
/*eslint no-restricted-amd-modules: ["error", {"paths": ["foo/bar"] }]*/

define(['foo/bar', 'baz'], function () {
    /* ... */
});
```

```js
/*eslint no-restricted-amd-modules: ["error", { "patterns": ["foo/bar/*"] }]*/

define(['foo/bar/baz'], function () {
    /* ... */
});
```

Examples of **correct** code for this rule:

```js
/*eslint no-restricted-amd-modules: ["error", "baz"]*/

define(['foo', 'bar'], function () {
    /* ... */
});
```

```js
/*eslint no-restricted-amd-modules: ["error", {
    "paths": ["foo"],
    "patterns": ["baz/*", "!baz/pick"]
}]*/

define(['bar', 'baz/pick'], function () {
    /* ... */
});
```
