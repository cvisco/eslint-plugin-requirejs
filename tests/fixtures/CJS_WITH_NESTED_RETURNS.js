define(function (require, exports) {
    var a = require('path/to/a'),
        b = require('path/to/b');

    function bar() {
        return 'bar';
    }

    exports.foo = function () {
        return 'foo' + bar();
    }

});
