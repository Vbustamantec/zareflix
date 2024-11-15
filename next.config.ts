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
		];
	},
};

export default nextConfig;
