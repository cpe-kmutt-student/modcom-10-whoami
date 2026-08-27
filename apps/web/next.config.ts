import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
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
	allowedDevOrigins: ["https://www.clarity.ms"],
};

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
