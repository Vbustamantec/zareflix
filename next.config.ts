import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: [
			"m.media-amazon.com",
			"lh3.googleusercontent.com",
			"s.gravatar.com",
		],
	},
	async rewrites() {
		return [
			{
				source: "/proxy/:path*",
				destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
			},
			{
				source: "/movie/proxy/:path*",
				destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/:path*`,
			},
		];
	},
};

export default nextConfig;
