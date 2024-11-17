import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["m.media-amazon.com", "lh3.googleusercontent.com"],
	},
	async rewrites() {
		return [
			{
				source: "/services/:path*",
				destination: "https://zareflix-api.onrender.com/api/:path*",
			},
			{
				source: "/recommendations/:path*",
				destination: "https://zareflix-api.onrender.com/recommendations/:path*",
			},
		];
	},
};

export default nextConfig;
