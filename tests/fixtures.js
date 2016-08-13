"use strict";

exports.ALPHABETICAL_PATHS_BASENAME_CAPITAL = `
define([
    'aaa/bbb/Xxx',
    'aaa/bbb/ccc/ddd'
], function (ccc, aaa) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_BASENAME_INVALID_ORDER = `
define([
    'aaa/xxx',
    'xxx/aaa'
], function (ccc, aaa) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_BASENAME_PLUGIN_FIRST = `
define([
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff',
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'gwhat/ever4/ggg'
], function (ddd, fff, aaa, ccc, ggg) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_BASENAME_PLUGIN_LAST = `
define([
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'gwhat/ever4/ggg',
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff'
], function (aaa, ccc, ggg, ddd, fff) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_BASENAME_PLUGIN_PRESERVE_IGNORE = `
define([
    'awhat/ever1/aaa',
    'cwhat/ever3/ccc',
    'hhh!dwhat/ever5/ddd',
    'bbb!fwhat/ever2/fff',
    'gwhat/ever4/ggg'
], function (aaa, ccc, ddd, fff, ggg) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_BASENAME_VALID_ORDER = `
define([
    'xxx/aaa',
    'aaa/xxx'
], function (ccc, aaa) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_FIRST_LONGER_INVALID = `
define([
    'foo/bar/baz/Batttt',
    'foo/bar/baz/Bat'
], function (bat1, bat2) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_FULLPATH_INVALID = `
define([
'aaa/bbb/xxx',
'aaa/bbb/ccc/ddd'
], function (ccc, aaa) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_FULLPATH_VALID = `
define([
'aaa/bbb/ccc/ddd',
'aaa/bbb/xxx'
], function (ccc, aaa) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_IGNORED_PATHS = `
define([
    'aaa/bbb/xxx',
    'aaa/bbb/yyy',
    'aaa/bbb/zzz',
    // following lines should be ignored
    'aaa/bbb/aaa',
    'aaa/bbb/bbb'
], function (xxx, yyy, zzz) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_INVALID_ORDER = `
define([
    'aaa/bbb/ccc',
    'aaa/bbb/Aaa'
], function (ccc, aaa) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_MORE_PATHS_IN_ARRAY = `
define([
    'base.dt/js/DesignerUtils',
    'components.dt/js/deleters/DeletersRegistry',
    'core/js/api/Listenable',
    'core/js/api/utils/KeyConstants',
    'pages.dt/js/api/Pages',
    'pages.dt/js/api/ViewGeneratorModes'
], function (aaa, ccc, ddd, bbb, yyy) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_NO_PATH = `
define(function () {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_ONE_PATH_IN_ARRAY = `
define([
    'foo/bar/baz'
], function (baz) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_PLUGIN_FIRST = `
define([
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg'
], function (fff1, fff2, aaa, ccc, ggg) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_PLUGIN_IGNORE = `
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2',
    'ggg/ggg/ggg'
], function (aaa, ccc, fff1, fff2, ggg) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_PLUGIN_LAST = `
define([
    'aaa/aaa/aaa',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'bbb!fff/fff/fff1',
    'bbb!fff/fff/fff2'
], function (aaa, ccc, ggg, fff1, fff2) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_PLUGIN_PRESERVE = `
define([
    'aaa/aaa/aaa',
    'bbb!fff/fff/fff',
    'ccc/ccc/ccc',
    'ggg/ggg/ggg',
    'hhh!ddd/ddd/ddd'
], function (aaa, fff, ccc, ggg, ddd) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_SLASH_PUNC_INVALID = `
define([
    'foo.bar/baz/Bat',
    'foo/bar/baz/Bat',
    'foo-bar/baz/Bat'
], function (bat1, bat2, bat3) {
    /* ... */
});
`;

exports.ALPHABETICAL_PATHS_SLASH_PUNC_VALID = `
define([
    'foo/bar/baz/Bat',
    'foo-bar/baz/Bat',
    'foo.bar/baz/Bat'
], function (bat1, bat2, bat3) {
    /* ... */
});
`;

exports.AMD_DEFINE = `
define(['path/to/a', 'path/to/b'], function (a, b) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEFINE_TOO_FEW_CALLBACK_PARAMS = `
define(["a", "b"], function (a) {
    /* ... */
});
`;

exports.AMD_DEFINE_TOO_MANY_CALLBACK_PARAMS = `
define(["a", "b"], function (a, b, c) {
    /* ... */
});
`;

exports.AMD_DEFINE_WITH_FOO_PLUGIN_AND_JS_EXT = `
define([
    'foo!aaa/bbb/ccc.js'
], function () {
    /* ... */
});
`;

exports.AMD_DEFINE_WITH_JS_EXT = `
define(['path/to/a.js'], function (a) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_FOUR = `
define([
    'path/to/a',
    'path/to/b',
    'path/to/c',
    'path/to/d'
], function (
    a,
    b,
    c,
    d
) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_NAMES_FOUR = `
define(['path/to/a', 'path/to/b', 'path/to/c', 'path/to/d'], function (
    a,
    b,
    c,
    d
) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_NAMES_ONE = `
define(['path/to/a'], function (a) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_NAMES_THREE = `
define(['path/to/a', 'path/to/b', 'path/to/c'], function (
    a,
    b,
    c
) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_NAMES_TWO = `
define(['path/to/a', 'path/to/b'], function (
    a,
    b
) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_NO_INDENT_FOUR = `
define([
'path/to/a',
'path/to/b',
'path/to/c',
'path/to/d'
], function (
a,
b,
c,
d
) { return { foo: 'bar' }; });
`;

exports.AMD_DEPS_MULTI_LINE_NO_INDENT_THREE = `
define([
'path/to/a',
'path/to/b',
'path/to/c'
], function (
a,
b,
c
) { return { foo: 'bar' }; });
`;

exports.AMD_DEPS_MULTI_LINE_NO_INDENT_TWO = `
define([
'path/to/a',
'path/to/b'
], function (
a,
b
) { return { foo: 'bar' }; });
`;

exports.AMD_DEPS_MULTI_LINE_ONE = `
define([
    'path/to/a'
], function (
    a
) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_PATHS_FOUR = `
define([
    'path/to/a',
    'path/to/b',
    'path/to/c',
    'path/to/d'
], function (a, b, c, d) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_PATHS_ONE = `
define([
    'path/to/a'
], function (a) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_PATHS_THREE = `
define([
    'path/to/a',
    'path/to/b',
    'path/to/c'
], function (a, b, c) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_PATHS_TWO = `
define([
    'path/to/a',
    'path/to/b'
], function (a, b) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_THREE = `
define([
    'path/to/a',
    'path/to/b',
    'path/to/c'
], function (
    a,
    b,
    c
) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_MULTI_LINE_TWO = `
define([
    'path/to/a',
    'path/to/b'
], function (
    a,
    b
) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_NONE = `
define([], function () {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_SINGLE_LINE_FOUR = `
define(['path/to/a', 'path/to/b', 'path/to/c', 'path/to/d'], function (a, b, c, d) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_SINGLE_LINE_NO_INDENT_FOUR = `
define(['path/to/a', 'path/to/b', 'path/to/c', 'path/to/d'], function (a, b, c, d) { return { foo: 'bar' }; });
`;

exports.AMD_DEPS_SINGLE_LINE_NO_INDENT_THREE = `
define(['path/to/a', 'path/to/b', 'path/to/c'], function (a, b, c) { return { foo: 'bar' }; });
`;

exports.AMD_DEPS_SINGLE_LINE_NO_INDENT_TWO = `
define(['path/to/a', 'path/to/b'], function (a, b) { return { foo: 'bar' }; });
`;

exports.AMD_DEPS_SINGLE_LINE_ONE = `
define(['path/to/a'], function (a) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_SINGLE_LINE_THREE = `
define(['path/to/a', 'path/to/b', 'path/to/c'], function (a, b, c) {
    return { foo: 'bar' };
});
`;

exports.AMD_DEPS_SINGLE_LINE_TWO = `
define(['path/to/a', 'path/to/b'], function (a, b) {
    return { foo: 'bar' };
});
`;

exports.AMD_EMPTY_DEFINE = `
define([], function () {
    return { foo: 'bar' };
});
`;

exports.AMD_EMPTY_REQUIRE = `
require([], function () {
    return { foo: 'bar' };
});
`;

exports.AMD_EMPTY_REQUIREJS = `
requirejs([], function () {
    return { foo: 'bar' };
});
`;

exports.AMD_NAMED_DEFINE_TOO_FEW_CALLBACK_PARAMS = `
define("module", ["a", "b"], function (a) {
    /* ... */
});
`;

exports.AMD_NAMED_DEFINE_TOO_MANY_CALLBACK_PARAMS = `
define("module", ["a", "b"], function (a, b, c) {
    /* ... */
});
`;

exports.AMD_REQUIRE = `
require(['path/to/a', 'path/to/b'], function (a, b) {
    /* ... */
});
`;

exports.AMD_REQUIREJS = `
requirejs(['path/to/a', 'path/to/b'], function (a, b) {
    /* ... */
});
`;

exports.AMD_REQUIREJS_CALLEXPRESSION_CALLBACK = `
requirejs(["path/to/a"], getCallback());
`;

exports.AMD_REQUIREJS_IDENTIFIER_CALLBACK = `
requirejs(["path/to/a"], callback);
`;

exports.AMD_REQUIREJS_MEMBEREXPRESSION_CALLBACK = `
requirejs(["path/to/a"], foo.callback);
`;

exports.AMD_REQUIREJS_RELATIVE = `
define(['require'], function (require) {
    var foo = requirejs('./foo');
});
`;

exports.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS = `
requirejs("a", function () {
    /* ... */
});
`;

exports.AMD_REQUIREJS_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK = `
requirejs("a", function () {
    /* ... */
}, function (err) {
    /* ... */
});
`;

exports.AMD_REQUIREJS_SINGLEDEP_TOO_MANY_CALLBACK_PARAMS = `
requirejs("a", function (a, b) {
    /* ... */
});
`;

exports.AMD_REQUIREJS_SINGLEDEP_TOO_MANY_CALLBACK_PARAMS_WITH_ERRBACK = `
requirejs("a", function (a, b) {
    /* ... */
}, function (err) {
    /* ... */
});
`;

exports.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS = `
requirejs(["a", "b"], function (a) {
    /* ... */
});
`;

exports.AMD_REQUIREJS_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK = `
requirejs(["a", "b"], function (a) {
    /* ... */
}, function (err) {
    /* ... */
});
`;

exports.AMD_REQUIREJS_TOO_MANY_CALLBACK_PARAMS = `
requirejs(["a", "b"], function (a, b, c) {
    /* ... */
});
`;

exports.AMD_REQUIREJS_TOO_MANY_CALLBACK_PARAMS_WITH_ERRBACK = `
requirejs(["a", "b"], function (a, b, c) {
    /* ... */
}, function (err) {
    /* ... */
});
`;

exports.AMD_REQUIREJS_WITH_ERRBACK = `
requirejs(
    ['path/to/a', 'path/to/b'],
    function (a, b) {
        /* ... */
    },
    function (err) {
        /* ... */
    }
);
`;

exports.AMD_REQUIREJS_WITH_FOO_PLUGIN_AND_JS_EXT = `
requirejs([
    'foo!aaa/bbb/ccc.js'
], function () {
    /* ... */
});
`;

exports.AMD_REQUIREJS_WITH_JS_EXT = `
requirejs(['path/to/a.js'], function (a) {
    /* ... */
});
`;

exports.AMD_REQUIRE_CALLEXPRESSION_CALLBACK = `
require(["path/to/a"], getCallback());
`;

exports.AMD_REQUIRE_IDENTIFIER_CALLBACK = `
require(["path/to/a"], callback);
`;

exports.AMD_REQUIRE_MEMBEREXPRESSION_CALLBACK = `
require(["path/to/a"], foo.callback);
`;

exports.AMD_REQUIRE_RELATIVE = `
define(['require'], function (require) {
    var foo = require('./foo');
});
`;

exports.AMD_REQUIRE_RELATIVE_WITH_JS_EXT = `
define(['require'], function (require) {
    var foo = require('./foo.js');
});
`;

exports.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS = `
require("a", function () {
    /* ... */
});
`;

exports.AMD_REQUIRE_SINGLEDEP_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK = `
require("a", function () {
    /* ... */
}, function (err) {
    /* ... */
});
`;

exports.AMD_REQUIRE_SINGLEDEP_TOO_MANY_CALLBACK_PARAMS = `
require("a", function (a, b) {
    /* ... */
});
`;

exports.AMD_REQUIRE_SINGLEDEP_TOO_MANY_CALLBACK_PARAMS_WITH_ERRBACK = `
require("a", function (a, b) {
    /* ... */
}, function (err) {
    /* ... */
});
`;

exports.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS = `
require(["a", "b"], function (a) {
    /* ... */
});
`;

exports.AMD_REQUIRE_TOO_FEW_CALLBACK_PARAMS_WITH_ERRBACK = `
require(["a", "b"], function (a) {
    /* ... */
}, function (err) {
    /* ... */
});
`;

exports.AMD_REQUIRE_TOO_MANY_CALLBACK_PARAMS = `
require(["a", "b"], function (a, b, c) {
    /* ... */
});
`;

exports.AMD_REQUIRE_TOO_MANY_CALLBACK_PARAMS_WITH_ERRBACK = `
require(["a", "b"], function (a, b, c) {
    /* ... */
}, function (err) {
    /* ... */
});
`;

exports.AMD_REQUIRE_WITH_ERRBACK = `
require(
    ['path/to/a', 'path/to/b'],
    function (a, b) {
        /* ... */
    },
    function (err) {
        /* ... */
    }
);
`;

exports.AMD_REQUIRE_WITH_FOO_PLUGIN_AND_JS_EXT = `
require([
    'foo!aaa/bbb/ccc.js'
], function () {
    /* ... */
});
`;

exports.AMD_REQUIRE_WITH_JS_EXT = `
require(['path/to/a.js'], function (a) {
    /* ... */
});
`;

exports.ASSIGN_TO_FOO_REQUIRE = `
foo.require = {
    bar: 'bar'
};
`;

exports.ASSIGN_TO_REQUIRE = `
require = {
    deps: ['path/to/a', 'path/to/b'],
    callback: function (a, b) {
        a.foo();
        b.bar();
    }
};
`;

exports.ASSIGN_TO_WINDOW_REQUIRE = `
window.require = {
    deps: ['path/to/a', 'path/to/b'],
    callback: function (a, b) {
        a.foo();
        b.bar();
    }
};
`;

exports.BAD_DEFINE = `
define('foo', 'bar', false);
`;

exports.BAD_REQUIREJS_STRING_DEP = `
requirejs('path/to/a', function (a) {
    /* ... */
});
`;

exports.BAD_REQUIRE_EMPTY = `
require();
`;

exports.BAD_REQUIRE_INVALID_CALLBACK = `
require(['path/to/a'], {
    foo: 'bar'
});
`;

exports.BAD_REQUIRE_INVALID_CALLBACK_ARRAY = `
require(["path/to/a"], ["not a callback"]);
`;

exports.BAD_REQUIRE_INVALID_ERRBACK = `
require(
    ['path/to/a'],
    function (a) {
        /* ... */
    },
    {
        /* ... */
    }
);
`;

exports.BAD_REQUIRE_INVALID_ERRBACK_ARRAY = `
require(
    ['path/to/a'],
    function (a) {
        /* ... */
    },
    [
        /* ... */
    ]
);
`;

exports.BAD_REQUIRE_NO_DEPS = `
require(function () {
    /* ... */
});
`;

exports.BAD_REQUIRE_OBJECT = `
require({ foo: 'bar' });
`;

exports.BAD_REQUIRE_STRING_DEP = `
require('path/to/a', function (a) {
    /* ... */
});
`;

exports.BAD_REQUIRE_TOO_MANY_ARGS = `
require(
    ['path/to/a'],
    function (a) {
        /* ... */
    },
    function (err) {
        /* ... */
    },
    false
);
`;

exports.CJS_WITH_EXPORTS = `
define(function (require, exports) {
    var a = require('path/to/a'),
        b = require('path/to/b');

    exports.doSomething = function () {
        /* ... */
    };
});
`;

exports.CJS_WITH_FOO_PLUGIN_AND_JS_EXT = `
define(function (require) {
    var a = require('foo!aaa/bbb/ccc.js');

    /* ... */
});
`;

exports.CJS_WITH_FUNC_EXPR = `
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
`;

exports.CJS_WITH_INVALID_EXPORTS = `
define(function (require, exports) {
    var a = require('path/to/a'),
        b = require('path/to/b');

    exports = {
        doSomething: function () {
            /* ... */
        }
    };
});
`;

exports.CJS_WITH_JS_EXT = `
define(function (require) {
    var a = require('path/to/a.js');

    return { foo: 'bar' };
});
`;

exports.CJS_WITH_MODULE_EXPORTS = `
define(function (require, exports, module) {
    var a = require('path/to/a'),
        b = require('path/to/b');

    module.exports = {
        doSomething: function () {
            /* ... */
        }
    };
});
`;

exports.CJS_WITH_NESTED_RETURNS = `
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
`;

exports.CJS_WITH_RETURN = `
define(function (require) {
    var a = require('path/to/a'),
        b = require('path/to/b');

    return { foo: 'bar' };
});
`;

exports.CONDITIONAL_AMD_REQUIRE = `
if (someCondition) {
    require(['path/to/a', 'path/to/b'], function (a, b) {
        return { foo: 'bar' };
    });
}
`;

exports.CONDITIONAL_AMD_REQUIREJS = `
if (someCondition) {
    requirejs(['path/to/a', 'path/to/b'], function (a, b) {
        return { foo: 'bar' };
    });
}
`;

exports.CONDITIONAL_CJS_REQUIRE = `
define(function (require) {
    if (someCondition) {
        var lib = require('path/to/lib');
    }
});
`;

exports.CONDITIONAL_CJS_REQUIREJS = `
define(function (require) {
    if (someCondition) {
        var lib = requirejs('path/to/lib');
    }
});
`;

exports.CONDITIONAL_NESTED_AMD_REQUIRE = `
require(['a', 'b'], function (a, b) {
    if (someCondition) {
        require(['c'], function (c) {
            return { foo: 'bar' };
        });
    }
});
`;

exports.CONDITIONAL_NESTED_AMD_REQUIREJS = `
requirejs(['a', 'b'], function (a, b) {
    if (someCondition) {
        requirejs(['c'], function (c) {
            return { foo: 'bar' };
        });
    }
});
`;

exports.CONDITIONAL_TERNARY_CJS_REQUIRE = `
define(function (require) {
    var lib = someCondition ? require('path/to/a') : require('path/to/b');
});
`;

exports.CONDITIONAL_TERNARY_CJS_REQUIREJS = `
define(function (require) {
    var lib = someCondition ? requirejs('path/to/a') : requirejs('path/to/b');
});
`;

exports.DECLARE_REQUIRE = `
var require = {
    deps: ['path/to/a', 'path/to/b'],
    callback: function (a, b) {
        a.foo();
        b.bar();
    }
};
`;

exports.DYNAMIC_AMD_REQUIREJS_WITH_ERRBACK = `
requirejs(
    [someCondition ? 'path/to/a' : 'path/to/b'],
    function (mod) {
        return { foo: 'bar' };
    },
    function (err) {
        /* handle error... */
    }
);
`;

exports.DYNAMIC_AMD_REQUIRE_WITH_ERRBACK = `
require(
    [someCondition ? 'path/to/a' : 'path/to/b'],
    function (mod) {
        return { foo: 'bar' };
    },
    function (err) {
        /* handle error... */
    }
);
`;

exports.DYNAMIC_MIXED_AMD_REQUIRE = `
var pathB = 'path/to/b';
require(['path/to/a', pathB], function (a, b) {
    return { foo: 'bar' };
});
`;

exports.DYNAMIC_MIXED_AMD_REQUIREJS = `
var pathB = 'path/to/b';
requirejs(['path/to/a', pathB], function (a, b) {
    return { foo: 'bar' };
});
`;

exports.DYNAMIC_TERNARY_AMD_REQUIRE = `
require(someCondition ? ['a', 'b'] : ['c', 'd'], function (a, b) {
    return { foo: 'bar' };
});
`;

exports.DYNAMIC_TERNARY_AMD_REQUIREJS = `
requirejs(someCondition ? ['a', 'b'] : ['c', 'd'], function (a, b) {
    return { foo: 'bar' };
});
`;

exports.DYNAMIC_TERNARY_CJS_REQUIRE = `
define(function (require) {
    var lib = require(lang === 'fr' ? 'lib_fr' : 'lib_en');
});
`;

exports.DYNAMIC_TERNARY_CJS_REQUIREJS = `
define(function (require) {
    var lib = requirejs(lang === 'fr' ? 'lib_fr' : 'lib_en');
});
`;

exports.DYNAMIC_VARIABLE_AMD_DEFINE = `
define(getDefinePaths(), function (a, b) {
});
`;

exports.DYNAMIC_VARIABLE_AMD_NAMED_DEFINE = `
define("myModule", getDefinePaths(), function (a, b) {
});
`;

exports.DYNAMIC_VARIABLE_AMD_REQUIRE = `
var paths = ['path/to/a', 'path/to/b'];
require(paths, function (a, b) {
    return { foo: 'bar' };
});
`;

exports.DYNAMIC_VARIABLE_AMD_REQUIREJS = `
var paths = ['path/to/a', 'path/to/b'];
requirejs(paths, function (a, b) {
    return { foo: 'bar' };
});
`;

exports.DYNAMIC_VARIABLE_CJS_REQUIRE = `
define(function (require) {
    var path = 'path/to/lib';
    var lib = require(path);
});
`;

exports.DYNAMIC_VARIABLE_CJS_REQUIREJS = `
define(function (require) {
    var path = 'path/to/lib';
    var lib = requirejs(path);
});
`;

exports.EMPTY_DEFINE = `
define();
`;

exports.FUNCTION_DEFINE = `
define(function () {
    return { foo: 'bar' };
});
`;

exports.MULTIPLE_DEFINE = `
define({ foo: 'bar' });

define(function () {
    return { foo: 'bar' };
});
`;

exports.MULTIPLE_DEFINE_ONE_CALL = `
if (typeof define === "function") {
    define(function () {
        return { foo: 'bar' };
    });
}
`;

exports.NAMED_AMD_DEFINE = `
define('path/to/c', [
    'path/to/a',
    'path/to/b'
], function (a, b) {
    return { foo: 'bar' };
});
`;

exports.NAMED_AMD_DEFINE_WITH_JS_EXT = `
define('path/to/c', ['path/to/a.js'], function (a) {
    return { foo: 'bar' };
});
`;

exports.NAMED_AMD_EMPTY_DEFINE = `
define('path/to/c', [], function () {
    return { foo: 'bar' };
});
`;

exports.NAMED_CJS_DEFINE = `
define('path/to/c', function (require, exports, module) {
    var a = require('path/to/a'),
        b = require('path/to/b');

    module.exports = {
        doSomething: function () {
            /* ... */
        }
    };
});
`;

exports.NAMED_CJS_DEFINE_WITH_JS_EXT = `
define('path/to/c', function (require, exports, module) {
    var a = require('path/to/a.js');

    module.exports = {
        doSomething: function () {
            /* ... */
        }
    };
});
`;

exports.NAMED_FUNCTION_DEFINE = `
define('path/to/a', function () {
    return { foo: 'bar' };
});
`;

exports.NAMED_OBJECT_DEFINE = `
define('path/to/a', {
    foo: 'bar'
});
`;

exports.NESTED_AMD_REQUIRE = `
require(['a', 'b'], function (a, b) {
    require(['c'], function (c) {
        return { foo: 'bar' };
    });
});
`;

exports.NESTED_AMD_REQUIREJS = `
requirejs(['a', 'b'], function (a, b) {
    requirejs(['c'], function (c) {
        return { foo: 'bar' };
    });
});
`;

exports.NESTED_AMD_REQUIREJS_NO_CALLBACK = `
requirejs(['a', 'b'], function (a, b) {
    requirejs(['c']);
});
`;

exports.NESTED_AMD_REQUIRE_NO_CALLBACK = `
require(['a', 'b'], function (a, b) {
    require(['c']);
});
`;

exports.NON_WRAPPED_EXPORTS = `
exports = { foo: 'bar' };
`;

exports.OBJECT_DEFINE = `
define({
    a: 'foo',
    b: 'bar'
});
`;

exports.REQUIREJS_NAME_TO_URL = `
define(['require'], function (require) {
    var idUrl = requirejs.nameToUrl('id');
});
`;

exports.REQUIREJS_TO_URL = `
define(['require'], function (require) {
    var cssUrl = requirejs.toUrl('./style.css');
});
`;

exports.REQUIRE_NAME_TO_URL = `
define(['require'], function (require) {
    var idUrl = require.nameToUrl('id');
});
`;

exports.REQUIRE_TO_URL = `
define(['require'], function (require) {
    var cssUrl = require.toUrl('./style.css');
});
`;

exports.UNWRAPPED_FILE = `
var foo = 'foo';

function bar() {
    return foo;
}

window.bar = bar;
`;

exports.UNWRAPPED_FILE_NO_EXPRESSIONSTATEMENT = `
var foo = 'foo';

function bar() {
    return foo;
}
`;
