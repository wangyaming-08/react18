/* eslint-disable @typescript-eslint/no-explicit-any */
import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	Type,
	Key,
	Props,
	Ref,
	ReactElementType,
	ElementType
} from 'shared/ReactTypes';
const ReactElement = function (
	type: Type,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'wym'
	};
	return element;
};

export const jsx = function (
	type: ElementType,
	config: any,
	...maybeChildren: any
) {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== void 0) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== void 0) {
				ref = '' + val;
			}
			continue;
		}
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}
	return ReactElement(type, key, ref, props);
};

export const jsxDEV = function (type: ElementType, config: any) {
	let key: Key = null;
	const props: Props = {};
	let ref: Ref = null;

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== void 0) {
				key = '' + val;
			}
			continue;
		}
		if (prop === 'ref') {
			if (val !== void 0) {
				ref = '' + val;
			}
			continue;
		}
		if (Object.prototype.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}
	return ReactElement(type, key, ref, props);
};
