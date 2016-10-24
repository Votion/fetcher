!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define("fetcher", [], factory) : "object" == typeof exports ? exports.fetcher = factory() : root.fetcher = factory();
}(this, function() {
    /******/
    return function(modules) {
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                exports: {},
                /******/
                id: moduleId,
                /******/
                loaded: !1
            };
            /******/
            /******/
            // Return the exports of the module
            /******/
            /******/
            /******/
            // Execute the module function
            /******/
            /******/
            /******/
            // Flag the module as loaded
            /******/
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // Load entry module and return exports
        /******/
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        /******/
        /******/
        // expose the module cache
        /******/
        /******/
        /******/
        // __webpack_public_path__
        /******/
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = __webpack_require__(1);
    }, /* 1 */
    /***/
    function(module, exports, __webpack_require__) {
        /* WEBPACK VAR INJECTION */
        (function(global) {
            "use strict";
            var factory = __webpack_require__(2), fetcher = factory(global.fetch, global.Header, global.FormData);
            module.exports = fetcher;
        }).call(exports, function() {
            return this;
        }());
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        function factory(fetch, Header, FormData) {
            function fetcher(actionUrl) {
                var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {}, data = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null, method = (options.method || "GET").toUpperCase(), headers = new Headers(), dataFormat = options.dataFormat, acceptMimeType = dataTypeToAccept(dataFormat);
                if (acceptMimeType && headers.set("Accept", acceptMimeType), options.headers) for (var headerName in options.headers) headers.set(headerName, options.headers[headerName]);
                var body = null;
                "GET" !== method && "HEAD" !== method && (body = createBody(data, options.bodyFormat || "form"));
                var fetchOptions = {
                    method: method,
                    headers: headers,
                    body: body
                }, fetchJsonPromise = new Promise(function(accept, reject) {
                    fetch(actionUrl, fetchOptions).then(function(response) {
                        return response.ok !== !1 ? accept({
                            data: convertResponseContent(response, acceptMimeType),
                            response: response
                        }) : reject(response);
                    });
                });
                return options.minDelay ? Promise.all([ fetchJsonPromise, Promise.delay(options.minDelay) ]).then(function(values) {
                    return new Promise(function(resolve) {
                        return resolve(values[0]);
                    });
                }) : fetchJsonPromise;
            }
            function createBody(data, format) {
                if (null == data) return data;
                if ("json" === format) return JSON.stringify(data);
                if ("form" === format) {
                    var formDataNameValue = flattenFormData(data), formData = new FormData();
                    for (var varName in formDataNameValue) formData.append(varName, formDataNameValue[varName]);
                    return formData;
                }
                return null;
            }
            return fetcher;
        }
        function dataTypeToAccept(dataType) {
            return dataType && dataType in dataTypesToMimeTypes && dataTypesToMimeTypes[dataType];
        }
        function convertResponseContent(response) {
            var forceMimeType = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null, mimeType = forceMimeType;
            return "application/json" === mimeType ? response.json() : response.text();
        }
        var flattenFormData = __webpack_require__(3), dataTypesToMimeTypes = {
            json: "application/json"
        };
        module.exports = factory;
    }, /* 3 */
    /***/
    function(module, exports) {
        "use strict";
        function flattenObject(data) {
            var flattendData = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], prefix = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [];
            for (var name in data) {
                var value = data[name], keyPath = prefix.concat([ name ]);
                isIterable(value) ? flattenArray(value, flattendData, keyPath) : isObject(value) ? flattenObject(value, flattendData, keyPath) : flattendData.push([ makeKeyName(keyPath), "object" === ("undefined" == typeof value ? "undefined" : _typeof(value)) ? value.valueOf() : value ]);
            }
        }
        function flattenArray(data) {
            for (var flattendData = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [], prefix = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : [], keyPath = prefix.concat([ "" ]), i = 0; i < data.length; ++i) {
                var value = data[i];
                isIterable(value) ? flattenArray(value, flattendData, keyPath) : isObject(value) ? flattenObject(value, flattendData, keyPath) : flattendData.push([ makeKeyName(keyPath), "object" === ("undefined" == typeof value ? "undefined" : _typeof(value)) ? value.valueOf() : value ]);
            }
        }
        function isObject(data) {
            return "object" === ("undefined" == typeof data ? "undefined" : _typeof(data)) && "object" === _typeof(data.valueOf());
        }
        function isIterable(data) {
            return data instanceof Array;
        }
        function makeKeyName(keyPath) {
            var initialKey = keyPath.shift();
            return initialKey + "[" + keyPath.join("][") + "]";
        }
        function flattenFormData(data) {
            if (!isObject(data)) return [];
            var flattenData = [];
            return flattenObject(data, flattenData), flattenData;
        }
        var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        module.exports = flattenFormData;
    } ]);
});