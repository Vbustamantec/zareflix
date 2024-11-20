"use client";

import { useCallback, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";

import { motion, useScroll } from "framer-motion";

import UserNavigation from "@/components/layout/Header/Navigation";

const SCROLL_THRESHOLD = 50;

export default function Header() {
	const [isScrolled, setIsScrolled] = useState(false);
	const { scrollY } = useScroll();

	const handleScroll = useCallback(() => {
		setIsScrolled(scrollY.get() > SCROLL_THRESHOLD);
	}, [scrollY]);

	useEffect(() => {
		const unsubscribe = scrollY.on("change", handleScroll);
		return () => unsubscribe();
	}, [handleScroll, scrollY]);

	return (
		<motion.header
			className={`
        fixed top-0 left-0 right-0 
        z-[60] 
        transition-colors duration-300 ease-in-out
        ${
					isScrolled
						? "bg-dark-gray/95 backdrop-blur-md shadow-lgz"
						: "bg-dark-gray"
				}
      `}
			initial={false}
			animate={{ opacity: 1 }}
			data-testid="header"
			role="banner"
		>
			<div
				className="
        container 
        mx-auto 
        px-4 
        h-16 
        flex 
        items-center 
        justify-between
      "
			>
				<Link
					href="/"
					className="relative flex items-center gap-2"
					aria-label="Go to homepage"
				>
					<div className="relative w-32 h-8">
						<Image
							src="/logo.webp"
							alt="ZareFlix Logo"
							fill
							priority
							sizes="128px"
							className="object-contain"
						/>
					</div>
				</Link>

				<nav
					className="flex items-center gap-4"
					role="navigation"
					aria-label="Main navigation"
				>
					<UserNavigation />
				</nav>
			</div>
		</motion.header>
	);
}
