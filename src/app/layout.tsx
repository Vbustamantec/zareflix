import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";

import { UserProvider } from "@auth0/nextjs-auth0/client";

import QueryClientContext from "@/context/QueryClientContext";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import "./globals.css";

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
			<body
				className={`${robotoFlex.variable} font-sans min-h-screen flex flex-col antialiased bg-black`}
			>
				<QueryClientContext>
					<UserProvider>
						<Header />
						<main className="flex-grow">{children}</main>
						<Footer />
					</UserProvider>
				</QueryClientContext>
			</body>
		</html>
	);
}
