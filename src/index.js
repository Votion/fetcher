'use strict';

const fetch = require('fetch');
const Headers = require('Headers');
const FormData = require('FormData');
const flattenFormData = require('./flattenFormData');

/**
 * Fetch data for a URL
 *
 * @param {string} actionUrl
 * @param {{}} options
 * @param {string} [options.method='GET']
 * @param {string} options.dataFormat - Shorthand for the Accept header and convert content-type. 'json'
 * @param {{}} options.headers - Set header values
 * @param {string} [options.bodyFormat='form'] - How to format the data in the body
 * @param {{}} data - The data to send in the body
 *
 * @returns {Promise}
 */
function fetcher(actionUrl, options = {}, data = null) {
    const method = (options.method || 'GET').toUpperCase();

    // Headers
    const headers = new Headers();

    const dataFormat = options.dataFormat;
    const acceptMimeType = dataTypeToAccept(dataFormat);
    if (acceptMimeType) {
        headers.set('Accept', acceptMimeType);
    }

    if (options.headers) {
        for (let headerName in options.headers) {
            headers.set(headerName, options.headers[headerName]);
        }
    }

    // Body
    let body = null;

    if (method !== 'GET' && method !== 'HEAD') {
        body = createBody(data, options.bodyFormat || 'form');
    }

    // Make the request
    const fetchOptions = {
        method,
        headers,
        body
    };

    const fetchJsonPromise = new Promise(function(accept, reject) {
        fetch(actionUrl, fetchOptions)
            .then(function(response) {
                if (response.ok !== false) {
                    return accept({data: convertResponseContent(response, acceptMimeType), response});
                } else {
                    return reject(response);
                }
            });
    });


    // Force a min delay before a response is given
    if (options.minDelay) {
        return Promise.all([fetchJsonPromise, Promise.delay(options.minDelay)])
            .then(function (values) {
                return new Promise((resolve) => resolve(values[0]));
            });
    } else {
        return fetchJsonPromise;
    }
}

function createBody(data, format) {
    if (data == null) {
        return data;
    }

    if (format === 'json') {
        return JSON.stringify(data);
    }

    if (format === 'form') {
        const flattenFormData = flattenFormData(data);
        const formData = new FormData();
        for (let varName in flattenFormData) {
            formData.append(varName, flattenFormData[varName]);
        }
        return formData;
    }

    return null;
}

const dataTypesToMimeTypes = {
    'json': 'application/json'
};

function dataTypeToAccept(dataType) {
    return dataType && (dataType in dataTypesToMimeTypes) && dataTypesToMimeTypes[dataType];
}

function convertResponseContent(response, forceMimeType = null) {
    // TODO Detect the mime-type from the Content-Type
    // const responseContentType = response.headers.get('Content-Type');
    const mimeType = forceMimeType;

    if (mimeType === 'application/json') {
        return response.json();
    }

    // TODO Add checks for other content types
    return response.text();

}

module.exports = fetcher;