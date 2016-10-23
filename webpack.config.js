'use strict';

const webpack = require('webpack');
const path = require('path');
const libraryName = 'fetcher';

const config = {
    entry: {
        fetcher: ['./src/index']
    },
    output: {
        path: './lib',
        filename: 'index.js',
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    comments: false
                },

                plugins: ['transform-runtime']
            }
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['.js']
    },

    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
};

module.exports = config;