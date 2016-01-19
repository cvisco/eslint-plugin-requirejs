require(['a', 'b'], function (a, b) {
    require(['c'], function (c) {
        return { foo: 'bar' };
    });
});
