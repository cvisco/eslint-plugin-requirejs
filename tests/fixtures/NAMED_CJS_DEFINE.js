define('path/to/c', function (require, exports, module) {
    var a = require('path/to/a'),
        b = require('path/to/b');

    module.exports = {
        doSomething: function () {
            /* ... */
        }
    };
});
