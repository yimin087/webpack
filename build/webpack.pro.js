const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurifyCSS = require('purifycss-webpack')
const glob = require('glob-all')
const webpack = require('webpack')

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const proConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        include: path.resolve(__dirname, '../src'),
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  // externals : {
  //   jquery: 'jQuery'
  // },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
      chunkFilename: '[id].css',
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    // 清除⽆⽤ css
    new PurifyCSS({
        paths: glob.sync([
        path.resolve(__dirname, '../src/*.html'),
        path.resolve(__dirname, '../src/*.js')
      ])
    }),
    new webpack.DefinePlugin({
      'SERVICE_URL': JSON.stringify('https://dev.example.com')
    }),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}

module.exports = smp.wrap(proConfig)
