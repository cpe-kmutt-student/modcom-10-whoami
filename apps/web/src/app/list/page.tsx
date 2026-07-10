"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faFacebook,
  faInstagram,
  faLine,
} from "@fortawesome/free-brands-svg-icons";
import BackButton from "@/components/BackButton";
import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "motion/react";
import { Variants } from "motion";
import { useUser } from "@/context/UserContext";
import { useLoading } from "@/context/ExperienceContext";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export interface SocialPlatform {
  username: string;
  url: string;
}

export interface UserSocials {
  instagram?: SocialPlatform;
  facebook?: SocialPlatform;
  discord?: SocialPlatform;
  line?: SocialPlatform;
}

export interface UserData {
  id: number;
  name: string;
  program: string;
  imageUrl: string;
  socials?: UserSocials;
}

const ppsData: UserData[] = [
  {
    id: 1,
    name: "ต้มยำ",
    program: "reg",
    imageUrl: "https://i.pravatar.cc/150?u=lelah",
    socials: {
      discord: { username: "@lelah_n", url: "https://line.me" },
    },
  },
  {
    id: 2,
    name: "กะเพรา",
    program: "inter",
    imageUrl: "https://i.pravatar.cc/150?u=jesus",
    socials: {
      instagram: { username: "@lelah.n", url: "https://instagram.com" },
    },
  },
  {
    id: 3,
    name: "ส้มตำ",
    program: "inter",

    imageUrl: "https://i.pravatar.cc/150?u=annie",
  },
  {
    id: 4,
    name: "Sigma",
    program: "hds",
    imageUrl: "https://i.pravatar.cc/150?u=robert",
    socials: {
      line: { username: "@lelah_n", url: "https://line.me" },
    },
  },
  {
    id: 5,
    name: "uu",
    program: "reg",

    imageUrl: "https://i.pravatar.cc/150?u=amy",
  },
  {
    id: 6,
    name: "เกีย",
    program: "reg",
    imageUrl: "https://i.pravatar.cc/150?u=anthony",
    socials: {
      facebook: { username: "Lelah N.", url: "https://facebook.com" },
    },
  },
  {
    id: 7,
    name: "เกีย",
    program: "reg",
    imageUrl: "https://i.pravatar.cc/150?u=anthony",
    socials: {
      facebook: { username: "Lelah N.", url: "https://facebook.com" },
    },
  },
  {
    id: 8,
    name: "เกีย",
    program: "reg",
    imageUrl: "https://i.pravatar.cc/150?u=anthony",
    socials: {
      facebook: { username: "Lelah N.", url: "https://facebook.com" },
    },
  },
  {
    id: 9,
    name: "เกีย",
    program: "reg",
    imageUrl: "https://i.pravatar.cc/150?u=anthony",
    socials: {
      facebook: { username: "Lelah N.", url: "https://facebook.com" },
    },
  },
  {
    id: 10,
    name: "เกีย",
    program: "reg",
    imageUrl: "https://i.pravatar.cc/150?u=anthony",
    socials: {
      facebook: { username: "Lelah N.", url: "https://facebook.com" },
    },
  },
  {
    id: 11,
    name: "เกีย",
    program: "reg",
    imageUrl: "https://i.pravatar.cc/150?u=anthony",
    socials: {
      facebook: { username: "Lelah N.", url: "https://facebook.com" },
    },
  },
  {
    id: 12,
    name: "เกีย",
    program: "reg",
    imageUrl: "https://i.pravatar.cc/150?u=anthony",
    socials: {
      facebook: { username: "Lelah N.", url: "https://facebook.com" },
    },
  },

];


const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: index * 0.1,
      type: "spring",
      bounce: 0.6,
      duration: 0.8,
    },
  }),
  exit: (index: number) => ({
    opacity: 0,
    scale: 0.9,
    transition: { delay: index * 0.05, duration: 0.2 },
  }),
};

export default function List() {
  const t = useTranslations();
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
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

    hasChecked.current = true;

    if (!user) {
      router.replace("/");
    } else if (!studentData) {
      router.replace("/genetic-testing");
    } else if (studentData.program) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedPrograms([studentData.program]);
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

  if (isLoading || isStudentLoading || !user || !studentData) return null;
  /* PROTECTION */



  const filteredData = ppsData.filter((pData) => {
    if (selectedPrograms.length === 0) return true;
    return selectedPrograms.includes(pData.program);
  });

  return (
    <div className="flex justify-center">
      <BackButton path="/hint" />
      <div className="max-w-5xl px-5 w-full flex flex-col items-start pt-25 md:pt-20">
        <div className="flex md:flex-row flex-col md:justify-between md:items-center w-full gap-5">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="text-4xl font-bold"
          >
            {t("hint.mentor_name_list")}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
            className="w-auto"
          >
            <ToggleGroup
              type="multiple"
              value={selectedPrograms}
              onValueChange={(value) => setSelectedPrograms(value)}
              className=" border-[3px] border-blue-900 rounded-3xl p-1 bg-white w-auto text-base gap-1"
            >
              <ToggleGroupItem
                value="reg"
                aria-label="Toggle reg"
                className="rounded-2xl px-5 py-1 md:w-auto w-full h-auto drop-shadow-none transition-scale duration-100 active:scale-90"
              >
                {t("program.short.reg")}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="inter"
                aria-label="Toggle inter"
                className="rounded-2xl px-5 py-1 md:w-auto w-full h-auto drop-shadow-none transition-scale duration-100 active:scale-90"
              >
                {t("program.short.inter")}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="hds"
                aria-label="Toggle hds"
                className="rounded-2xl px-5 py-1 md:w-auto w-full h-auto drop-shadow-none transition-scale duration-100 active:scale-90"
              >
                {t("program.short.hds")}
              </ToggleGroupItem>
            </ToggleGroup>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-3 pt-5 pb-20 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredData.map((pData, index) => (
              <motion.div
                layout
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={pData.id}
                className="flex items-start p-6 rounded-3xl border-2 border-blue-900 bg-cloud text-blue-900 shadow-comic"
              >
                <Image
                  src={pData.imageUrl}
                  alt={pData.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full object-cover mr-4 shrink-0"
                />

                <div className="flex flex-col min-w-0">
                  <div className="flex flex-row items-center gap-1.5">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {pData.name}
                    </h3>
                    <div className="select-none inline-flex h-auto items-center px-2 py-0.5 rounded-full text-[10px] font-medium border border-indigo-200 text-indigo-500 bg-white">
                      {t("program.short." + pData.program)}
                    </div>
                  </div>

                  {pData.socials && Object.keys(pData.socials).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto pt-3">
                      {pData.socials.instagram && (
                        <a
                          href={pData.socials.instagram.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center pl-2 pr-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-80 transition-opacity"
                        >
                          <FontAwesomeIcon
                            icon={faInstagram}
                            className="mr-1.5"
                          />
                          {pData.socials.instagram.username}
                        </a>
                      )}

                      {pData.socials.facebook && (
                        <a
                          href={pData.socials.facebook.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center pl-2 pr-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-[#1877F2] hover:opacity-80 transition-opacity"
                        >
                          <FontAwesomeIcon
                            icon={faFacebook}
                            className="mr-1.5"
                          />
                          {pData.socials.facebook.username}
                        </a>
                      )}

                      {pData.socials.discord && (
                        <a
                          href={pData.socials.discord.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center pl-2 pr-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-[#5865F2] hover:opacity-80 transition-opacity"
                        >
                          <FontAwesomeIcon
                            icon={faDiscord}
                            className="mr-1.5"
                          />
                          {pData.socials.discord.username}
                        </a>
                      )}

                      {pData.socials.line && (
                        <a
                          href={pData.socials.line.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center pl-2 pr-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-[#00C300] hover:opacity-80 transition-opacity"
                        >
                          <FontAwesomeIcon icon={faLine} className="mr-1.5" />
                          {pData.socials.line.username}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <footer className="absolute bottom-3 left-4 text-xs text-blue-900/40 z-20 font-mali">
        ©2026 CPE39. All rights reserved.
      </footer>
    </div>
  );
}
