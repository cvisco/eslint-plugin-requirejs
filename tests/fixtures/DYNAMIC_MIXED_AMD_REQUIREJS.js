var pathB = 'path/to/b';
requirejs(['path/to/a', pathB], function (a, b) {
    return { foo: 'bar' };
});
