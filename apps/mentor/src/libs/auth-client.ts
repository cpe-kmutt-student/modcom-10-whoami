import { createAuthClient } from "@repo/auth/client";

export const authClient = createAuthClient({
	baseURL: process.env.NEXT_PUBLIC_MENTOR_BETTERAUTH_SERVER_URL,
});

export const { signIn, signUp, signOut } = authClient;
