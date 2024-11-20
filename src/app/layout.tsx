import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";

import { UserProvider } from "@auth0/nextjs-auth0/client";

import QueryClientContext from "context/QueryClientContext";

const Header = lazy(() => import("@/layout/Header/Header"));
const Footer = lazy(() => import("@/layout/Footer/Footer"));
const AutoSync = lazy(() => import("@/features/auth/AutoSync/AutoSync"));

import "./globals.css";
import { lazy, Suspense } from "react";
import Loader from "@/components/ui/Loader";

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
				className={`${robotoFlex.variable} font-sans min-h-screen flex flex-col antialiased scroll-smooth bg-black`}
			>
				<QueryClientContext>
					<UserProvider>
						<Suspense fallback={<Loader />}>
							<Header />
						</Suspense>

						<Suspense fallback={<Loader />}>
							<AutoSync />
						</Suspense>
						<main className="flex-grow pt-16">{children}</main>
						<Suspense fallback={<Loader />}>
							<Footer />
						</Suspense>
					</UserProvider>
				</QueryClientContext>
			</body>
		</html>
	);
}
