/* eslint-disable @typescript-eslint/no-explicit-any */
import { Props, Key, Ref, ReactElementType } from 'shared/ReactTypes';
import { FunctionComponent, HostComponent, WorkTag } from './workTags';
import { Flags, NoFlags } from './fiberFlags';
import { Container } from 'hostConfig';

export class FiberNode {
	tag: WorkTag;
	type: any;
	key: Key | null;
	props: Props;
	stateNode: any;
	return: FiberNode | null;
	child: FiberNode | null;
	sibling: FiberNode | null;
	index: number;
	ref: Ref;
	pendingProps: Props;
	memoizedProps: Props;
	updateQueue: unknown;
	memoizedState: Props;
	alternate: FiberNode | null;
	flags: Flags;
	subtreeFlags: Flags;
	deletions: FiberNode[] | null;
	constructor(tag: WorkTag, pendingProps: Props, key: Key) {
		// 实例属性
		this.tag = tag;
		this.key = key;
		this.props = pendingProps;
		this.stateNode = null; //  保存节点本身
		this.type = null; // Function :() =>{}
		// 表示节点之间的关系 构成树状结构
		this.return = null;
		this.child = null;
		this.sibling = null;
		this.index = 0; // 多个li 的index
		this.ref = null;
		// 工作单元
		this.pendingProps = pendingProps; // 开始工作时的props
		this.memoizedProps = null; // 工作结束后的props
		this.updateQueue = null;
		this.memoizedState = null;

		this.alternate = null; // 保存另一个FiberNode（current or workInProgress）
		// 副作用
		this.flags = NoFlags;
		this.subtreeFlags = NoFlags;
		this.deletions = null;
	}
}
// ReactDOM.CreateRoot(Element) 创建生成
export class FiberRootNode {
	container: Container; //Element 挂载节点
	current: FiberNode; // hostRootFiber
	finishedWork: FiberNode | null; //更新完成后Fiber
	constructor(container: Container, hostRootFiber: FiberNode) {
		this.container = container;
		this.current = hostRootFiber;
		hostRootFiber.stateNode = this;
		this.finishedWork = null;
	}
}
// 返回与他对应的另一个Fiber alternate
export const createWorkInProgress = (
	current: FiberNode,
	pendingProps: Props
): FiberNode => {
	let workInProgress = current.alternate;
	if (workInProgress === null) {
		// mount
		workInProgress = new FiberNode(current.tag, pendingProps, current.key);
		workInProgress.type = current.type;
		workInProgress.stateNode = current.stateNode;

		workInProgress.alternate = current;
		current.alternate = workInProgress;
	} else {
		// update
		workInProgress.pendingProps = pendingProps;
		workInProgress.flags = NoFlags;
		workInProgress.subtreeFlags = NoFlags;
		workInProgress.deletions = null;
	}
	workInProgress.type = current.type;
	workInProgress.updateQueue = current.updateQueue;
	workInProgress.child = current.child;
	workInProgress.memoizedState = current.memoizedState;
	workInProgress.memoizedProps = current.memoizedProps;

	return workInProgress;
};
export function createFiberFromElement(element: ReactElementType): FiberNode {
	const { type, key, props } = element;
	let fibertag: WorkTag = FunctionComponent;
	if (typeof type === 'string') {
		fibertag = HostComponent;
	} else if (typeof type !== 'function' && __DEV__) {
		console.warn('未定义的type类型', type);
	}
	const fiber = new FiberNode(fibertag, props, key);
	fiber.type = type;
	return fiber;
}
