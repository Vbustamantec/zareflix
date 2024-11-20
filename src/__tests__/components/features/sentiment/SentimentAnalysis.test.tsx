import { render, screen } from "@testing-library/react";
import SentimentAnalysis from "@/features/sentiment/SentimentAnalysis/SentimentAnalysis";
import { SentimentAnalysisProps } from "@/features/sentiment/SentimentAnalysis/SentimentAnalysis.types";
import { SENTIMENT_CONFIG, SentimentType } from "@/utils/sentimentUtils";

describe("SentimentAnalysis", () => {
	const createTestProps = (
		overrides?: Partial<SentimentAnalysisProps>
	): SentimentAnalysisProps => ({
		sentiment: "positive" as SentimentType,
		score: 0.8,
		className: "test-class",
		...overrides,
	});

	beforeAll(() => {
		jest.spyOn(console, "warn").mockImplementation(() => {});
	});

	afterAll(() => {
		jest.restoreAllMocks();
	});

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe("Rendering", () => {
		it("renders basic component structure", () => {
			render(<SentimentAnalysis {...createTestProps()} />);

			expect(screen.getByText("Emotional Analysis")).toBeInTheDocument();
			expect(
				screen.getByText("Based on your personal notes and comments")
			).toBeInTheDocument();
			expect(screen.getByText("Overall Mood")).toBeInTheDocument();
			expect(screen.getByText("Emotional Distribution")).toBeInTheDocument();
		});

		it("applies custom className correctly", () => {
			const customClass = "custom-test-class";
			render(
				<SentimentAnalysis {...createTestProps({ className: customClass })} />
			);

			const container = screen.getByTestId("sentiment-container");
			expect(container).toHaveClass(customClass);
		});
	});

	describe("Sentiment Indicators", () => {
		it.each([
			["positive", 0.8, "text-green-500"],
			["negative", 0.2, "text-red-500"],
			["neutral", 0.5, "text-yellow-500"],
		])(
			"displays correct indicators for %s sentiment",
			(sentiment, score, expectedClass) => {
				render(
					<SentimentAnalysis
						{...createTestProps({
							sentiment: sentiment as SentimentType,
							score,
						})}
					/>
				);

				const sentimentIcon = screen.getByTestId("sentiment-icon");
				expect(screen.getByText(sentiment)).toBeInTheDocument();
				expect(sentimentIcon).toHaveClass(expectedClass);
			}
		);
	});

	describe("Description Text", () => {
		it("shows correct description for high scores", () => {
			render(<SentimentAnalysis {...createTestProps({ score: 0.9 })} />);

			const description = SENTIMENT_CONFIG.positive.description;
			expect(
				screen.getByText(
					new RegExp(`${description}.*with very high positivity`)
				)
			).toBeInTheDocument();
		});

		it("shows correct description for low scores", () => {
			render(
				<SentimentAnalysis
					{...createTestProps({ score: 0.1, sentiment: "negative" })}
				/>
			);

			const description = SENTIMENT_CONFIG.negative.description;
			expect(
				screen.getByText(
					new RegExp(`${description}.*with significant concerns`)
				)
			).toBeInTheDocument();
		});

		it("shows correct description for neutral scores", () => {
			render(
				<SentimentAnalysis
					{...createTestProps({ score: 0.5, sentiment: "neutral" })}
				/>
			);

			const description = SENTIMENT_CONFIG.neutral.description;
			expect(
				screen.getByText(new RegExp(`${description}.*with balanced viewpoints`))
			).toBeInTheDocument();
		});
	});
});
