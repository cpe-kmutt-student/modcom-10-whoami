import type { Metadata } from "next";
import { Mali, Prompt, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CookieModal from "@/components/CookieModal";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { UserProvider } from "@/context/UserContext";
import { NextIntlClientProvider } from "next-intl";
import UtilityCluster from "@/components/UtilityCluster";

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
  title: "???",
  description: "????????????",

  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
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

            <UtilityCluster />
            <CookieModal />
          </ExperienceProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
