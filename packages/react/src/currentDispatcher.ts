/* eslint-disable @typescript-eslint/no-explicit-any */
// 当前使用的 hooks 集合

import { Action } from 'shared/ReactTypes';

export interface Dispatcher {
	useState: <T>(initialState: (() => T) | T) => [T, Dispatch<T>];
}
export type Dispatch<State> = (action: Action<State>) => void;

const currentDispatcher: { current: Dispatcher | null } = {
	current: null
};
export const resolveDispatcher = (): Dispatcher => {
	const dispatcher = currentDispatcher.current;
	if (dispatcher === null) {
		throw new Error('hook 只能在函数组件中使用');
	}
	return dispatcher;
};
export default currentDispatcher;
