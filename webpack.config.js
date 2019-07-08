const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	mode: 'development',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.join(__dirname, 'assets'),
				to: 'assets'
			}
		]),
		new webpack.ProvidePlugin({
			$: 'jquery'
		})
	],
	module: {
		rules: [
			// 配置的是用来解析.css文件的loader(style-loader和css-loader)
			{
				// 用正则匹配当前访问的文件的后缀名是  .css
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					'postcss-loader'
				] // webpack底层调用这些包的顺序是从右到左
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'less-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2
						}
					},
					'sass-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.(png|jpg|gif)/,
				use: [
					{
						loader: 'url-loader',
						options: {
							// limit表示如果图片大于5KB，就以路径形式展示，小于的话就用base64格式展示
							limit: 5 * 1024,
							// 打包输出目录
							outputPath: 'images',
							// 打包输出图片名称
							name: '[name]-[hash:4].[ext]'
						}
					}
				]
			},
			{test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'},
			{
				test: /\.(htm|html)$/i,
				loader: 'html-withimg-loader'
			}
		]
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000,
		host: '0.0.0.0',
		hot: true,
		overlay: {
			warnings: true,
			errors: true
		}
	}
}
