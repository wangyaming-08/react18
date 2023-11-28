export const FunctionComponent = 0;
export const HostRoot = 3; // React.render
export const HostComponent = 5; //div p
export const HostText = 6; // 文本

export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;
