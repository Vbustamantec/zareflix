import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/components/ui/AuthButton/AuthButton";

export default function Header() {
	return (
		<header className="bg-dark-gray p-4 border-b border-gray-800">
			<div className="max-w-full mx-4 flex justify-between items-center">
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
					<AuthButton />
				</nav>
			</div>
		</header>
	);
}
