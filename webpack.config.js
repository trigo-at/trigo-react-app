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
		app: ['./src/ReactApplication.jsx'],
	},
	devtool: 'cheap-module-source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/static/',
		filename: 'trigo-react-app.js',
		library: 'ReactApplication',
		libraryTarget: 'umd',
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
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		...plugins,
	],
};

module.exports = config;
