import type { Metadata } from "next";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Roboto_Flex } from "next/font/google";

import "./globals.css";

import { MoviesProvider } from "@/context/MoviesContext";

import Header from "@/components/layout/Header/Header";

const robotoFlex = Roboto_Flex({
	subsets: ["latin"],
	weight: ["400", "700"],
	style: ["normal"],
	variable: "--font-roboto-flex",
});

export const metadata: Metadata = {
	title: "Zareflix - The best place to search for movies",
	description: "Zareflix is the best place to search for movies",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${robotoFlex.variable}  antialiased bg-black`}>
				<MoviesProvider>
					<UserProvider>
						<Header />
						<main className="font-sans">{children}</main>
					</UserProvider>
				</MoviesProvider>
			</body>
		</html>
	);
}
