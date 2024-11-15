import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["m.media-amazon.com"],
	},
	async rewrites() {
		return [
			{
				source: "/services/:path*",
				destination: `${process.env.BACKEND_URL}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
