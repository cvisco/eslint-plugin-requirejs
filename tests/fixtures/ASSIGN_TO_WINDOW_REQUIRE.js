window.require = {
    deps: ['path/to/a', 'path/to/b'],
    callback: function (a, b) {
        a.foo();
        b.bar();
    }
};
