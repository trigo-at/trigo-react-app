import { either, isNil, isEmpty, reject, flip, merge, curry, prop, complement } from 'ramda';

export const eitherNilOrEmpty = either(isNil, isEmpty);
export const notNilOrEmpty = complement(either(isNil, isEmpty));
export const clean = obj => reject(isNil, obj);
export const defaults = flip(merge);

export const guardedProp = curry((property, obj) => {
	const value = prop(property, obj);
	if (!value) {
		return '';
	}
	return value;
});
