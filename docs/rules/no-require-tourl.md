# Disallow use of `require.toUrl` and `require.nameToUrl` (no-require-tourl)

RequireJS provides these methods as a way to generate a url that is relative to a module. Some third-party module loaders such as [Almond](https://github.com/jrburke/almond), do not support the use of these functions.

## Rule Details

The following patterns are considered warnings:

```js
define(['require'], function (require) {
    var cssUrl = require.toUrl('./style.css');
    /* ... */
});

define(['require'], function (require) {
    var idUrl = require.nameToUrl('id');
    /* ... */
});
```

## When Not To Use It

If you are not using Almond, then it is safe to disable this rule.

## Further Reading

* [RequireJS Module Notes](http://requirejs.org/docs/api.html#modulenotes)
* [Almond Restrictions](https://github.com/jrburke/almond#restrictions)
