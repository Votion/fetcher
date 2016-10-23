'use strict';

const factory = require('./factory');

const fetcher = factory(global.fetch, global.Header, global.FormData);

module.exports = fetcher;