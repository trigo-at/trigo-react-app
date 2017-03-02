const events = {};

export function publish(name, data) {
	events[name] = events[name] || new Event(name);
	events[name].data = data;
	dispatchEvent(events[name]);
}

export function subscribe(name, handler, context) {
	addEventListener(name, handler.bind(context));
}

export function unsubscribe(name, handler, context) {
	removeEventListener(name, handler.bind(context));
}
