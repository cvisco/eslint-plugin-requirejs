# Disallow assignment to `require` or `window.require` (no-assign-require)

RequireJS allows you to pass configuration options by assigning to global variable `require` before RequireJS is loaded. This form of passing config may not work with third-party module loaders such as [Almond](https://github.com/jrburke/almond), however.

In other cases, overwriting `require` is probably an error, and should be avoided.

## Rule Details

The following patterns are considered warnings:

```js
var require = {
    /* ... config ... */
};

window.require = {
    /* ... config ... */
}
```

The following pattern is not a warning:

```js
// Not a potential overwrite
foo.require = 'bar';
```

## When Not To Use It

If you aren't using a third-party module loader and you wish to pass configuration this way, then it is safe to disable this rule.

## Further Reading

* [RequireJS Configuration Options](http://requirejs.org/docs/api.html#config)
* [Almond Restrictions](https://github.com/jrburke/almond#restrictions)
