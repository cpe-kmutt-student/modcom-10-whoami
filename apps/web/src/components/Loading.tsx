"use client";

import {
  DotLottie,
  DotLottieReact,
  StateMachineCustomEvent,
} from "@lottiefiles/dotlottie-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const LOADING_PHRASES = ["", ".", "..", "..."];

interface LoadingProps {
  isExiting?: boolean;
  onExited?: () => void;
}

export default function Loading({ isExiting = false, onExited }: LoadingProps) {
  const t = useTranslations();

  const [dotLottieInstance, setDotLottieInstance] = useState<DotLottie | null>(
    null,
  );
  const [phrase, setPhrase] = useState(LOADING_PHRASES[0]);

  const mounted = true;

  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase((prev) => {
        const currentIndex = LOADING_PHRASES.indexOf(prev);
        const nextIndex = (currentIndex + 1) % LOADING_PHRASES.length;
        return LOADING_PHRASES[nextIndex];
      });
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const onExitedRef = useRef(onExited);
  useEffect(() => {
    onExitedRef.current = onExited;
  }, [onExited]);

  useEffect(() => {
    if (!isExiting) return;

    let fallbackTimer: NodeJS.Timeout;

    if (dotLottieInstance) {
      dotLottieInstance.stateMachineSetBooleanInput("is_loading", false);

      dotLottieInstance.play();

      const exitEvent = (event: StateMachineCustomEvent) => {
        if (event.eventName === "exitComplete") {
          if (onExitedRef.current) onExitedRef.current();
        }
      };

      dotLottieInstance.addEventListener("stateMachineCustomEvent", exitEvent);

      fallbackTimer = setTimeout(() => {
        if (onExitedRef.current) onExitedRef.current();
      }, 3000);

      return () => {
        clearTimeout(fallbackTimer);
        dotLottieInstance.removeEventListener(
          "stateMachineCustomEvent",
          exitEvent,
        );
      };
    } else {
      fallbackTimer = setTimeout(() => {
        if (onExitedRef.current) onExitedRef.current();
      }, 500);

      return () => clearTimeout(fallbackTimer);
    }
  }, [isExiting, dotLottieInstance]);

  return (
    <div className="absolute inset-0 w-full h-full z-50">
      <div
        className={`absolute inset-0 w-full h-full bg-blue-50 transition-opacity duration-500 ease-in-out ${
          mounted && !isExiting ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        <DotLottieReact
          src="/lotties/Loading.lottie"
          className="w-80"
          stateMachineId="StateMachine1"
          dotLottieRefCallback={setDotLottieInstance}
        />

        <div className={`text-xl font-mali font-bold text-blue-900 text-center px-4 transition-opacity duration-500 ease-in-out ${mounted && !isExiting ? "opacity-100" : "opacity-0"}`}>
          {t("loading.text")}{phrase}
        </div>

        <footer className="absolute bottom-3 left-4 text-xs text-blue-900/40 font-mali">
          ©2026 CPE39. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
