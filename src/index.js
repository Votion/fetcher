'use strict';

const fetch = factory(global.fetch, global.Header, global.FormData);

module.exports = fetcher;