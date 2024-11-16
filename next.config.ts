import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["m.media-amazon.com"],
	},
	async rewrites() {
		return [
			{
				source: "/services/:path*",
				destination: "http://localhost:3001/api/:path*",
			},
			{
				source: "/recommendations/:path*",
				destination: "http://localhost:3001/recommendations/:path*",
			},
		];
	},
};

export default nextConfig;
