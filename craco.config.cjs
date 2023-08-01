const webpack = require('webpack');

module.exports = {
    webpack: {
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser',
            }),
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            }),
            new webpack.DefinePlugin({
                process: {env: {}}
            })
        ],
        configure: {
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        resolve: {
                            fullySpecified: false,
                        },
                    },
                ],
            },
        },
        configure: (webpackConfig, { env, paths }) => {
            /* ... */
            webpackConfig.resolve.fallback = webpackConfig.resolve.fallback || {}
            webpackConfig.resolve.fallback.child_process = webpackConfig.resolve.fallback?.child_process ?? false
            webpackConfig.resolve.fallback.net = webpackConfig.resolve.fallback.net ?? false
            webpackConfig.resolve.fallback.tls = webpackConfig.resolve.tls ?? false
            webpackConfig.resolve.fallback.dns = webpackConfig.resolve.dns ?? false
            webpackConfig.resolve.fallback.stream = webpackConfig.resolve.stream ?? false
            webpackConfig.resolve.fallback.path = webpackConfig.resolve.fallback.path ?? require.resolve("path-browserify")
            // webpackConfig.resolve.fallback.stream = webpackConfig.resolve.fallback.stream ?? require.resolve("stream-browserify")
            webpackConfig.resolve.fallback.fs = webpackConfig.resolve.fallback.fs ?? require.resolve("browserify-fs")
            webpackConfig.resolve.fallback.crypto = webpackConfig.resolve.fallback.crypto ?? require.resolve("crypto-browserify")
            webpackConfig.resolve.fallback.http = webpackConfig.resolve.fallback.http ?? require.resolve("stream-http")
            webpackConfig.resolve.fallback.https = webpackConfig.resolve.fallback.https ?? require.resolve("https-browserify")
            webpackConfig.resolve.fallback.zlib = webpackConfig.resolve.fallback.zlib ?? require.resolve("browserify-zlib")
            webpackConfig.resolve.fallback.buffer = webpackConfig.resolve.fallback.buffer ?? require.resolve("buffer")
            return webpackConfig;
        },
    },
};