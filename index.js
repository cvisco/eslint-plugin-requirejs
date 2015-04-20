"use strict";

module.exports = {
    rules: {
        "no-invalid-define": require("./lib/rules/no-invalid-define"),
        "no-multiple-define": require("./lib/rules/no-multiple-define"),
        "no-assign-exports": require("./lib/rules/no-assign-exports"),
        "no-object-define": require("./lib/rules/no-object-define"),
        "no-function-define": require("./lib/rules/no-function-define"),
        "no-amd-define": require("./lib/rules/no-amd-define"),
        "no-named-define": require("./lib/rules/no-named-define"),
        "no-commonjs-wrapper": require("./lib/rules/no-commonjs-wrapper"),
        "no-commonjs-return": require("./lib/rules/no-commonjs-return"),
        "no-commonjs-exports": require("./lib/rules/no-commonjs-exports"),
        "no-commonjs-module-exports": require("./lib/rules/no-commonjs-module-exports"),
        "no-dynamic-require": require("./lib/rules/no-dynamic-require"),
        "no-conditional-require": require("./lib/rules/no-conditional-require")
    },
    rulesConfig: {

        // Potential Errors
        "no-invalid-define": 2,
        "no-multiple-define": 2,
        "no-assign-exports": 2,

        // Stylistic Choices
        "no-object-define": 0,
        "no-function-define": 0,
        "no-amd-define": 0,
        "no-named-define": 0,
        "no-commonjs-wrapper": 0,
        "no-commonjs-return": 0,
        "no-commonjs-exports": 0,
        "no-commonjs-module-exports": 0,
        "no-dynamic-require": 0,
        "no-conditional-require": 0
    }
};
