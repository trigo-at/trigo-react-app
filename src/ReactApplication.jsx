import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router5';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './configureStore';
import configureRouter from './configureRouter';

const { oneOfType, arrayOf, array, node, object, string } = PropTypes;

injectTapEventPlugin();

const propTypes = {
	children: oneOfType([
		arrayOf(node),
		node,
	]).isRequired,
	reducers: object.isRequired,
	routes: array,
	defaultRoute: string,
	name: string,
};

const defaultProps = {
	routes: undefined,
	defaultRoute: undefined,
	name: undefined,
};

export class ReactApplication extends Component {
	constructor(props) {
		super(props);
		const { reducers, routes, defaultRoute, name } = this.props;
		let store;
		if (routes) {
			const router = configureRouter(routes, defaultRoute);
			this.__ROUTER__ = router;
			store = configureStore(reducers, {}, router, name);
		} else {
			store = configureStore(reducers, {}, undefined, name);
		}
		this.__STORE__ = store;
	}

	render() {
		const { children, routes } = this.props;
		if (routes) {
			return (
				<Provider store={this.__STORE__}>
					<RouterProvider router={this.__ROUTER__}>
						{children}
					</RouterProvider>
				</Provider>
			);
		}
		return (
			<Provider store={this.__STORE__}>
				{children}
			</Provider>
		);
	}
}

ReactApplication.propTypes = propTypes;
ReactApplication.defaultProps = defaultProps;
