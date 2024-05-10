const withOffline = require('next-offline');

const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const CompressionPlugin  = require('compression-webpack-plugin')
// const nextConfig = {
//   onDemandEntries: {
//     // period (in ms) where the server will keep pages in the buffer
//     maxInactiveAge: 50 * 1000,
//     // number of pages that should be kept simultaneously without being disposed
//     pagesBufferLength: 5,
//   }
// }
module.exports = withOffline({
  // ...withCSS(withSass({
  //   webpack (config) {
  //     // config.module.rules.push({
  //     //   test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
  //     //   use: {
  //     //     loader: 'url-loader',
  //     //     options: {
  //     //       limit: 8192,
  //     //       publicPath: '/_next/static/',
  //     //       outputPath: 'static/',
  //     //       name: '[name].[ext]'
  //     //     }
  //     //   }
  //     // })

  //     config.optimization.splitChunks.cacheGroups = {
  //       // Merge all the CSS into one file
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //       // Merge all the JS into one file
  //       commons: {
  //         name: 'commons',
  //         chunks: 'all',
  //         minChunks: 1,
  //       },
  //     };

  //     config.optimization.splitChunks.maxSize = 200000;
  //     config.optimization.splitChunks.chunks = 'all';

  //     config.plugins.push(
  //       new CompressionPlugin({
  //         filename: '[path][base].gz',
  //         algorithm: 'gzip',
  //         // test: /\.js$|\.css$|\.html$/,
  //         test: /\.(js|css|html|svg|png)$/,
  //         threshold: 8192,
  //         minRatio: 0.8,
  //       }),
  //     );

  //     return config;
  //   }
  // })
  // ),
  // ...nextConfig
});