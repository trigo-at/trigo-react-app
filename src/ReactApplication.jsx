import React, { PropTypes, Component } from 'react';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import configureStore from './configureStore';

const { oneOfType, arrayOf, node, object } = PropTypes;

injectTapEventPlugin();

const propTypes = {
	children: oneOfType([
		arrayOf(node),
		node,
	]).isRequired,
	reducers: object.isRequired,
};

export class ReactApplication extends Component {
	constructor(props) {
		super(props);
		const { reducers } = this.props;
		this.__STORE__ = configureStore(reducers);
	}

	render() {
		const { children } = this.props;
		return (
			<Provider store={this.__STORE__}>
				{children}
			</Provider>
		);
	}
}

ReactApplication.propTypes = propTypes;
ReactApplication.defaultProps = defaultProps;
