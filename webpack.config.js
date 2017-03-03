const webpack = require('webpack');
const path = require('path');

const plugins = [];
plugins.push(new webpack.DefinePlugin({
	'process.env.NODE_ENV': JSON.stringify('production'),
}));
plugins.push(new webpack.optimize.UglifyJsPlugin({
	sourceMap: true,
	beautify: false,
	mangle: {
		screw_ie8: true,
		keep_fnames: true,
	},
	compress: {
		screw_ie8: true,
	},
	comments: false,
}));

const config = {
	entry: {
		app: ['./src/index.js'],
	},
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: 'trigo-react-app.js',
		library: 'trigo-react-app',
		libraryTarget: 'umd',
	},
	externals: {
		ramda: 'ramda',
		react: 'react',
		'react-dom': 'react-dom',
		'react-redux': 'react-redux',
		'react-router5': 'react-router5',
		'react-tap-event-plugin': 'react-tap-event-plugin',
		redux: 'redux',
		'redux-logger': 'redux-logger',
		'redux-router5': 'redux-router5',
		router5: 'router5',
		'normalize.css': 'normalize.css',
		'styled-components': 'styled-components',
	},
	module: {
		rules: [
			{ test: /\.jsx?$/, enforce: 'pre', loader: 'eslint-loader', exclude: /node_modules/ },
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					babelrc: false,
					presets: [
						['es2015', { modules: false }],
						'react',
					],
					plugins: [
						'transform-regenerator',
						['transform-object-rest-spread', { useBuiltIns: true }],
						'transform-runtime',
						'transform-class-properties',
					],
				},
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { minimize: true },
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.css'],
	},
	plugins: [
		...plugins,
	],
};

module.exports = config;
