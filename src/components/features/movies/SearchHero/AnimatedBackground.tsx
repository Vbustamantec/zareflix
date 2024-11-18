// AnimatedBackground.tsx
"use client";
import { motion } from "framer-motion";

export function AnimatedBackground() {
	return (
		<motion.div
			className="absolute inset-0"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			<div
				className="absolute inset-0"
				style={{
					backgroundImage: `linear-gradient(
            135deg,
            #18181C 25%,
            #1c1c21 25%,
            #1c1c21 50%,
            #18181C 50%,
            #18181C 75%,
            #1c1c21 75%,
            #1c1c21 100%
          )`,
					backgroundSize: "40px 40px",
				}}
			/>

			<div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					className="absolute w-full h-[1px] bg-red-800/20"
					style={{ top: "30%" }}
					animate={{
						opacity: [0.2, 0.5, 0.2],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
				<motion.div
					className="absolute w-full h-[1px] bg-red-800/20"
					style={{ top: "70%" }}
					animate={{
						opacity: [0.5, 0.2, 0.5],
					}}
					transition={{
						duration: 3,
						repeat: Infinity,
						ease: "linear",
					}}
				/>
			</div>

			<div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/30" />
		</motion.div>
	);
}
