/* eslint no-var:0 */
/* global module */

var HtmlPlugin = require('./webpack/html-plugin')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var pkg = require('./package.json')
var buildFilename = require('./webpack/build-filename')

// figure out if we're running `webpack` or `webpack-dev-server`
// we'll use this as the default for `isDev`
var isDev = (process.argv[1] || '').indexOf('webpack-dev-server') !== -1

var entryPoint = './src/start.js'
var outputFolder = 'build/'

var urlLoaderLimit = 10000
var useHash = false

var config = {
	replace: null,
	port: 3000,
	hostname: 'localhost',

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
						'<meta charset="UTF-8">',
						'<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
						'<title>Gobbldygook</title>',
						context.css && '<link rel="stylesheet" href="' + context.css + '">',
						'<body>',
						'  <main id="app"></main>',
						'  <aside id="notifications"></aside>',
						'</body>',
						'<script src="' + context.main + '"></script>',
					].join('\n'),
				}
			},
			isDev: isDev,
			package: pkg,
		}),
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				// an array, so that it can be added to lated
				loaders: ['babel-loader'],
			},
			{
				test: /\.json$/,
				// an array, so that it can be added to lated
				loaders: ['json'],
			},
			{
				test: /\.(otf|eot|ttf|woff)$/,
				loader: 'url-loader?limit=' + urlLoaderLimit,
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: 'url-loader?limit=' + urlLoaderLimit,
			},
			{
				test: /\.(svg)/,
				loader: 'file-loader',
			},
		],
	},

	postcss: [
		require('autoprefixer-core')(),
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

	config.devServer = config.devServer
	config.devServer.port = config.port
	config.devServer.host = config.hostname

	// add dev plugins
	config.plugins = config.plugins.concat([
		new webpack.HotModuleReplacementPlugin(),
	])

	// add react-hot as module loader if it is installed
	config.module.loaders[0].loaders.unshift('react-hot')

	config.module.loaders.push({
		test: /\.css$/,
		loader: 'style-loader!css-loader!postcss-loader',
	})

	// Add optional loaders
	config.module.loaders.push({
		test: /\.scss$/,
		loader: 'style-loader!css-loader!postcss-loader!sass-loader',
	})
}

// production
else {
	config.devtool = 'source-map'

	// minify in production
	config.plugins.push(
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(true),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
			output: {
				comments: false,
			},
			sourceMap: false,
		}),
		new ExtractTextPlugin(config.output.cssFilename, {
			allChunks: true,
		}),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('production')},
		})
	)

	config.module.loaders.push({
		test: /\.css$/,
		loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
	})

	config.module.loaders.push({
		test: /\.scss$/,
		loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
	})
}

module.exports = config
