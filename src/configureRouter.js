import createRouter from 'router5';
import loggerPlugin from 'router5/plugins/logger';
import listenersPlugin from 'router5/plugins/listeners';
import browserPlugin from 'router5/plugins/browser';

const configureRouter = (routes, defaultRoute, useListenersPlugin = true) => {
	const router = createRouter(routes, {
		defaultRoute,
		trailingSlash: true,
		useTrailingSlash: true,
	})
	// Plugins
	.usePlugin(loggerPlugin)
	.usePlugin(browserPlugin({
		useHash: false,
	}));

	if (useListenersPlugin) {
		router.usePlugin(listenersPlugin());
	}

	return router;
};

export default configureRouter;
