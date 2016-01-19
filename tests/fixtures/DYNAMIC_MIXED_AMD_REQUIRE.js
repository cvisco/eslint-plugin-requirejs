var pathB = 'path/to/b';
require(['path/to/a', pathB], function (a, b) {
    return { foo: 'bar' };
});
