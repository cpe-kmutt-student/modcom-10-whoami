"use client";

import { useEffect } from "react";

declare global {
	interface Window {
		dataLayer: any[];
		gtag: (...args: any[]) => void;
	}
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!;

export const initializeGA = () => {
	if (typeof window !== "undefined" && !window.gtag) {
		window.dataLayer = window.dataLayer || [];
		window.gtag = function () {
			window.dataLayer.push(arguments);
		};
		window.gtag("js", new Date());

		const script = document.createElement("script");
		script.async = true;
		script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;

		const firstScript = document.getElementsByTagName("script")[0];
		if (firstScript && firstScript.parentNode) {
			firstScript.parentNode.insertBefore(script, firstScript);
		} else {
			document.head.appendChild(script);
		}

		window.gtag("config", GA_MEASUREMENT_ID);
	}
};

const GoogleAnalytics = () => {
	useEffect(() => {
		// เช็คตอนโหลดหน้า (สำหรับคนที่เคยยอมรับไปแล้ว)
		const consent = localStorage.getItem("mentormentee2026_cookie_consent");
		if (consent === "all") {
			initializeGA();
		}
	}, []);

	return null; // ไม่ต้อง render อะไรออกมา
};

export default GoogleAnalytics;
