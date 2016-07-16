"use strict";

var assert = require("assert");
var unique = require("../../../lib/utils/unique");

describe("unique", function () {

    it("should return unique values of an unsorted array", function () {
        var actual = unique([2, 1, 2]);
        var expected = [2, 1];

        assert.deepEqual(actual, expected);
    });

    it("should return unique values of an sorted array", function () {
        var actual = unique([1, 2, 2]);
        var expected = [1, 2];

        assert.deepEqual(actual, expected);
    });

    it("should treat `-0` as `0`", function () {
        var actual = unique([-0, 0]);
        var expected = [0];

        assert.deepEqual(actual, expected);
    });

    it("should return the same list if no duplicates are present", function () {
        var actual = unique([1, 2, 3]);
        var expected = [1, 2, 3];

        assert.deepEqual(actual, expected);
    });

    it("should handle string arrays", function () {
        var actual = unique(["a", "b", "a"]);
        var expected = ["a", "b"];

        assert.deepEqual(actual, expected);
    });

    it("should handle empty arrays", function () {
        var actual = unique([]);
        var expected = [];

        assert.deepEqual(actual, expected);
    });

});
