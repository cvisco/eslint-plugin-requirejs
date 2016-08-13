"use strict";

const RuleTester = require("eslint").RuleTester;

module.exports = function (ruleName, rule, test) {
    const ruleTester = new RuleTester();
    ruleTester.run(ruleName, rule, test);
};
