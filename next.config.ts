import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["m.media-amazon.com"],
	},
	async rewrites() {
		return [
			{
				source: "/services/:path*",
				destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
