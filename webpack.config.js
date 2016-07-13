'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
const rimraf = require('rimraf');
const autoprefixer = require('autoprefixer');
const cssdeclsort = require('css-declaration-sorter');

const NODE_ENV = process.env.NODE_ENV || 'development';

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
		publicPath: '/',
		filename: '[name].bundle.js',
		chunkFilename: '[id].bundle.js'
	},

	devtool: 'eval',

	devServer: {
		contentBase: __dirname + '/public',
		colors: true,
		historyApiFallback: true
	},

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
			loader: 'style!css?sourceMap!postcss!resolve-url!sass?sourceMap'
		},
		{
			test: /\.html$/,
			loader: 'raw'
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
	cssdeclsort({
		order: 'smacss'
	}),
	cssnano()
	],

	plugins: [
	new webpack.optimize.OccurenceOrderPlugin(),
	
	/**
	*	Sync delete public folder. Because when you use clean-webpack-plugin 
	*	and want to combo "webpack && webpack-dev-server --hot --inline"
	*	plugin will launch two times, when webpack start building process, 
	*	and second time right before launch dev-server, server will have no folder to serve from.
	*	So i use rifraf :P
	*/
	{
		apply: (compiler) => {
			rimraf.sync(compiler.options.output.path)
		}
	},
	new HtmlWebpackPlugin({
		template: __dirname + '/assets/index.tmpl.html',
	}),
	new webpack.DefinePlugin({
		NODE_ENV: JSON.stringify(NODE_ENV)
	}),
	]
}