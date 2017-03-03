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
	middlewares: array,
	defaultRoute: string,
	name: string,
};

const defaultProps = {
	routes: undefined,
	defaultRoute: undefined,
	name: undefined,
	middlewares: [],
};

export class ReactApplication extends Component {
	constructor(props) {
		super(props);
		const { reducers, routes, defaultRoute, middlewares, name } = this.props;
		let store;
		if (routes) {
			const router = configureRouter(routes, defaultRoute);
			this.__ROUTER__ = router;
			store = configureStore(reducers, {}, middlewares, router, name);
			this.__ROUTER__.setDependency('store', store);
		} else {
			store = configureStore(reducers, {}, middlewares, undefined, name);
		}
		this.__STORE__ = store;
	}

	componentWillMount() {
		this.__ROUTER__.start(() => { console.log('--- ROUTER STARTED ---'); }); // eslint-disable-line
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
