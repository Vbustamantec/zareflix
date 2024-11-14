import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["m.media-amazon.com"],
	},
	async rewrites() {
		return [
			{
				source: "/api/auth/:path",
				destination: "/api/auth/:path*",
			},
			{
				source: "/api/:path*",
				destination: "http://localhost:3001/api/:path*",
			},
		];
	},
};

export default nextConfig;
