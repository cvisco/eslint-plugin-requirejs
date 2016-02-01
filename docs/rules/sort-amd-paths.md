#  Ensure that required paths are in alphabetical order (sort-amd-paths)

## Rule Details

This rule checks whether the required paths in `define` and `require` statements are ordered alphabetically or not.

### Options

This rule takes one argument, an object, which has three keys, `"compare"`, `"sortPlugins"` and `"ignoreCase"`.

#### `compare`

Determines which part (or parts) of the path will be used to sort by. The possible values are:

* `dirname-basename` (default) - Performs a compound sort. First, sorts by directory name only, then, within the same directory, sorts by module file name.
* `fullpath` - Sorts by the full path, including the module file name.
* `basename` - Sorts by module file name only, ignoring the directory name.

#### `sortPlugins`

Determines how paths with plugin prefix will be sorted. The possible values are:

* `preserve` (default) - Treats plugin prefix as part of full path when sorting.
* `ignore` - Ignores plugin prefix completely when sorting.
* `first` - Paths with plugin prefix will be sorted before non-prefixed paths.
* `last` - Paths with plugin prefix will be sorted after non-prfixed paths.

#### `ignoreCase`

Accepts a boolean value. Determines whether the comparison should be case-sensitive or not. The default is `true`.

```json
"requirejs/sort-amd-paths": [
    2,
    {
        "compare": "dirname-basename",
        "sortPlugins": "preserve",
        "ignoreCase": true
    }
]
```

#### With no argument, with options `[2, { "compare": "dirname-basename" }]`, `[2, { "compare": "dirname-basename", "ignoreCase": true }]` and `[2, { "compare": "dirname-basename", "sortPlugins": "preserve", "ignoreCase": true }]`:

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

#### With options `[2, { "compare": "dirname-basename", "sortPlugins": "preserve" }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'ggg/ggg/ggg'
], function (aaa, ccc, fff1, fff2, ggg) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'bbb!fff/fff/fff',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'hhh!ddd/ddd/ddd'
], function (aaa, fff, ccc, ggg, ddd) {
    /* ... */
});
```

#### With options `[2, { "compare": "dirname-basename", "sortPlugins": "ignore" }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'bbb!fff/fff/fff',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'hhh!ddd/ddd/ddd'
], function (aaa, fff, ccc, ggg, ddd) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'ggg/ggg/ggg'
], function (aaa, ccc, fff1, fff2, ggg) {
    /* ... */
});
```

#### With options `[2, { "compare": "dirname-basename", "sortPlugins": "first" }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2'
], function (aaa, ccc, ggg, fff1, fff2) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg'
], function (fff1, fff2, aaa, ccc, ggg) {
    /* ... */
});
```

#### With options `[2, { "compare": "dirname-basename", "sortPlugins": "last" }]`:

The following pattern is considered a warning:

```js
define([
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg'
], function (fff1, fff2, aaa, ccc, ggg) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2'
], function (aaa, ccc, ggg, fff1, fff2) {
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

#### With options `[2, { "compare": "fullpath", "sortPlugins": "preserve" }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'ggg/ggg/ggg'
], function (aaa, ccc, fff1, fff2, ggg) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'bbb!fff/fff/fff',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'hhh!ddd/ddd/ddd'
], function (aaa, fff, ccc, ggg, ddd) {
    /* ... */
});
```

#### With options `[2, { "compare": "fullpath", "sortPlugins": "ignore" }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'bbb!fff/fff/fff',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'hhh!ddd/ddd/ddd'
], function (aaa, fff, ccc, ggg, ddd) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'ggg/ggg/ggg'
], function (aaa, ccc, fff1, fff2, ggg) {
    /* ... */
});
```

#### With options `[2, { "compare": "fullpath", "sortPlugins": "first" }]`:

The following pattern is considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2'
], function (aaa, ccc, ggg, fff1, fff2) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg'
], function (fff1, fff2, aaa, ccc, ggg) {
    /* ... */
});
```

#### With options `[2, { "compare": "fullpath", "sortPlugins": "last" }]`:

The following pattern is considered a warning:

```js
define([
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg'
], function (fff1, fff2, aaa, ccc, ggg) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2'
], function (aaa, ccc, ggg, fff1, fff2) {
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

#### With options `[2, { "compare": "basename", "sortPlugins": "preserve" }]` and `[2, { "compare": "basename", "sortPlugins": "ignore" }]`:

The following pattern is considered a warning:

```js
define([
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff',
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'gwhat/ever4/ggg'
], function (ddd, fff, aaa, ccc, ggg) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff',
    'gwhat/ever4/ggg'
], function (aaa, ccc, ddd, fff, ggg) {
    /* ... */
});
```

#### With options `[2, { "compare": "basename", "sortPlugins": "first" }]`:

The following pattern is considered a warning:

```js
define([
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'gwhat/ever4/ggg',
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff'
], function (aaa, ccc, ggg, ddd, fff) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff',
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'gwhat/ever4/ggg'
], function (ddd, fff, aaa, ccc, ggg) {
    /* ... */
});
```

#### With options `[2, { "compare": "basename", "sortPlugins": "last" }]`:

The following pattern is considered a warning:

```js
define([
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff',
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'gwhat/ever4/ggg'
], function (ddd, fff, aaa, ccc, ggg) {
    /* ... */
});
```

The following pattern is not considered a warning:

```js
define([
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'gwhat/ever4/ggg',
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff'
], function (aaa, ccc, ggg, ddd, fff) {
    /* ... */
});
```

## When Not To Use It

If you don't want to have required paths in alphabetical order, then it is safe to disable this rule.

## Further Reading

* [Definition Functions with Dependencies](http://requirejs.org/docs/api.html#defdep)