requirejs(['a', 'b'], function (a, b) {
    requirejs(['c'], function (c) {
        return { foo: 'bar' };
    });
});
