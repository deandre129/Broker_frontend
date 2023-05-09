const webpack = require('webpack');

module.exports = {
    webpack(config) {
        config.plugins.push(
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1,
            })
        );
        config.plugins.push(
            new webpack.optimize.MinChunkSizePlugin({
                minChunkSize: 1000 * 1000,
            })
        );

        return config;
    },
};