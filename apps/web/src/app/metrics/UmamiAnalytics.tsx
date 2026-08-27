"use client";

import { useEffect } from "react";

declare global {
	interface Window {
		__umami_loaded?: boolean;
	}
}

const loadScript = (src: string, websiteId: string) => {
	const script = document.createElement("script");
	script.defer = true;
	script.src = src;
	script.setAttribute("data-website-id", websiteId);
	document.head.appendChild(script);
};

export const initializeUmami = () => {
	if (typeof window === "undefined") return;
	if (window.__umami_loaded) return;

	const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID!;
	const baseUrl = process.env.NEXT_PUBLIC_UMAMI_URL!;

	loadScript(`${baseUrl}/script.js`, websiteId);
	loadScript(`${baseUrl}/recorder.js`, websiteId);

	window.__umami_loaded = true;
};

export default function UmamiAnalytics() {
	useEffect(() => {
		const consent = localStorage.getItem("mentormentee2026_cookie_consent");

		if (consent === "all") {
			initializeUmami();
		}
	}, []);

	return null;
}
