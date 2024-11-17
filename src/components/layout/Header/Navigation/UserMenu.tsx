"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { UserProfile } from "@auth0/nextjs-auth0/client";

interface UserMenuProps {
	user: UserProfile;
}

export default function UserMenu({ user }: UserMenuProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<button className="flex items-center gap-2 group">
				<div className="relative w-8 h-8 rounded overflow-hidden">
					{user.picture ? (
						<Image
							src={user.picture}
							alt="Profile"
							fill
							sizes="(max-width: 640px) 100vw, 640px"
							className="object-cover"
						/>
					) : (
						<div className="w-full h-full bg-red-600 flex items-center justify-center text-white">
							{user.nickname?.[0] || user.email?.[0] || "U"}
						</div>
					)}
				</div>
				<ChevronDown
					className={`w-4 h-4 text-white transition-transform duration-200 ${
						isOpen ? "rotate-180" : ""
					}`}
				/>
			</button>

			<div
				className={`absolute right-0 top-full mt-2 w-48 bg-black border border-gray-700 rounded shadow-lg transition-all duration-200 ${
					isOpen
						? "opacity-100 translate-y-0 visible"
						: "opacity-0 -translate-y-2 invisible"
				}`}
			>
				<div className="py-2 px-4">
					<p className="text-white text-sm truncate mb-2">
						{user.nickname || user.email}
					</p>
					<hr className="border-gray-700 my-2" />
					<Link
						href="/api/auth/logout"
						className="text-white hover:text-red-500 text-sm block transition-colors duration-200"
					>
						Sign out of ZareFlix
					</Link>
				</div>
			</div>
		</div>
	);
}
