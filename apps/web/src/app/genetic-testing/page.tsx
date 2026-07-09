"use client";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHandshake,
  faRotateRight,
  faPersonWalking,
  faFaceFrown,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

import { useState, type ChangeEvent, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

import { useLoading } from "@/context/ExperienceContext";
import { Variants } from "motion";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";

const containerVariants:Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants:Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.5, duration: 0.6 },
  },
};

export default function GeneticTesting() {
  const t = useTranslations();

  const [nowState, setState] = useState<number>(1);
  const [studentId, setStudentId] = useState("");

  /* PROTECTION */
  const router = useRouter();
  const { user, studentData, isLoading, isStudentLoading } = useUser();
  const { showLoading, hideLoading } = useLoading();

  const hasChecked = useRef(false);

  useEffect(() => {
    const isFetching = isLoading || isStudentLoading;

    if (isFetching) {
      showLoading();
      return;
    }

    hideLoading();

    if (hasChecked.current) return;

    // Perform the one-time check
    hasChecked.current = true;

    if (!user) {
      router.replace("/");
    } else if (studentData) {
      router.replace("/hint");
    }
  }, [
    isLoading,
    isStudentLoading,
    user,
    studentData,
    router,
    showLoading,
    hideLoading,
  ]);

  if (isLoading || isStudentLoading || !user || studentData) return null;
  /* PROTECTION */

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");

    const slicedNums = onlyNums.slice(0, 11);

    setStudentId(slicedNums);
  };

  const handleVerify = () => {
    showLoading();

    alert(studentId);

    setState(3);

    setTimeout(() => {
      const mockApiSuccess = Math.random() > 0.5;
      hideLoading();
      if (mockApiSuccess) {
        router.push("/hint");
      } else {
        setState(4);
      }
    }, 10000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-center items-center p-3 bg-blue-50">
      <AnimatePresence mode="wait">
        <div className="z-10 w-full flex justify-center">
          {(() => {
            switch (nowState) {
              case 1:
                return (
                  <motion.div
                    key="state1"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                    className="flex flex-col justify-center gap-10 w-full max-w-lg bg-cloud p-8 rounded-3xl border-3 border-blue-900 shadow-comic"
                  >
                    <div className="flex flex-col justify-center gap-2">
                      <motion.div
                        variants={itemVariants}
                        className="text-3xl font-bold font-display text-blue-900"
                      >
                        {t("genetic_testing.hello")}
                      </motion.div>
                      <motion.div
                        variants={itemVariants}
                        className="text-2xl font-sans text-blue-900"
                      >
                        {t("genetic_testing.name", {
                          fullname: user?.name ?? "",
                        })}
                      </motion.div>
                    </div>

                    <motion.div
                      variants={itemVariants}
                      className="flex flex-col gap-3"
                    >
                      <p className="pb-1 text-lg font-bold leading-none text-blue-900">
                        {t("genetic_testing.is_your_name")}
                      </p>

                      <Button onClick={() => setState(2)}>
                        <FontAwesomeIcon icon={faHandshake} className="mr-2" />
                        {t("genetic_testing.confirm")}
                      </Button>

                      <Button
                        onClick={() => router.push("/")}
                        variant="ghost_danger"
                        className="h-12 w-full border-2 border-oops hover:bg-oops/10"
                      >
                        {t("genetic_testing.deny")}
                      </Button>
                    </motion.div>
                  </motion.div>
                );

              case 2:
                return (
                  <motion.div
                    key="state2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      transition: { duration: 0.2 },
                    }}
                    className="flex flex-col justify-center gap-8 w-full max-w-md z-1 bg-cloud p-8 rounded-3xl border-3 border-blue-900 shadow-comic"
                  >
                    <div className="flex flex-col justify-center gap-4 w-full">
                      <motion.div
                        variants={itemVariants}
                        className="flex flex-col justify-center gap-2 w-full"
                      >
                        <Label htmlFor="name" className="text-lg">
                          {t("genetic_testing.student_id")}
                        </Label>
                        <Input
                          id="name"
                          type="text"
                          inputMode="numeric"
                          placeholder={t("genetic_testing.input_student_id")}
                          value={studentId}
                          onChange={handleChange}
                        />
                      </motion.div>
                    </div>

                    <Button
                      onClick={handleVerify}
                      variant="quirky"
                      disabled={studentId.length !== 11}
                    >
                      <FontAwesomeIcon
                        icon={faPersonWalking}
                        className="mr-2"
                      />
                      {t("genetic_testing.verify")}
                    </Button>
                  </motion.div>
                );

              case 3:
                return <div className="opacity-0">loading...</div>;

              case 4:
                return (
                  <motion.div
                    key="state5"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col justify-center items-center gap-6 w-full max-w-md z-1 bg-cloud p-8 rounded-3xl border-3 border-oops shadow-comic text-center"
                  >
                    <motion.div
                      variants={itemVariants}
                      animate={{ x: [-10, 10, -10, 10, 0] }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                      className="text-6xl mb-2 text-oops"
                    >
                      <FontAwesomeIcon icon={faFaceFrown} />
                    </motion.div>

                    <motion.h2
                      variants={itemVariants}
                      className="text-3xl font-bold font-mali text-oops"
                    >
                      {t("genetic_testing.access_denied")}
                    </motion.h2>
                    <motion.div
                      variants={itemVariants}
                      className="text-lg font-sans text-blue-900"
                    >
                      {t("genetic_testing.recheck")}
                      <div className="text-sm opacity-50 mt-2">
                        {t("genetic_testing.it_correct")}
                      </div>
                    </motion.div>

                    <motion.div
                      variants={itemVariants}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full mt-4"
                    >
                      <Button
                        onClick={() => setState(2)}
                        variant="outline"
                        className="w-full h-12 border-2 border-blue-900 font-bold hover:bg-blue-100"
                      >
                        <FontAwesomeIcon
                          icon={faRotateRight}
                          className="mr-2"
                        />
                        {t("genetic_testing.back")}
                      </Button>
                    </motion.div>
                  </motion.div>
                );

              default:
                return null;
            }
          })()}
        </div>
      </AnimatePresence>

      <footer className="absolute bottom-3 left-4 text-xs text-blue-900/40 z-20 font-mali">
        ©2026 CPE39. All rights reserved.
      </footer>
    </div>
  );
}
