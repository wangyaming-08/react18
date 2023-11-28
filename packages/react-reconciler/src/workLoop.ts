// 工作循环

import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode, FiberRootNode, createWorkInProgress } from './fiber';
import { HostRoot } from './workTags';

/**
 * mount 更新流程
 * 生成wip FiberNode 树
 * 标记副作用flags
 */

let workInProgress: FiberNode | null = null; // 指针，指向当前正在工作的FiberNode
// workInProgress 赋值给FiberNode
function prepareRefreshStack(root: FiberRootNode) {
	workInProgress = createWorkInProgress(root.current, {});
}
// 调度功能
export function scheduleUpdateOnFiber(fiber: FiberNode) {
	const root = markUpdateFromFiberToRoot(fiber);
	renderRoot(root);
}
// 接收当前的Fiber 找到 FiberRootNode 根节点
function markUpdateFromFiberToRoot(fiber: FiberNode) {
	let node = fiber;
	let parent = node.return;
	while (parent !== null) {
		node = parent;
		parent = node.return;
	}
	if (node.tag === HostRoot) {
		return node.stateNode;
	}
}
/**
 * 触发更新时调用
 * 如何触发更新:
 * 1、ReactDOM.createRoot().render || 老版的 ReactDOM.render()
 * 2、this.setState
 * 3、useState 的 dispatch 方法
 */
function renderRoot(root: FiberRootNode) {
	// 初始化
	prepareRefreshStack(root);
	0;
	do {
		try {
			workLoop();
			break;
		} catch (error) {
			workInProgress = null;
			console.warn('workLoop 发生错误', error);
		}
	} while (true);
	const finshedWork = root.current.alternate;
	root.finishedWork = finshedWork;
	commitRoot(root);
}

function workLoop() {
	while (workInProgress !== null) {
		performUnitOfWork(workInProgress);
	}
}
function performUnitOfWork(fiber: FiberNode) {
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibling = node.sibling;
		if (sibling !== null) {
			workInProgress = sibling;
			return;
		}
		node = node.return;
		workInProgress = node;
	} while (node !== null);
}
