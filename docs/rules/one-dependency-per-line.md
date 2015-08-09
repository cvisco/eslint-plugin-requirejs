# Enforce line-break rules for AMD dependencies (one-dependency-per-line)

When more than a handful of dependencies are required in a module, the list can quickly become too long to fit on one line. Inconsistent line break usage can also make it hard to read and maintain long lists of dependencies.

## Rule Details

This rule aims to enforce consistent line-break usage in dependency lists.

### Options

The rule takes one option, an object, which has two keys, `paths` and `names`. These keys allow individual control over the line-break rules for, respectively, the dependency path list and the list of names (arguments) passed to the module definition function. Each key can either be a string `"always"` or `"never", or a numeric value representing the maximum number of dependencies each list can contain before enforcing the one-dependency-per-line rule. The default is `{ "paths": "always", "names": "always" }`.

```json
    "one-dependency-per-line: [2, { "paths": "always", "names": "never" }]
    "one-dependency-per-line: [2, { "paths": 3, "names": 3 }]
```

The following examples demonstate the behavior of these options.

#### { "paths": "always", "names": "always" }

When the mode is set to `"always"`, each dependency must be placed on a separate line.

In this mode, the following pattern is considered a warning:

```js
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    /* ... */
});
```

Whereas, the following pattern is *not* considered a warning:

```js
require([
    'jquery',
    'underscore',
    'backbone'
], function (
    $,
    _,
    Backbone
) {
    /* ... */
});
```

#### { "paths": "never", "names": "never" }

When the mode is set to `"never"`, dependency lists must appear on one line.

In this mode, the following pattern is considered a warning:

```js
require([
    'jquery',
    'underscore',
    'backbone'
], function (
    $,
    _,
    Backbone
) {
    /* ... */
});
```

Whereas, the following pattern is *not* considered a warning:

```js
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    /* ... */
});
```

#### { "paths": 3, "names": 3 }

When a number value is provided, it defines the maximum number of dependencies a list can contain before line-breaking is enforced for all dependencies in that list. This allows for very short dependency lists to appear on a single line, but longer ones to spaced appropriately.

In this mode, the following patterns are considered warnings:

```js
// "one-dependency-per-line: [2, { "paths": "always", "names": 3 }]
require([
    'jquery',
    'underscore',
    'backbone',
    'some/other/module'
], function ($, _, Backbone, SomeOtherModule) {
    /* ... */
});

// "one-dependency-per-line: [2, { "paths": 2, "names": 2 }]
require(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    /* ... */
});
```

Whereas, the following patterns are *not* considered warnings:

```js
// "one-dependency-per-line: [2, { "paths": "always", "names": 3 }]
require([
    'jquery',
    'underscore',
    'backbone',
    'some/other/module'
], function (
    $,
    _,
    Backbone,
    SomeOtherModule
) {
    /* ... */
});

// "one-dependency-per-line: [2, { "paths": 2, "names": 2 }]
require(['jquery', 'underscore'], function ($, _) {
    /* ... */
});
```

## When Not To Use It

If your project will not be following any consistent line-break pattern for dependencies, it is safe to turn off this rule.

## Further Reading

* [Define a Module](http://requirejs.org/docs/api.html#define)

