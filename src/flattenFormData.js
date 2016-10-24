'use strict';

/**
 * Flatten an object into form data structure
 *
 * @param {object} data
 * @param {[]} flattendData
 * @param {[]} prefix
 */
function flattenObject(data, flattendData = [], prefix = []) {

    for (let name in data) {
        const value = data[name];
        const keyPath = prefix.concat([name]);

        if (isIterable(value)) {
            flattenArray(value, flattendData, keyPath);

        } else if (isObject(value)) {
            flattenObject(value, flattendData, keyPath);

        } else {
            flattendData.push([makeKeyName(keyPath), typeof value === 'object' ? value.valueOf() : value]);
        }
    }
}

/**
 * Flatten an array into form data structure
 *
 * @param {[]} data
 * @param {[]} flattendData
 * @param {[{string}]} prefix
 * @returns {Array}
 */
function flattenArray(data, flattendData = [], prefix = []) {
    for (let i = 0; i < data.length; ++i) {
        const keyPath = prefix.concat(['']); // Need a new instances of this each time although it is the same
        const value = data[i];

        if (isIterable(value)) {
            flattenArray(value, flattendData, keyPath);

        } else if (isObject(value)) {
            flattenObject(value, flattendData, keyPath);

        } else {
            flattendData.push([makeKeyName(keyPath), typeof value === 'object' ? value.valueOf() : value]);
        }
    }
}

/**
 * Check if the item is an object that cannot be converted into a primitive value
 *
 * @param {*} data
 * @returns {boolean}
 */
function isObject(data) {
    return typeof data === 'object' && typeof data.valueOf() === 'object';
}

/**
 * Check if the item is an array
 *
 * @param {*} data
 * @returns {boolean}
 */
function isIterable(data) {
    return data instanceof Array; // TODO check for iterables
}

/**
 * Converts an array of key paths into a from value name: name[][id]
 *
 * @param {[{string}]} keyPath
 * @returns {string}
 */
function makeKeyName(keyPath) {
    const initialKey = keyPath.shift();

    return `${initialKey}[${keyPath.join('][')}]`;
}

/**
 * Convert an object into an array of items that have key and value
 *
 * @example
 * {
 *   foo: [
 *     {
 *       bar: 77
 *     },
 *     'car'
 *   ]
 * }
 *
 * Becomes
 * [
 *   ['foo[][bar]', 77],
 *   ['foo[]', 'car']
 * ]
 *
 * @param {{}} data
 * @returns {Array}
 */
function flattenFormData(data) {
    if (!isObject(data)) {
        return [];
    }

    const flattenData = [];
    flattenObject(data, flattenData);
    return flattenData;
}

module.exports = flattenFormData;