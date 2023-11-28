/* eslint-disable @typescript-eslint/no-explicit-any */
export type Container = any;

export const createInstance = (...args: any) => {
	return { ...args } as any;
};

export const createTextInstance = (...args: any) => {
	return { ...args } as any;
};
