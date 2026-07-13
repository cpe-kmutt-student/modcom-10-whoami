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
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import BackButton from "@/components/BackButton";
import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "motion/react";
import { Variants } from "motion";
import { useUser } from "@/context/UserContext";
import { useTranslations } from "next-intl";
import { useStudentGuard } from "@/hooks/useRouteGuard";

export interface SocialPlatform {
  username: string;
  url: string;
}

export interface UserSocials {
  instagram?: SocialPlatform;
  facebook?: SocialPlatform;
  discord?: SocialPlatform;
  line?: SocialPlatform;
  other?: Array<SocialPlatform & { platform: string }>;
}

export interface UserData {
  id: string;
  name: string;
  nickname: string;
  firstname: string;
  lastname: string;
  program: string;
  imageUrl: string;
  socials?: UserSocials;
}

type FySeniorContactResponse = Array<{
  syuser_uuid: string;
  syuser_nickname: string | null;
  syuser_firstname: string | null;
  syuser_lastname: string | null;
  sycontact_url: string | null;
  sycontact_department: string | null;
  sycontact: Array<{
    sycontact_platform: string;
    sycontact_detail: string;
  }>;
}>;

type ContactKey = Exclude<keyof UserSocials, "other">;

const contactPlatformMap: Record<string, ContactKey> = {
  instagram: "instagram",
  facebook: "facebook",
  discord: "discord",
  line: "line",
};

const buildSocialUrl = (platform: string, detail: string) => {
  if (platform === "instagram")
    return `https://instagram.com/${detail.replace(/^@/, "")}`;
  if (platform === "facebook") return `https://facebook.com/${detail}`;
  if (platform === "discord") return "https://discord.com";
  if (platform === "line")
    return `https://line.me/R/ti/p/${detail.replace(/^@/, "")}`;

  if (detail.startsWith("http://") || detail.startsWith("https://")) {
    return detail;
  }

  return `https://${detail.replace(/^@/, "")}`;
};

const mapSeniorContacts = (contacts: FySeniorContactResponse): UserData[] => {
  return contacts.map((contact, index) => {
    const socials = contact.sycontact.reduce<UserSocials>(
      (accumulator, item) => {
        const normalizedPlatform = item.sycontact_platform.toLowerCase();
        const mappedPlatform = contactPlatformMap[normalizedPlatform];

        if (mappedPlatform) {
          accumulator[mappedPlatform] = {
            username: item.sycontact_detail,
            url: buildSocialUrl(mappedPlatform, item.sycontact_detail),
          };
          return accumulator;
        }

        accumulator.other = [
          ...(accumulator.other || []),
          {
            platform: item.sycontact_platform,
            username: item.sycontact_detail,
            url: buildSocialUrl(normalizedPlatform, item.sycontact_detail),
          },
        ];

        return accumulator;
      },
      {},
    );

    return {
      id: contact.syuser_uuid || `senior-${index}`,
      name:
        [
          contact.syuser_nickname && contact.syuser_nickname !== "***"
            ? `(${contact.syuser_nickname})`
            : null,
          contact.syuser_firstname
            ? contact.syuser_firstname
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : null,
          contact.syuser_lastname
            ? contact.syuser_lastname
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())
            : null,
        ]
          .filter(Boolean)
          .join(" ") ||
        contact.syuser_nickname ||
        "Unknown",

      nickname: contact.syuser_nickname && (contact.syuser_nickname !== "***")
        ? contact.syuser_nickname
        : "",
      firstname: contact.syuser_firstname
        ? contact.syuser_firstname
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())
        : "",
      lastname: contact.syuser_lastname
        ? contact.syuser_lastname
            .toLowerCase()
            .replace(/\b\w/g, (char) => char.toUpperCase())
        : "",
      program: contact.sycontact_department || "Unknown",
      imageUrl:
        contact.sycontact_url ||
        `https://i.pravatar.cc/150?u=${contact.syuser_uuid}`,
      socials: Object.keys(socials).length > 0 ? socials : undefined,
    };
  });
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: { opacity: 0 },
};

const itemVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: (index: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: Math.min(index * 0.05, 1.0),
      type: "spring",
      bounce: 0.4,
      duration: 0.5,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 },
  },
};

const programOrder:Record<string, number> = {
  reg: 1,
  inter: 2,
  hds: 3,
};

export default function List() {
  const t = useTranslations();

  const { isChecking } = useStudentGuard();

  const { studentData } = useUser();

  const [seniorContacts, setSeniorContacts] = useState<UserData[]>([]);
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
  const [isDataLoading, setDataIsLoading] = useState(true);


  const [selectedProfile, setSelectedProfile] = useState<UserData | null>(null);

  const hasInitializedProgram = useRef(false);

  useEffect(() => {
    const fetchSeniorContacts = async () => {
      setDataIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/fy/sy/contact/`,
          { credentials: "include" },
        );

        if (!response.ok) throw new Error("Failed to fetch senior contacts");

        const data = (await response.json()) as FySeniorContactResponse;
        setSeniorContacts(mapSeniorContacts(data));
      } catch (error) {
        console.error("Failed to load senior contacts:", error);
        setSeniorContacts([]);
      } finally {
        setDataIsLoading(false);
      }
    };

    fetchSeniorContacts();
  }, []);

  useEffect(() => {
    if (studentData?.program && !hasInitializedProgram.current) {
      setSelectedPrograms([studentData.program]);
      hasInitializedProgram.current = true;
    }
  }, [studentData?.program]);


  useEffect(() => {
    if (selectedProfile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProfile]);

  if (isChecking) return null;

  const filteredData = seniorContacts
    .filter((pData) => {
      if (selectedPrograms.length === 0) return true;
      return selectedPrograms.includes(pData.program.toLowerCase());
    })
    .sort((a, b) => {
      const progA = a.program.toLowerCase();
      const progB = b.program.toLowerCase();

      const orderA = programOrder[progA] || 99;
      const orderB = programOrder[progB] || 99;

      if (orderA !== orderB) {
        return orderA - orderB;
      }

      const hasNickA = Boolean(a.nickname && a.nickname !== "");
      const hasNickB = Boolean(b.nickname && b.nickname !== "");

      if (hasNickA !== hasNickB) {
        return hasNickA ? -1 : 1;
      }

      return a.firstname.localeCompare(b.firstname);
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
            {isDataLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full rounded-3xl border-2 border-blue-900 bg-cloud px-6 py-10 text-center text-blue-900 shadow-comic"
              >
                {t("list.loading")}
              </motion.div>
            ) : filteredData.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full rounded-3xl border-2 border-blue-900 bg-cloud px-6 py-10 text-center text-blue-900 shadow-comic"
              >
                {t("list.notfound")}
              </motion.div>
            ) : (
              filteredData.map((pData, index) => (
                <motion.div
                  layout="position"
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  key={pData.id}
                  onClick={() => setSelectedProfile(pData)}
                  whileHover={{
                    x: 4,
                    y: 4,
                    boxShadow: "none",
                  }}
                  className="flex items-start p-6 rounded-3xl border-2 border-blue-900 bg-cloud text-blue-900 shadow-[4px_4px_0px_0px_var(--color-blue-900)] cursor-pointer"
                >
                  <Image
                    src={pData.imageUrl}
                    alt={pData.name}

                    width={64}
                    height={64}
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(pData.name.replace(/[()]/g, ""))}&background=random`;
                    }}
                    className="w-16 h-16 rounded-full object-cover mr-4 shrink-0"
                  />

                  <div className="flex flex-col min-w-0">
                    <div className="flex flex-row items-center gap-1.5">
                      <h3 className="text-base font-bold text-gray-900 truncate">
                        {pData.name}
                      </h3>
                      <div className="select-none inline-flex h-auto items-center px-2 py-0.5 rounded-full text-[10px] font-medium border border-indigo-200 text-indigo-500 bg-white">
                        {t("program.short." + pData.program.toLowerCase())}
                      </div>
                    </div>

                    {pData.socials && Object.keys(pData.socials).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-3">
                        {pData.socials.instagram && (
                          <a
                            href={pData.socials.instagram.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
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
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <footer className="absolute bottom-3 left-4 text-xs text-blue-900/40 z-20 font-mali">
        ©2026 CPE39. All rights reserved.
      </footer>

      <AnimatePresence>
        {selectedProfile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-blue-900/60 backdrop-blur-sm"
            onClick={() => setSelectedProfile(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-white border-4 border-blue-900 rounded-3xl p-6 shadow-[8px_8px_0px_0px_var(--color-blue-900)] max-w-sm w-full relative flex flex-col items-center max-h-[90vh] overflow-y-auto no-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProfile(null)}
                className="cursor-pointer absolute top-3 right-3 w-8 h-8 bg-oops border-2 border-blue-900 rounded-full text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

              <div className="w-full relative mt-6 mb-6 overflow-hidden flex items-center justify-center min-h-[250px]">
                <Image
                  src={selectedProfile.imageUrl}
                  alt={selectedProfile.name}

                  width={400}
                  height={400}
                  className="w-full h-auto max-h-[350px] rounded-sm object-contain "
                  onError={(e) => {
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedProfile.name.replace(/[()]/g, ""))}&background=random`;
                  }}
                />
              </div>

              <h2 className="text-2xl font-bold text-blue-900 text-center leading-tight mb-2">
                {selectedProfile.name}
              </h2>
              <div className="px-4 py-1 rounded-full border-2 border-blue-900 bg-quirky text-blue-900 font-bold text-sm mb-6 shadow-[2px_2px_0px_0px_var(--color-blue-900)]">
                {t("program.short." + selectedProfile.program.toLowerCase())}
              </div>

              <div className="w-full flex flex-col gap-3">
                {selectedProfile.socials?.instagram && (
                  <a
                    href={selectedProfile.socials.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-blue-900 bg-white hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_var(--color-blue-900)]"
                  >
                    <FontAwesomeIcon
                      icon={faInstagram}
                      className="text-2xl text-[#fd1d1d]"
                    />
                    <span className="font-bold text-blue-900">
                      {selectedProfile.socials.instagram.username}
                    </span>
                  </a>
                )}
                {selectedProfile.socials?.facebook && (
                  <a
                    href={selectedProfile.socials.facebook.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-blue-900 bg-white hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_var(--color-blue-900)]"
                  >
                    <FontAwesomeIcon
                      icon={faFacebook}
                      className="text-2xl text-[#1877F2]"
                    />
                    <span className="font-bold text-blue-900">
                      {selectedProfile.socials.facebook.username}
                    </span>
                  </a>
                )}
                {selectedProfile.socials?.discord && (
                  <a
                    href={selectedProfile.socials.discord.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-blue-900 bg-white hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_var(--color-blue-900)]"
                  >
                    <FontAwesomeIcon
                      icon={faDiscord}
                      className="text-2xl text-[#5865F2]"
                    />
                    <span className="font-bold text-blue-900">
                      {selectedProfile.socials.discord.username}
                    </span>
                  </a>
                )}
                {selectedProfile.socials?.line && (
                  <a
                    href={selectedProfile.socials.line.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border-2 border-blue-900 bg-white hover:bg-gray-50 transition-colors shadow-[2px_2px_0px_0px_var(--color-blue-900)]"
                  >
                    <FontAwesomeIcon
                      icon={faLine}
                      className="text-2xl text-[#00C300]"
                    />
                    <span className="font-bold text-blue-900">
                      {selectedProfile.socials.line.username}
                    </span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
