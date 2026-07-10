"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faTriangleExclamation,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import BackButton from "@/components/BackButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FakeAdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFakeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    setTimeout(() => {
      setIsLoading(false);
      setError(true);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-blue-900 flex flex-col items-center justify-center p-4 relative overflow-hidden selection:bg-quirky selection:text-blue-900">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex flex-wrap gap-4 p-4 overflow-hidden text-white font-mono text-xs justify-around">
      </div>

      <BackButton path="/" variant="white-tiny" />

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.6 }}
        className="z-10 w-full max-w-md relative"
      >
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-oops border-3 border-blue-900 text-white font-bold font-display px-6 py-1 rounded-full shadow-[2px_2px_0px_0px_var(--color-blue-900)] z-20 whitespace-nowrap flex items-center gap-2">
          <FontAwesomeIcon icon={faTriangleExclamation} />
          RESTRICTED AREA
        </div>

        <div className="bg-white border-4 border-blue-900 rounded-3xl p-8 pt-10 shadow-[8px_8px_0px_0px_var(--color-quirky)] flex flex-col gap-6">

          <div className="text-center flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-blue-100 border-3 border-blue-900 rounded-full flex items-center justify-center text-blue-900 mb-2">
              <FontAwesomeIcon icon={faUserShield} className="text-3xl" />
            </div>
            <h1 className="text-3xl font-sans font-extrabold text-blue-900 tracking-tight uppercase">
              Admin Portal
            </h1>
            <p className="text-xs font-sans font-bold text-blue-900/60 uppercase tracking-widest">
              Mentor Only
            </p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-100 border-2 border-red-500 text-red-700 text-sm font-bold p-3 rounded-xl flex items-start gap-2"
            >
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                className="mt-0.5"
              />
              <span>
                ACCESS DENIED: ตรวจพบการพยายามเข้าถึงโดยไม่ได้รับอนุญาต <br />
                <span className="text-xs font-mono font-normal opacity-80">
                  IP Address ของคุณถูกบันทึกแล้ว แบร่🤪
                </span>
              </span>
            </motion.div>
          )}

          <form onSubmit={handleFakeLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold font-sans text-blue-900">
                Mentor Student ID
              </label>
              <div className="relative">
                <Input
                  type="text"
                  required
                  placeholder="Enter your admin ID"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold font-sans text-blue-900">
                Password
              </label>
              <div className="relative">
                <Input type="password" required placeholder="••••••••••••" />
              </div>
            </div>

            <Button className="mt-5">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                  Authenticating...
                </span>
              ) : (
                "Initialize Session"
              )}
            </Button>
          </form>
        </div>
      </motion.div>
      <footer className="absolute bottom-3 left-4 text-xs text-blue-50/40 z-20 font-mali">
        ©2026 CPE39. All rights reserved.
      </footer>
    </div>
  );
}
