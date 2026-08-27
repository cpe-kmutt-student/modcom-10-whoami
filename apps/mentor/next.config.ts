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
			{
				protocol: "https",
				hostname: "55a3cb3f678a5978cb990223f56512b5.r2.cloudflarestorage.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
