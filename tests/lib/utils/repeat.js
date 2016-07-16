"use strict";

var assert = require("chai").assert;
var repeat = require("../../../lib/utils/repeat");

describe("repeat", function () {

    it("should repeat a string the given number of times", function () {
        assert.equal(repeat(5, ""), "");
        assert.equal(repeat(5, " "), "     ");
        assert.equal(repeat(5, "x"), "xxxxx");
        assert.equal(repeat(5, "foo"), "foofoofoofoofoo");
    });

    it("should repeat a space the given number of times if no string is provided", function () {
        assert.equal(repeat(5), "     ");
    });

    it("should return the string unchanged if count is 1", function () {
        assert.equal(repeat(1, "x"), "x");
    });

    it("should return an empty string if count is 0", function () {
        assert.equal(repeat(0, "x"), "");
    });

});
