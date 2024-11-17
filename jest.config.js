const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"^@/components/(.*)$": "<rootDir>/src/components/$1",
		"^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
		"^@/services/(.*)$": "<rootDir>/src/services/$1",
		"^@/types/(.*)$": "<rootDir>/src/types/$1",
	},
	collectCoverageFrom: [
		"src/**/*.{js,jsx,ts,tsx}",
		"!src/**/*.d.ts",
		"!src/**/*.stories.{js,jsx,ts,tsx}",
		"!src/**/*.test.{js,jsx,ts,tsx}",
	],
};

module.exports = createJestConfig(customJestConfig);
