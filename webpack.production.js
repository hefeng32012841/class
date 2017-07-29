var webpackConfig = require('./make-webpack.config.js');
var htmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConf = webpackConfig({
    debug: false
});

webpackConf.plugins.push(
    new htmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, 'index.html'),
        inject: 'body',
        chunks: ['loader', 'vendor', 'common', 'index']
    })
);

webpackConf.devtool = false;
console.log(webpackConf)
module.exports = webpackConf;
