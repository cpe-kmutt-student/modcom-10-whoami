import type { Metadata } from "next";
import { JetBrains_Mono, Mali, Prompt } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import CookieModal from "@/components/CookieModal";
import UtilityCluster from "@/components/UtilityCluster";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { UserProvider } from "@/context/UserContext";
import MicrosoftClarity from "./metrics/MicrosoftClarity";
import UmamiAnalytics from "./metrics/UmamiAnalytics";

const mali = Mali({
	subsets: ["latin", "thai"],
	weight: ["200", "300", "400", "500", "600", "700"],
	variable: "--font-mali",
});

const prompt = Prompt({
	subsets: ["latin", "thai"],
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
	variable: "--font-prompt",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--font-mono",
});

export const metadata: Metadata = {
	title: "whoami",

	description:
		"คำใบ้มีอยู่ว่าพี่ๆ เป็นนักศึกษาภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี เเล้วอยากรู้คำใบ้อีกไหม? กดเข้ามาเลยย วู่วววว!!!",

	openGraph: {
		/* ตอนส่ง link */
		title: "whoami | CPE KMUTT",
		description:
			"คำใบ้มีอยู่ว่าพี่ๆ เป็นนักศึกษาภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี เเล้วอยากรู้คำใบ้อีกไหม? กดเข้ามาเลยย วู่วววว!!!",
		url: "https://whoami.cpesu.com",
		siteName: "พี่เป็นใครน้าาาา????",
		images: [
			{
				url: "https://s3.aboutnon.in.th/public/og-whoami.jpg",
				width: 1200,
				height: 630,
				alt: "whoami",
			},
		],
		locale: "th_TH",
	},

	twitter: {
		/* post ใน X */
		card: "summary_large_image",
		title: "whoami | CPE39",
		description:
			"คำใบ้มีอยู่ว่าพี่ๆ เป็นนักศึกษาภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี เเล้วอยากรู้คำใบ้อีกไหม? กดเข้ามาเลยย วู่วววว!!!",
		images: ["https://s3.aboutnon.in.th/public/og-whoami.jpg"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="th"
			className={`${mali.variable} ${prompt.variable} ${jetbrainsMono.variable} w-full h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<NextIntlClientProvider>
					<ExperienceProvider>
						<UserProvider>{children}</UserProvider>

						<MicrosoftClarity />
						<UmamiAnalytics />
						<UtilityCluster />
						<CookieModal />
					</ExperienceProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
