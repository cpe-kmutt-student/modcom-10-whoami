"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from "react";
import Loading from "@/components/Loading";

interface ExperienceContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(
  undefined,
);

export function ExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadingUi, setShowLoadingUi] = useState(false);

  const loadingStartTime = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeRequests = useRef<number>(0);

  const MIN_LOADING_TIME = 1000;

  const showLoading = useCallback(() => {
    console.log("show");
    activeRequests.current += 1;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (activeRequests.current === 1) {
      loadingStartTime.current = Date.now();
      setIsLoading(true);
      setShowLoadingUi(true);
    }
  }, []);

  const hideLoading = useCallback(() => {
    console.log("hide")
    activeRequests.current = Math.max(0, activeRequests.current - 1);

    if (activeRequests.current === 0) {
      const timeElapsed = Date.now() - loadingStartTime.current;
      const timeRemaining = Math.max(0, MIN_LOADING_TIME - timeElapsed);

      timeoutRef.current = setTimeout(() => {
        if (activeRequests.current === 0) {
          setIsLoading(false);
        }
      }, timeRemaining);
    }
  }, []);

  return (
    <ExperienceContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      <div className="relative min-h-screen overflow-hidden">
        {showLoadingUi && (
          <div className="absolute inset-0 z-50">
            <Loading
              isExiting={!isLoading}
              onExited={() => setShowLoadingUi(false)}
            />
          </div>
        )}
        {children}
      </div>
    </ExperienceContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error("useLoading must be used within an ExperienceProvider");
  }
  return context;
}
