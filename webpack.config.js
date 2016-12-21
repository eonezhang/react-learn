var path = require('path')
var webpack = require('webpack')
var glob = require('glob')
var HTMLWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackTemplate = require('html-webpack-template')

// const hmre = 'webpack-hot-middleware/client'

let entries = glob.sync('src/app/*.js')
// console.log(entries)
const entry = {}
const config = {
  dir_base: path.resolve(__dirname, '.')
}
entries.forEach(item => {
  entry[path.basename(item, '.js')] = [path.resolve(config.dir_base + '/' + item)]
})
// console.log(entry)



var webpackConfig = {
  devtool: 'cheap-module-eval-source-map',
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },

  resolve: {
    root: path.resolve('./src'),
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx', '.json', '.css', '.less']
  },

  plugins: [],

  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel'],
        include: __dirname
      },
      {
        test: /\.json$/,
        loaders: ['json'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}

webpackConfig.plugins.push(new HTMLWebpackPlugin({
  title: 'Sample',
  entry: entry,
  inject: false,
  template: `${config.dir_base}/index.ejs`
}))

Object.keys(entry).forEach(item => {
  webpackConfig.plugins.push(new HTMLWebpackPlugin({
    title: `Demo: ${item}`,
    appMountId: 'root',
    chunks: [item],
    inject: false,
    filename: `${item}/index.html`,
    template: HTMLWebpackTemplate
  }))
})

webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin())
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin())

// console.log(JSON.stringify(webpackConfig))
module.exports = webpackConfig
