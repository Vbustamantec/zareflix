const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^@/components/(.*)$": "<rootDir>/src/components/$1",
		"^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
		"^@/services/(.*)$": "<rootDir>/src/services/$1",
		"^@/types/(.*)$": "<rootDir>/src/types/$1",
	},
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
	modulePaths: ["<rootDir>/src"],
	moduleDirectories: ["node_modules", "<rootDir>"],
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.stories.{js,jsx,ts,tsx}",
		"!src/**/*.test.{js,jsx,ts,tsx}",
	],
};

module.exports = createJestConfig(customJestConfig);
