import { Action } from 'shared/ReactTypes';
// 代表更新的数据结构 Update
export interface Update<State> {
	action: Action<State>;
}
export interface UpdateQueue<State> {
	shared: {
		pending: Update<State> | null;
	};
}
export const createUpdate = <State>(action: Action<State>): Update<State> => {
	return {
		action
	};
};
export const createUpdateQueue = <State>(): UpdateQueue<State> => {
	return {
		shared: {
			pending: null
		}
	};
};
// 在updateQueue中添加update
export const enqueueUpdate = <State>(
	updateQueue: UpdateQueue<State>,
	updatte: Update<State>
) => {
	updateQueue.shared.pending = updatte;
};

// 消费update
export const processUpdateQueue = <State>(
	baseState: State,
	pendingUpdate: Update<State> | null
): { memoizedState: State } => {
	const result: ReturnType<typeof processUpdateQueue<State>> = {
		memoizedState: baseState
	};
	if (pendingUpdate !== null) {
		const action = pendingUpdate.action;
		if (action instanceof Function) {
			result.memoizedState = action(baseState);
		} else {
			result.memoizedState = action;
		}
	}
	return result;
};
