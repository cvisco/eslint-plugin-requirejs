"use strict";

/**
 * Creates a duplicate-free version of an array
 * @param {Array} array - the array to inspect
 * @returns {Array} duplicate-free array
 */
module.exports = function (array) {
    return array.filter(function (item, i) {
        return array.indexOf(item) === i;
    });
};
