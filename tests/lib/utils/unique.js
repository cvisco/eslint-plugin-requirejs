"use strict";

const assert = require("assert");
const unique = require("../../../lib/utils/unique");

describe("unique", function () {

    it("should return unique values of an unsorted array", function () {
        const actual = unique([2, 1, 2]);
        const expected = [2, 1];

        assert.deepEqual(actual, expected);
    });

    it("should return unique values of an sorted array", function () {
        const actual = unique([1, 2, 2]);
        const expected = [1, 2];

        assert.deepEqual(actual, expected);
    });

    it("should treat `-0` as `0`", function () {
        const actual = unique([-0, 0]);
        const expected = [0];

        assert.deepEqual(actual, expected);
    });

    it("should return the same list if no duplicates are present", function () {
        const actual = unique([1, 2, 3]);
        const expected = [1, 2, 3];

        assert.deepEqual(actual, expected);
    });

    it("should handle string arrays", function () {
        const actual = unique(["a", "b", "a"]);
        const expected = ["a", "b"];

        assert.deepEqual(actual, expected);
    });

    it("should handle empty arrays", function () {
        const actual = unique([]);
        const expected = [];

        assert.deepEqual(actual, expected);
    });

});
