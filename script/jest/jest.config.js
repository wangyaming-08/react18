// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults } = require('jest-config');

module.exports = {
	...defaults,
	rootDir: process.cwd(),
	modulePathIgnorePatterns: ['<rootDir>/.history'],
	moduleDirectories: ['dist/node_modules', ...defaults.moduleDirectories], // 包的解析位置
	testEnvironment: 'jsdom'
};
