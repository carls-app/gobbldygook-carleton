/* eslint no-var:0 */
/* global module */

// shim Promise because node 0.10 doesn't support native promises
global.Promise = require('bluebird')
var pkg = require('./package.json')
var webpack = require('webpack')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlPlugin = require('./scripts/webpack/html-plugin')
var buildFilename = require('./scripts/webpack/build-filename')

var isProduction = (process.env.NODE_ENV === 'production')
var isDev = (process.env.NODE_ENV === 'development')
var isTest = (process.env.NODE_ENV === 'test')

var entryPoint = './src/start.js'
var outputFolder = 'build/'

var urlLoaderLimit = 10000
var useHash = false

var config = {
	replace: null,
	port: 3000,
	hostname: 'localhost',

	stats: {},

	entry: [
		entryPoint,
	],

	output: {
		path: outputFolder + '/',
		// Name or full path of output directory commonly named `www` or `public`.
		// This is where your fully static site should end up for simple deployment.
		publicPath: '',

		filename: isDev ? 'app.js' : buildFilename(pkg, useHash, 'js'),
		cssFilename: isDev ? 'app.css' : buildFilename(pkg, useHash, 'css'),

		hash: useHash,
	},

	devServer: {
		info: false,
		historyApiFallback: true,
		// For some reason simply setting this doesn't seem to be enough, which
		// is why we also do the manual entry above and the manual adding of
		// the hot module replacment plugin below.
		hot: true,
		contentBase: outputFolder,
		stats: false,
	},

	resolve: {
		extensions: [
			'',
			'.js',
			'.json',
		],
	},

	plugins: [
		new HtmlPlugin({
			// To serve a default HTML file, or not to serve, that is the question.
			html: function(context) {
				return {
					'index.html': [
						'<!DOCTYPE html>',
						'<html lang="en-US">',
						'<meta charset="UTF-8">',
						'<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
						'<title>Gobbldygook</title>',
						context.css && '<link rel="stylesheet" href="' + context.css + '">',
						'<body>',
						'  <main id="app"></main>',
						'  <aside id="notifications"></aside>',
						'</body>',
						'<script src="' + context.main + '"></script>',
						'</html>',
					].join('\n'),
				}
			},
			isDev: isDev,
			package: pkg,
		}),

		new webpack.ProvidePlugin({
			Promise: 'bluebird',
			debug: 'debug',
		}),

		// Ignore the "full" schema in js-yaml's module, because it brings in esprima
		// to support the !!js/function type. We don't use and have no need for it, so
		// tell webpack to ignore it.
		// new webpack.IgnorePlugin(/schema\/default_full/, /js-yaml/),
		new webpack.NormalModuleReplacementPlugin(/schema\/default_full$/, function(result) {
			// console.error('NormalModuleReplacementPlugin', arguments)
			result.request = result.request.replace('default_full', 'default_safe')
		}),
		// new webpack.NormalModuleReplacementPlugin(/babel-runtime\/core-js\/promise/, function(result) {
		// 	result.request = 'bluebird'
		// }),

		new webpack.DefinePlugin({
			VERSION: JSON.stringify(pkg.version),
			DEV: isDev,
		}),
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				// an array, so that it can be added to later
				loaders: ['babel-loader'],
			},
			{
				test: /\.worker.js$/,
				exclude: /node_modules/,
				// an array, so that it can be added to later
				loaders: ['worker-loader', 'babel-loader'],
			},
			{
				test: /\.json$/,
				// an array, so that it can be added to later
				loaders: ['json-loader'],
			},
			{
				test: /\.(otf|eot|ttf|woff2?)$/,
				loader: 'url-loader?limit=' + urlLoaderLimit,
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'url-loader?limit=' + urlLoaderLimit,
			},
		],
	},

	postcss: [
		require('autoprefixer')({ browsers: ['last 2 versions', 'Firefox ESR'] }),
	],
}


// dev specific stuff
if (isDev) {
	// debugging option
	config.devtool = 'eval'

	// add dev server and hotloading clientside code
	config.entry.unshift(
		'webpack-dev-server/client?http://' + config.hostname + ':' + config.port,
		'webpack/hot/only-dev-server'
	)

	config.devServer.port = config.port
	config.devServer.host = config.hostname

	// add dev plugins
	config.plugins = config.plugins.concat([
		new webpack.HotModuleReplacementPlugin(),
	])

	config.module.loaders.push({
		test: /\.css$/,
		loader: 'style-loader!css-loader!postcss-loader',
	})

	// Add optional loaders
	config.module.loaders.push({
		test: /\.s(c|a)ss$/,
		loader: 'style-loader!css-loader!postcss-loader!sass-loader',
	})
}

else if (isTest) {
	config.module.loaders.push({
		test: /\.css$/,
		loader: 'style-loader!css-loader!postcss-loader',
	})

	config.module.loaders.push({
		test: /\.s(c|a)ss$/,
		loader: 'style-loader!css-loader!postcss-loader!sass-loader',
	})
}

// production
else if (isProduction) {
	config.devtool = 'source-map'

	config.stats.children = false

	// minify in production
	config.plugins = config.plugins.concat([
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
		}),
		new ExtractTextPlugin(config.output.cssFilename, {
			allChunks: true,
		}),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('production')},
		}),
	])

	config.module.loaders.push({
		test: /\.css$/,
		loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
	})

	config.module.loaders.push({
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
	})
}

else {
	throw new Error('Unknown environment! Not development, production, nor test!')
}

module.exports = config