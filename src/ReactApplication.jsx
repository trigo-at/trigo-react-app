import React, { Component } from 'react';
import { oneOfType, arrayOf, array, node, object, string } from 'prop-types';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import { ThemeProvider, injectGlobal } from 'styled-components';
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'normalize.css';
import configureStore from './configureStore';
import configureRouter from './configureRouter';

injectTapEventPlugin();

/* eslint-disable no-unused-expressions */
injectGlobal`
	@import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
	* {
		box-sizing: border-box;
		-webkit-appearance: none;
		appearance:none;
		outline: none;
	}

	html {
		height: 100%;
	}

	button,
	input,
	optgroup,
	select,
	textarea {
		font-size: 100%;
	}

	.appContainer {
		font-family: 'Roboto', sans-serif;
		font-size: 16px;
		min-height: 100%;
		height: 100%;
		margin: 0;
	}
`;
/* eslint-enable no-unused-expressions */

const propTypes = {
	children: oneOfType([
		arrayOf(node),
		node,
	]).isRequired,
	reducers: object.isRequired,
	routes: array,
	middlewares: array,
	defaultRoute: string,
	base: string,
	name: string,
	theme: object,
};

const defaultProps = {
	routes: undefined,
	defaultRoute: undefined,
	name: undefined,
	base: undefined,
	middlewares: [],
	theme: {},
};

export class ReactApplication extends Component {
	constructor(props) {
		super(props);
		const { reducers, routes, defaultRoute, middlewares, name, base } = this.props;
		let store;
		if (routes) {
			const router = configureRouter({ routes, defaultRoute, base });
			this.__ROUTER__ = router;
			store = configureStore(reducers, {}, middlewares, router, name);
			this.__ROUTER__.setDependency('store', store);
		} else {
			store = configureStore(reducers, {}, middlewares, undefined, name);
		}
		this.__STORE__ = store;
	}

	componentWillMount() {
		if (this.__ROUTER__) {
			this.__ROUTER__.start(() => { console.log('--- ROUTER STARTED ---'); }); // eslint-disable-line
		}
	}

	render() {
		const { children, routes, theme } = this.props;
		if (routes) {
			return (
				<ThemeProvider theme={theme}>
					<Provider store={this.__STORE__}>
						<RouterProvider router={this.__ROUTER__}>
							{children}
						</RouterProvider>
					</Provider>
				</ThemeProvider>
			);
		}
		return (
			<ThemeProvider theme={theme}>
				<Provider store={this.__STORE__}>
					{children}
				</Provider>
			</ThemeProvider>
		);
	}
}

ReactApplication.propTypes = propTypes;
ReactApplication.defaultProps = defaultProps;
