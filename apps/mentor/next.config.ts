import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3.aboutnon.in.th",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "whoami-s3.aboutnon.in.th",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
