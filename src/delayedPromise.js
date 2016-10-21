'use strict';

/**
 * Create a promise that resolves after a duration in milliseconds
 *
 * @param {number} duration
 * @returns {Promise}
 */
function delayedPromise(duration) {
    const promise = new Promise(function(resolve, reject){
        setTimeout(resolve, duration)
    });
    return promise;
}

module.exports = delayedPromise;
        