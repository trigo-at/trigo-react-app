import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const composeEnhancers =
	typeof window === 'object' &&
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line
		name: 'pathfinder-activity-stream-ui',
	}) : compose;

export default (reducers = {}, initialState = {}) => {
	const loggerMiddleware = createLogger();
	const reducer = combineReducers(reducers);
	const store = createStore(
		reducer,
		initialState,
		composeEnhancers(
			applyMiddleware(
				loggerMiddleware,
				thunk,
			),
		),
	);

	return store;
};
