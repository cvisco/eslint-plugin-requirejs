"use strict";

var assert = require("assert");
var repeat = require("../../../lib/utils/repeat");

describe("repeat", function () {

    it("should repeat a string the given number of times", function () {
        var actual = repeat(5, "foo");
        var expected = "foofoofoofoofoo";

        assert.equal(actual, expected);
    });

    it("should handle an empty string", function () {
        var actual = repeat(5, "");
        var expected = "";

        assert.equal(actual, expected);
    });

    it("should use a space character if no string is provided", function () {
        var actual = repeat(5);
        var expected = "     ";

        assert.equal(actual, expected);
    });

    it("should return the string unchanged if count is 1", function () {
        var actual = repeat(1, "x");
        var expected = "x";

        assert.equal(actual, expected);
    });

    it("should return an empty string if count is 0", function () {
        var actual = repeat(0, "x");
        var expected = "";

        assert.equal(actual, expected);
    });

});
