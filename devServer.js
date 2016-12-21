import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import webpackConfig from './webpack.config'

const host = 'localhost'
const port = 3000
for (let [k, item] of Object.entries(webpackConfig.entry)) {
  item.unshift(`webpack-dev-server/client?http://${host}:${port}/`, 'webpack/hot/dev-server')
}

const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, {
  host,
  port,
  hot: true,
  quiet: true,
  noInfo: false,
  lazy: false,
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  compress: true
})

server.listen(port, 'localhost', () => {
  console.log(`server is now running at http://${host}:${port}/`)
})
