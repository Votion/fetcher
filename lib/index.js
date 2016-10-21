(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("fetch"), require("Headers"), require("FormData"));
	else if(typeof define === 'function' && define.amd)
		define("fetcher", ["fetch", "Headers", "FormData"], factory);
	else if(typeof exports === 'object')
		exports["fetcher"] = factory(require("fetch"), require("Headers"), require("FormData"));
	else
		root["fetcher"] = factory(root["fetch"], root["Headers"], root["FormData"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var fetch = __webpack_require__(2);
	var Headers = __webpack_require__(3);
	var FormData = __webpack_require__(4);
	var flattenFormData = __webpack_require__(5);

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
	function fetcher(actionUrl) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	    var method = (options.method || 'GET').toUpperCase();

	    // Headers
	    var headers = new Headers();

	    var dataFormat = options.dataFormat;
	    var acceptMimeType = dataTypeToAccept(dataFormat);
	    if (acceptMimeType) {
	        headers.set('Accept', acceptMimeType);
	    }

	    if (options.headers) {
	        for (var headerName in options.headers) {
	            headers.set(headerName, options.headers[headerName]);
	        }
	    }

	    // Body
	    var body = null;

	    if (method !== 'GET' && method !== 'HEAD') {
	        body = createBody(data, options.bodyFormat || 'form');
	    }

	    // Make the request
	    var fetchOptions = {
	        method: method,
	        headers: headers,
	        body: body
	    };

	    var fetchJsonPromise = new Promise(function (accept, reject) {
	        fetch(actionUrl, fetchOptions).then(function (response) {
	            if (response.ok !== false) {
	                return accept({ data: convertResponseContent(response, acceptMimeType), response: response });
	            } else {
	                return reject(response);
	            }
	        });
	    });

	    // Force a min delay before a response is given
	    if (options.minDelay) {
	        return Promise.all([fetchJsonPromise, Promise.delay(options.minDelay)]).then(function (values) {
	            return new Promise(function (resolve) {
	                return resolve(values[0]);
	            });
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
	        var _flattenFormData = _flattenFormData(data);
	        var formData = new FormData();
	        for (var varName in _flattenFormData) {
	            formData.append(varName, _flattenFormData[varName]);
	        }
	        return formData;
	    }

	    return null;
	}

	var dataTypesToMimeTypes = {
	    'json': 'application/json'
	};

	function dataTypeToAccept(dataType) {
	    return dataType && dataType in dataTypesToMimeTypes && dataTypesToMimeTypes[dataType];
	}

	function convertResponseContent(response) {
	    var forceMimeType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

	    // TODO Detect the mime-type from the Content-Type
	    // const responseContentType = response.headers.get('Content-Type');
	    var mimeType = forceMimeType;

	    if (mimeType === 'application/json') {
	        return response.json();
	    }

	    // TODO Add checks for other content types
	    return response.text();
	}

	module.exports = fetcher;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Flatten an object into form data structure
	 *
	 * @param {object} data
	 * @param {[]} flattendData
	 * @param {[]} prefix
	 */

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function flattenObject(data) {
	    var flattendData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];


	    for (var name in data) {
	        var value = data[name];
	        var keyPath = prefix.concat([name]);

	        if (isIterable(value)) {
	            flattenArray(value, flattendData, keyPath);
	        } else if (isObject(value)) {
	            flattenObject(value, flattendData, keyPath);
	        } else {
	            flattendData.push([makeKeyName(keyPath), (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.valueOf() : value]);
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
	function flattenArray(data) {
	    var flattendData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	    var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

	    var keyPath = prefix.concat(['']);

	    for (var i = 0; i < data.length; ++i) {
	        var value = data[i];

	        if (isIterable(value)) {
	            flattenArray(value, flattendData, keyPath);
	        } else if (isObject(value)) {
	            flattenObject(value, flattendData, keyPath);
	        } else {
	            flattendData.push([makeKeyName(keyPath), (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.valueOf() : value]);
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
	    return (typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && _typeof(data.valueOf()) === 'object';
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
	    var initialKey = keyPath.shift();

	    return initialKey + '[' + keyPath.join('][') + ']';
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

	    var flattenData = [];
	    flattenObject(data, flattenData);
	    return flattenData;
	}

	module.exports = flattenFormData;

/***/ }
/******/ ])
});
;