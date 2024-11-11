import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "ZareFlix - The Best Movie Recommendation App",
	description: "Zarego Movie Recommendation App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
