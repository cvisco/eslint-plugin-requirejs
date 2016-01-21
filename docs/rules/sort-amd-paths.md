#  Ensure that required paths are in alphabetical order (sort-amd-paths)

## Rule Details

This rule checks whether the required paths in `define` and `require` statements are ordered alphabetically or not.

### Options

This rule takes one argument, an object, which has two keys, `"compare"` and `"ignoreCase"`.

#### `compare`

Determines which part (or parts) of the path will be used to sort by. The possible values are:

* `dirname-basename` (default) - Performs a compound sort. First, sorts by directory name only, then, within the same directory, sorts by module file name.
* `fullpath` - Sorts by the full path, including the module file name.
* `basename` - Sorts by module file name only, ignoring the directory name.

#### `ignoreCase`

Accepts a boolean value. Determines whether the comparison should be case-sensitive or not. The default is `true`.

```json
    "requirejs/sort-amd-paths": 2
    "requirejs/sort-amd-paths": [2, { "compare": "dirname-basename" }]
    "requirejs/sort-amd-paths": [2, { "compare": "dirname-basename", "ignoreCase": true }]
    "requirejs/sort-amd-paths": [2, { "compare": "dirname-basename", "ignoreCase": false }]
    "requirejs/sort-amd-paths": [2, { "compare": "fullpath" }]
    "requirejs/sort-amd-paths": [2, { "compare": "fullpath", "ignoreCase": true }]
    "requirejs/sort-amd-paths": [2, { "compare": "fullpath", "ignoreCase": false }]
    "requirejs/sort-amd-paths": [2, { "compare": "basename" }]
    "requirejs/sort-amd-paths": [2, { "compare": "basename", "ignoreCase": true }]
    "requirejs/sort-amd-paths": [2, { "compare": "basename", "ignoreCase": false }]
```

#### With `no argument`, with options `[2, { "compare": "dirname-basename" }]` and options `[2, { "compare": "dirname-basename", "ignoreCase": true }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/bbb/ccc',
    'aaa/bbb/aaa'
], function (ccc, aaa) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/ddd',
    'aaa/bbb/aaa'
], function (ddd, aaa) {
    /* ... */
});
```

#### With options `[2, { "compare": "dirname-basename", "ignoreCase": false }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/bbb/aaa',
    'aaa/bbb/Ccc'
], function (aaa, ccc) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/bbb/Aaa',
    'aaa/bbb/Ccc'
], function (aaa, ccc) {
    /* ... */
});
```

#### With options `[2, { "compare": "fullpath" }]` and `[2, { "compare": "fullpath", "ignoreCase": true }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/bbb/xxx',
    'aaa/bbb/ccc/ddd'
], function (xxx, ddd) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/bbb/ccc/ddd',
    'aaa/bbb/xxx'
], function (ddd, xxx) {
    /* ... */
});
```

#### With options `[2, { "compare": "fullpath", "ignoreCase": false }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/bbb/aaa',
    'aaa/bbb/Ccc'
], function (aaa, ccc) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/bbb/Aaa',
    'aaa/bbb/Ccc'
], function (aaa, ccc) {
    /* ... */
});
```

#### With options `[2, { "compare": "basename" }]` and `[2, { "compare": "basename", "ignoreCase": true }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/xxx',
    'xxx/aaa'
], function (xxx, aaa) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'xxx/aaa',
    'aaa/xxx'
], function (aaa, xxx) {
    /* ... */
});
```

#### With options `[2, { "compare": "basename", "ignoreCase": false }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/aaa',
    'aaa/bbb/Ccc'
], function (aaa, ccc) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/Aaa',
    'aaa/bbb/Ccc'
], function (aaa, ccc) {
    /* ... */
});
```

## When Not To Use It

If you don't want to have required paths in alphabetical order, then it is safe to disable this rule.

## Further Reading

* [Definition Functions with Dependencies](http://requirejs.org/docs/api.html#defdep)