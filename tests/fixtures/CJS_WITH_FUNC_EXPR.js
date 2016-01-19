define(function (require, exports, module) {
    var a = require('path/to/a'),
        b = require('path/to/b');

    var f = function () {
        return 'foo';
    };

    var b = function () {
        return 'bar';
    };

    module.exports = {
        doSomething: function () {
            /* ... */
        },

        foo: f,
        bar: b
    };
});
