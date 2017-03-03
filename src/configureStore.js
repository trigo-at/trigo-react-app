import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import uuidv4 from 'uuid/v4';
import { router5Middleware, router5Reducer } from 'redux-router5';

export default (reducers = {}, initialState = {}, router = undefined, name = uuidv4()) => {
	const composeEnhancers =
		typeof window === 'object' &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ // eslint-disable-line
			name,
		}) : compose;

	const loggerMiddleware = createLogger();
	let reducer;
	if (router) {
		reducer = combineReducers({
			...reducers,
			router: router5Reducer,
		});
	} else {
		reducer = combineReducers(reducers);
	}
	const middlewares = [loggerMiddleware, thunk];
	if (router) {
		middlewares.push(router5Middleware(router));
	}
	const store = createStore(
		reducer,
		initialState,
		composeEnhancers(applyMiddleware(...middlewares)),
	);

	return store;
};
