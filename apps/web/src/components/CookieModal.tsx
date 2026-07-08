"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCookieBite } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CookieModal() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("mentormentee2026_cookie_consent");
    if (!cookieConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type: "all" | "reject") => {
    localStorage.setItem("mentormentee2026_cookie_consent", type);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-4 left-0 right-0 z-[999] flex justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
            className="pointer-events-auto w-full max-w-5xl bg-cloud border-3 border-blue-900 shadow-comic rounded-3xl md:rounded-full p-3 md:py-2 md:pl-2 md:pr-4 flex flex-col md:flex-row items-center gap-4"
          >
            <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-blue-900 border-2 border-blue-900 rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCookieBite}
                className="text-2xl text-white animate-spin"
              />
            </div>

            <div className="flex-1 text-center md:text-left px-2">
              <p className="text-sm md:text-base font-sans text-blue-900 font-medium leading-tight">
                เราใช้คุกกี้เพื่อพัฒนาประสิทธิภาพ
                และประสบการณ์ที่ดีในการใช้เว็บไซต์ของคุณ
              </p>
            </div>

            <div className="flex flex-row items-center gap-2 md:gap-3 w-full md:w-auto shrink-0 justify-center">
              <Button
                onClick={() => router.push("/privacy-policy")}
                className="font-mali"
                variant="white-tiny"
                size="default"
              >
                Privacy Policy
              </Button>

              <Button
                onClick={() => handleConsent("all")}
                className="font-mali"
                variant="quirky-tiny"
                size="default"
              >
                Accept
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
