const path = require('path');
const webpack = require('webpack');

module.exports = {
	watch: true,
	entry: {
		'SnowStorm': `./src/index.js`,
		'SnowStorm.min':`./src/index.js`
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js'
	},
	module: {
		loaders: [
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015', 'stage-0']
				},
				exclude: /(node_modules|bower_components)/
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			include: /\.js$/,
			beautify: true,
			minimize: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			minimize: true
		})
	]
};
