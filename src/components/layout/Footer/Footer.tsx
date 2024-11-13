"use client";
import React from "react";
import Image from "next/image";

export default function Footer() {
	return (
		<footer className="bg-dark-gray mt-20 border-t border-gray-800">
			<div className="max-w-full mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
					<div className="space-y-4 flex flex-col items-center md:items-start">
						<h3 className="text-white text-lg font-bold">About ZareFlix</h3>
						<p className="text-gray-400 text-sm text-center md:text-left">
							Your destination to explore and discover movies. We use the OMDB
							API to provide you with detailed information about thousands of
							movies, allowing you to explore and save your favorites.
						</p>
						<div className="mt-4">
							<Image
								src="/logo.webp"
								alt="ZareFlix Logo"
								width={150}
								height={150}
								priority
							/>
						</div>
					</div>

					<div className="space-y-4 ">
						<h3 className="text-white text-lg font-bold">Technologies</h3>
						<ul className="space-y-2 text-sm">
							<li className="text-gray-400">Next.js</li>
							<li className="text-gray-400">React</li>
							<li className="text-gray-400">Tailwind CSS</li>
							<li className="text-gray-400">Auth0</li>
							<li className="text-gray-400">OMDB API</li>
						</ul>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-gray-800">
					<p className="text-center text-gray-400 text-sm">
						© {new Date().getFullYear()} ZareFlix. All rights reserved.
						Developed with{" "}
						<span className="text-red-500" aria-label="love">
							♥
						</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
