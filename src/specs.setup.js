import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import jsdom from 'jsdom';
import assetHook from 'asset-require-hook';

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
