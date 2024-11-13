"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

export function Header() {
	const { user, isLoading } = useUser();

	if (isLoading) return null;

	return (
		<header className="bg-dark-gray p-4">
			<div className="max-w-7xl mx-auto flex justify-between items-center">
				<Link href="/" className="flex items-center gap-2">
					<div className="relative w-32 h-8">
						<Image
							src="/logo.webp"
							alt="ZareFlix Logo"
							fill
							className="object-contain"
							priority
						/>
					</div>
				</Link>

				<nav className="flex items-center gap-4">
					<Link href="/" className="text-white hover:text-gray-300">
						Home
					</Link>

					{user && (
						<Link href="/favorites" className="text-white hover:text-gray-300">
							Favorites
						</Link>
					)}

					{user ? (
						<div className="flex items-center gap-4">
							<span className="text-white">{user?.email}</span>
							<Link
								href="/api/auth/logout"
								className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
							>
								Logout
							</Link>
						</div>
					) : (
						<Link
							href="/api/auth/login"
							className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-200"
						>
							Login
						</Link>
					)}
				</nav>
			</div>
		</header>
	);
}

export { Header as default } from "./Header";
