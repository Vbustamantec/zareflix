import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
	__esModule: true,
	default: function MockImage({ src, alt, fill, priority, sizes, className }) {
		const fillValue = fill ? "true" : undefined;

		return (
			<img
				src={src}
				alt={alt}
				data-testid="mock-image"
				data-fill={fillValue}
				data-priority={priority ? "true" : undefined}
				data-sizes={sizes}
				className={className}
			/>
		);
	},
}));

// Mock next/router
jest.mock("next/navigation", () => ({
	useRouter() {
		return {
			push: jest.fn(),
			replace: jest.fn(),
			prefetch: jest.fn(),
			back: jest.fn(),
		};
	},
	useSearchParams() {
		return new URLSearchParams();
	},
}));

global.fetch = jest.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({}),
	})
);

const originalError = console.error;
console.error = (...args) => {
	if (
		/Warning/.test(args[0]) ||
		/Not implemented/.test(args[0]) ||
		/invalid prop/.test(args[0]) ||
		/Failed prop type/.test(args[0])
	) {
		return;
	}
	originalError.call(console, ...args);
};

beforeEach(() => {
	jest.clearAllMocks();
});
