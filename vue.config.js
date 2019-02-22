const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

module.exports = {
  configureWebpack: config => {
    if (process.env.npm_lifecycle_event === 'serve') {
      // mutate config for production...
      return {
        plugins: [
          new BundleAnalyzerPlugin({
            openAnalyzer: false
          })
        ],
        resolve: {
          alias: {
            'jquery': 'jquery/dist/jquery.js'
          }
        }
      }
    } else {
      // mutate for development...
      return {
        resolve: {
          alias: {
            'jquery': 'jquery/dist/jquery.js'
          }
        }
      }
    }
  },
  chainWebpack: config => {
    config
      .plugin('provide')
      .use(webpack.ProvidePlugin, [{
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      }])
  },
  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ]
}
