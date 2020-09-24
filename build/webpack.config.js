const baseConfig = require('./webpack.base.js')
const devConfig = require('./webpack.dev.js')
const porConfig = require('./webpack.pro.js')
const { merge } = require('webpack-merge')

module.exports = () => {
  const { NODE_ENV } = process.env || {}
  if (NODE_ENV === 'production') {
    return merge(baseConfig, porConfig)
  } else {
    return merge(baseConfig, devConfig)
  }
}