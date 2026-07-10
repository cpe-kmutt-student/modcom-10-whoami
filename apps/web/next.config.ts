import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "standalone",
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.pravatar.cc",
			},
		],
	},
};

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
