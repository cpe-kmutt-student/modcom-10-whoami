"use client";

import Image from "next/image";
import ParticlesBackground from "@/components/ParticlesBackground";
import AnnoyingStickers from "@/components/AnnoyingSticker";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useGuestGuard } from "@/hooks/useRouteGuard";

export default function Home() {
  const t = useTranslations();

  const { isChecking } = useGuestGuard();

  const router = useRouter();
  const [isClickingLogin, setIsClickingLogin] = useState(false);

  const login = async () => {
    try {
      console.log(process.env.NEXT_PUBLIC_SERVER_URL);
      setIsClickingLogin(true);
      await authClient.signIn.social({
        provider: "microsoft",
        callbackURL: `${window.location.origin}/hint`,
      });
    } catch (error) {
      console.error("Login failed", error);
      setIsClickingLogin(false);
    }
  };

  const showSpinner = isClickingLogin || isChecking;

  return (
    <div className="bg-blue-50 min-h-screen relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <ParticlesBackground />
      </motion.div>
      <div className="absolute inset-0 z-0">
        <AnnoyingStickers />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
        className="relative flex min-h-screen flex-col items-center justify-center z-10 px-2"
      >
        <div className="relative">
          <button
            type="button"
            onClick={login}
            disabled={showSpinner}
            className={`
              group flex flex-row items-center justify-center px-8 py-4 relative
              bg-cloud rounded-full border-3 border-blue-900 
              shadow-comic transition-all duration-300 ease-out
              
              ${
                showSpinner
                  ? "opacity-75 grayscale-[0.2] shadow-none translate-x-[4px] translate-y-[4px] cursor-wait"
                  : `cursor-pointer hover:shadow-comic-hover hover:translate-x-[2px] hover:translate-y-[2px]
                     active:shadow-none active:translate-x-[4px] active:translate-y-[4px]`
              }
            `}
          >
            <Image
              src="/KMUTT.png"
              width={0}
              height={0}
              sizes="20vw"
              className={`w-auto h-[45px] transition-transform duration-300 mr-4 ${
                showSpinner ? "" : "group-hover:scale-105 group-hover:-rotate-3"
              }`}
              alt="KMUTT"
            />

            <div className="text-lg font-mali font-bold text-blue-900 flex items-center">
              <span>{t("home.continue_with_kmutt")}</span>

              <div
                className={`
                  flex items-center justify-center overflow-hidden 
                  transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  ${
                    showSpinner
                      ? "max-w-[40px] opacity-100 ml-3 scale-100 translate-y-0"
                      : "max-w-0 opacity-0 ml-0 scale-50 translate-y-4"
                  }
                `}
              >
                <svg
                  className="animate-spin h-6 w-6 text-blue-900 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>
          </button>

          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[350px] text-center pointer-events-auto">
            <p className="text-xs leading-relaxed font-mali text-blue-900/70 text-center max-w-sm mt-2 flex flex-col">
              <span>{t("home.login_mean")}{" "}</span>
              <span>
                <a
                  onClick={() => router.push("/privacy-policy")}
                  className="cursor-pointer text-nowrap font-bold text-blue-900 underline decoration-2 decoration-blue-900/30 hover:decoration-quirky hover:text-blue-600 transition-colors"
                >
                  {t("home.privacy_policy")}
                </a>
                {" "}{t("home.and")}{" "}
                <a
                  onClick={() => router.push("/terms-of-service")}
                  className="cursor-pointer text-nowrap font-bold text-blue-900 underline decoration-2 decoration-blue-900/30 hover:decoration-quirky hover:text-blue-600 transition-colors"
                >
                  {t("home.terms_of_service")}
                </a>
                  {" "}
              </span>
              <span className="text-nowrap">{t("home.of_us")}</span>
            </p>
          </div>
        </div>
      </motion.div>

      <footer className="absolute bottom-3 left-4 text-xs text-blue-900/40 z-20 font-mali">
        ©2026 CPE39. All rights reserved.
      </footer>
    </div>
  );
}
