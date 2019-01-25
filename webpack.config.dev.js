var ExtractTextPlugin = require('extract-text-webpack-plugin');
import path from 'path'
import webpack from 'webpack'

export default {
	devtools: 'eval-source-map',
	entry: [
		'webpack-hot-middleware/client', 
		path.join(__dirname, '/client/index.js')
	],
	output: {
		path: '/',
		publicPath: '/'
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.join(__dirname, 'client'),
				loaders: ['react-hot', 'babel']
			},
			{
				test: /\.(jpg|png|gif|svg|pdf|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name]-[hash:8].[ext]'
						},
					},
				]
			},
			{ test: /\.css$/, loader: 'style-loader!css-loader'},
		]
	},
	resolve: {
		extentions: ['', '.js']
	}
}