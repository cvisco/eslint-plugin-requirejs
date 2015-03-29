"use strict";

module.exports = {
    rules: {
        "no-invalid-define": require("./lib/rules/no-invalid-define"),
        "no-object-define": require("./lib/rules/no-object-define"),
        "no-function-define": require("./lib/rules/no-function-define"),
        "no-amd-define": require("./lib/rules/no-amd-define"),
        "no-named-define": require("./lib/rules/no-named-define"),
        "no-commonjs-wrapper": require("./lib/rules/no-commonjs-wrapper")
    },
    rulesConfig: {
        "no-invalid-define": 2,
        "no-object-define": 0,
        "no-function-define": 0,
        "no-amd-define": 0,
        "no-named-define": 0,
        "no-commonjs-wrapper": 0
    }
};
