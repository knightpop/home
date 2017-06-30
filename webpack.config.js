const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './react/index',
    output: {
        path: path.join(__dirname, 'assets/js'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js']
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'react')
            }
        ]
    }
};
