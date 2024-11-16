import React from "react";
import Link from "next/link";

export default function NavLinks() {
	return (
		<>
			<Link
				href="/favorites"
				className="text-white hover:text-red-500 transition-colors"
			>
				Profile
			</Link>
			<Link
				href="/test-page"
				className="text-white hover:text-red-500 transition-colors"
			>
				API Panel
			</Link>
		</>
	);
}
