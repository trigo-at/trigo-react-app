import path from 'path';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import jsdom from 'jsdom';
import cssHook from 'css-modules-require-hook';
import assetHook from 'asset-require-hook';
import sass from 'node-sass';

cssHook({
	extensions: ['.scss'],
	generateScopedName: '[name]---[local]---[hash:base64:5]',
	preprocessCss: (data) => {
		return sass.renderSync({
			data,
			includePaths: [
				path.join(__dirname, '../src'),
				path.join(__dirname, '../node_modules'),
			],
		}).css;
	},
});

assetHook({
	extensions: ['jpg'],
	limit: 512000,
});

chai.use(chaiEnzyme());
chai.use(sinonChai);

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;
global.window.localStorage = {};
