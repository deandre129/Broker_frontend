const webpack = require('webpack');

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
  });

module.exports = withBundleAnalyzer({
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
});