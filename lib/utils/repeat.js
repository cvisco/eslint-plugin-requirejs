"use strict";

/**
 * Repeat a string n times
 * @param {Number} count - number of times `string` should be repeated
 * @param {String} str - string to repeat
 * @returns {String} repeated string
 */
module.exports = function (count, str) {
    var result = "";

    str = typeof str === "string" ? str : " ";

    while (count--) {
        result += str;
    }

    return result;
};
