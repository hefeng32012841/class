var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = function (options) {
    var vendor = ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'redux-thunk'];
    var ROOT_PATH = process.cwd();

    var babelOpions = {
        presets: [
            'react',
            'es2015',
            'stage-0'
        ],
        plugins: [
            'transform-runtime',
            'transform-decorators-legacy',
            ["import", { libraryName: "antd", style: true }]
        ]
    };

    var jsxLoaders = [
        {
            loader: 'babel-loader',
            options: babelOpions
        }
    ];
    if (options.debug && options.devServer) {
        vendor.concat([
            'webpack-dev-server/client?http://' + options.devServer.host + ':' + options.devServer.port,
            'webpack/hot/only-dev-server'
        ]);

        jsxLoaders.unshift({
            loader: 'react-hot-loader'
        });
    }

    var webpackConfig = {
        entry: {
            index: path.join(ROOT_PATH, 'index.jsx'),
            vendor: vendor
        },
        output: {
            filename: options.debug ? '[name].js' : '[name][chunkhash:8].min.js',
            path: path.join(ROOT_PATH, './dist/'),
            chunkFilename: options.debug ? 'chunk.js' : 'chunk[chunkhash:8].min.js'
        },

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: jsxLoaders
                },
                {
                    test: /\.less$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'autoprefixer-loader',
                            'less-loader'
                        ]
                    })
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            'autoprefixer-loader'
                        ]
                    })
                },
                {
                    test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff(2))(\?[=a-z0-9]+)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: '10000',
                            name: 'fonts/[name].[ext]'
                        }
                    }
                },
                {
                    test: /\.html$/,
                    use: 'html-loader'
                },
            ]
        },

        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: ['common', 'vendor', 'loader'],
                minChunks: 2
            }),

            new ExtractTextPlugin({
                filename: '[name].css',
                disable: true,
                allChunks: true
            }),

            new webpack.optimize.ModuleConcatenationPlugin()
        ],

        resolve: {
            extensions: ['.jsx', '.js', '.scss', '.css', '.html']
        }
    }

    if (options.debug && options.devServer) {
        webpackConfig.devServer = options.devServer;
        webpackConfig.devtool = 'source-map';
    }

    if (!options.debug) {
        webpackConfig.plugins.push(
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('"production"')
            })
        )
    }

    return webpackConfig;
};