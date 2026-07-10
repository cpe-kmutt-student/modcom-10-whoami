"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronDown,
  faIdCard,
  faEnvelope,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";

import { useTranslations } from "next-intl";

export default function UserProfile() {
  const t = useTranslations();

  const { studentData, user, signOut } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    signOut();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
      ref={menuRef}
      className="fixed top-4 right-4 md:top-4 md:right-4 z-20 flex flex-col items-end"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 bg-white border-3 border-blue-900 rounded-full p-2 pr-4 transition-all duration-200 cursor-pointer select-none
          shadow-comic hover:shadow-comic-hover hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none active:translate-x-1 active:translate-y-1
          ${isOpen ? "translate-x-0.5 translate-y-0.5 shadow-comic-hover" : ""}
          `}
      >
        <div className="w-10 h-10 bg-quirky border-2 border-blue-900 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="text-xl text-blue-900" />
        </div>

        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-bold font-mali text-blue-900 leading-tight">
            {t("user_profile.name", {
              firstname: studentData?.name.split(" ")[0] ?? "",
              fullname: studentData?.name ?? "",
            })}
          </span>
          <span className="text-[10px] font-sans font-bold text-blue-600 leading-tight">
            {studentData?.studentID}
          </span>
        </div>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-blue-900 ml-1"
        >
          <FontAwesomeIcon icon={faChevronDown} className="text-sm" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", bounce: 0.4, duration: 0.5 }}
            className="absolute top-[120%] right-0 w-72 bg-cloud border-3 border-blue-900 rounded-3xl shadow-[6px_6px_0px_0px_var(--color-blue-900)] overflow-hidden flex flex-col"
          >
            <div className="p-5 pt-3 border-b-3 border-blue-900 bg-white flex flex-col gap-3">
              <div className="flex flex-col">
                <span className="text-lg font-bold font-mali text-blue-900 truncate">
                  {studentData?.name}
                </span>
                <span className="text-xs font-sans font-bold text-blue-500">
                  {t("program.full." + (studentData?.program ?? "reg"))}
                </span>
              </div>

              <div className="flex items-center gap-3 text-blue-900 bg-blue-50 p-2 rounded-xl border-2 border-blue-900 h-9">
                <FontAwesomeIcon icon={faIdCard} className="text-blue-600" />
                <span className="text-sm font-sans font-bold">
                  {studentData?.studentID}
                </span>
              </div>

              <div className="flex items-center gap-3 text-blue-900 bg-blue-50 p-2 rounded-xl border-2 border-blue-900 h-9">
                <FontAwesomeIcon icon={faEnvelope} className="text-blue-600" />
                <span className="text-sm font-sans font-bold truncate">
                  {user?.email}
                </span>
              </div>
            </div>

            <div className="p-4 bg-cloud">
              <Button
                type="button"
                onClick={handleLogout}
                variant="danger"
                className="w-full flex items-center justify-center gap-2  text-white py-3 rounded-xl border-2 "
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                {t("user_profile.logout")}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
