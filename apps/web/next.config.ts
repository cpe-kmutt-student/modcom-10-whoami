import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
			},
			{
				protocol: "https",
				hostname: "s3.aboutnon.in.th",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
