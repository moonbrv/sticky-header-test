'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';

console.log('*********************************')
console.log('----- ' + 'NODE_ENV = ' + NODE_ENV + ' -----');
console.log('*********************************')

module.exports = {
	resolve: {
		extensions: ['', '.js', '.scss']
	},

	entry: __dirname + '/assets/js/index',
	
	output: {
		path: __dirname + '/public',
		publicPath: '',
		filename: '[name]-[hash:6].bundle.js',
		chunkFilename: '[id]-[hash:6].bundle.js'
	},

	devtool: null,

	module: {
		preLoaders: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'eslint'
		}
		],
		loaders: [
		{
			test: /\.scss$/,
			loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!resolve-url!sass?sourceMap')
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				cacheDirectory: true
			}
		}
		]
	},

	postcss: [
	autoprefixer({
		browsers: [
		'last 2 versions'
		]
	}),
	cssnano()
	],

	plugins: [
	new webpack.optimize.OccurenceOrderPlugin(),

	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		},
		output: {
			comments: false
		}
	}),
	new CleanWebpackPlugin(['public']),
	new HtmlWebpackPlugin({
		template: __dirname + '/assets/index.tmpl.html',
		filename: __dirname + '/public/index.html'
	}),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(NODE_ENV)
	}),
	new ExtractTextPlugin(
		'style-[hash:6].css',
		{
			allChunks: true,
		}
		)
	]
}