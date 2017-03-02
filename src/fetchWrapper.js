import 'isomorphic-fetch';
import { flip, merge } from 'ramda';
import { getAuthToken } from './token';

const defaults = flip(merge);

export const fetchWrapper = async (url, options = {}) => {
	const base = {
		headers: {},
	};
	const token = getAuthToken();
	if (token) {
		base.headers.Authorization = `Bearer ${token}`;
	}
	base.headers.Accept = 'application/json';
	base.headers['Content-Type'] = 'application/json';
	const opts = defaults(options, base);
	let response = await fetch(url, opts);
	const status = response.status;
	if (response.status === 204 || opts.method === 'DELETE') {
		return response;
	}
	response = await response.json();
	if (status >= 200 && status < 300) {
		return response;
	}
	const error = new Error(response.message);
	error.statusText = response.error;
	error.statusCode = response.statusCode;
	throw error;
};
