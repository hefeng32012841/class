var webpackConfig = require('./make-webpack.config.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

var host = '172.17.120.120';

var webpackConf = webpackConfig({
    debug: true,
    devServer: {
        host: host,
        hot: true,
        port: 3000,
        historyApiFallback: true,
        compress: true,
    }
});

webpackConf.plugins.push(
    new htmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'index.html'),
        inject: 'body',
        chunks: ['loader', 'vendor', 'common', 'index']
    }),

    new webpack.HotModuleReplacementPlugin()
);
console.log(webpackConf)
module.exports = webpackConf;
