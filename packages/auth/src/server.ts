import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, openAPI, username } from "better-auth/plugins";
import { config } from "@repo/config";
import { prisma } from "@repo/database";

export const auth = betterAuth({
	secret: config.backend.betterAuth.secret,
	baseURL: config.backend.betterAuth.baseUrl,
	basePath: "/api/auth",
	trustedOrigins: config.backend.allowOrigins,
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	session: {
		strategy: "database",
		expiresIn: 60 * 60 * 24 * 7, // 7 days
	},
	advanced: {
		crossSubDomainCookies: {
			enabled: config.nodeEnv === "production",
			domain: config.backend.domain,
		},
	},
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		// google: {
		// 	clientId: confidg.auth.googleClientId,
		// 	clientSecret: config.auth.googleClientSecret,
		// },
		microsoft: {
			clientId: config.backend.betterAuth.microsoft.clientId,
			clientSecret: config.backend.betterAuth.microsoft.clientSecret,
			tenantId: config.backend.betterAuth.microsoft.tenantId,
			authority: "https://login.microsoftonline.com", // Authentication authority URL
			prompt: "select_account", // Forces account selection
		},
	},
	hooks: {},
	plugins: [admin(), username(), openAPI()],
	user: {
		deleteUser: {
			enabled: true,
		},
	},
});
