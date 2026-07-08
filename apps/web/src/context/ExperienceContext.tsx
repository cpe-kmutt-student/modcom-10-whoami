"use client";

import React, { createContext, useContext, useState } from "react";
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


  const showLoading = () => {
    setIsLoading(true);
    setShowLoadingUi(true);
  };


  const hideLoading = () => {
    setIsLoading(false);
  };

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
    throw new Error("useLoading must be used within a ExperienceProvider");
  }
  return context;
}
