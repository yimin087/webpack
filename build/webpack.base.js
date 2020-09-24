const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[hash:8].js'
  },
  module: {
    rules: [
      { 
        test: /\.js|jsx$/, 
        include: path.resolve(__dirname, '../src'),
        loader: "babel-loader" 
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024 * 8
            }
          }
        ]
      },
      { 
        test: /\.(ttf|eot|svg|woff|woff2)$/, 
        include: path.resolve(__dirname, '../src'),
        use: 'url-loader'
      }
    ]
  }
}
