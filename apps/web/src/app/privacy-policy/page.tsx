"use client";

import { motion } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldHalved,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { Variants } from "motion";
import BackButton from "@/components/BackButton";


const containerVariants:Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};


const itemVariants:Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.6 },
  },
};

export default function Home() {
  const lists = [
    {
      id: "1",
      title: "ข้อมูลส่วนบุคคลที่เราจัดเก็บ",
      desc: "เราจะจัดเก็บข้อมูลส่วนบุคคลเท่าที่จำเป็น ซึ่งเป็นข้อมูลที่ท่านเป็นผู้กรอกและให้ความยินยอมด้วยตนเอง ได้แก่:",
      key_th: "1th",
      info: [
        "รหัสนักศึกษา",
        "อีเมลมหาวิทยาลัย",
        "ข้อมูลการเข้าสู่ระบบ (Session Tokens) เพื่อใช้ในการคงสถานะการใช้งานบนหน้าเว็บ",
      ],
      title_eng: "Personal Data We Collect",
      desc_eng:
        "We will collect personal data only as necessary, provided voluntarily with your consent, which includes:",
      key_eng: "1en",
      info_eng: [
        "Student ID",
        "University Email",
        "Login Information (Session Tokens) to maintain your login status on the website.",
      ],
    },
    {
      id: "2",
      title: "วัตถุประสงค์ในการประมวลผลข้อมูล",
      desc: "เราจัดเก็บและประมวลผลข้อมูลส่วนบุคคลของท่านภายใต้ ฐานความยินยอม (Consent Basis) โดยมีวัตถุประสงค์ดังต่อไปนี้:",
      key_th: "2th",
      info: [
        "เพื่อใช้เป็นฐานข้อมูลและระบบสืบค้นรายชื่อสำหรับติดต่อสื่อสารและประสานงานภายในกลุ่มนักศึกษา",
        "เพื่อใช้ในการยืนยันตัวตน (Authentication) ว่าผู้ใช้งานเป็นนักศึกษาหรือบุคลากรของสถาบันจริง",
        "เราจะไม่นำข้อมูลส่วนบุคคลของท่านไปขาย เผยแพร่แก่บุคคลภายนอกที่ไม่เกี่ยวข้อง หรือใช้ในเชิงพาณิชย์โดยเด็ดขาด",
      ],
      title_eng: "Purposes of Data Processing",
      desc_eng:
        "We collect and process your personal data under the Consent Basis for the following purposes:",
      key_eng: "2en",
      info_eng: [
        "To serve as a database and search directory for communication and coordination within the student group.",
        "To authenticate and verify that the user is an actual student or personnel of the institution.",
        "We will strictly never sell, distribute your personal data to unrelated external parties, or use it for commercial purposes.",
      ],
    },
    {
      id: "3",
      title: "ระยะเวลาในการจัดเก็บข้อมูล",
      desc: "เราจะจัดเก็บข้อมูลส่วนบุคคลของท่านไว้ตลอดระยะเวลาที่กิจกรรมยังดำเนินการอยู่ หรือจนกว่าท่านจะใช้สิทธิ์แจ้งความประสงค์ขอลบข้อมูลออกจากระบบ",
      key_th: "3th",
      info: [],
      title_eng: "Data Retention Period",
      desc_eng:
        "We will retain your personal data for the entire duration of the activity's operations, or until you exercise your right to request the deletion of your data from the system.",
      key_eng: "3en",
      info_eng: [],
    },
    {
      id: "4",
      title: "การรักษาความปลอดภัยของข้อมูล",
      desc: "เรามีมาตรการรักษาความปลอดภัยทางเทคนิคเพื่อปกป้องข้อมูลของท่าน ดังนี้:",
      key_th: "4th",
      info: [
        "ใช้โปรโตคอล HTTPS เพื่อเข้ารหัสการรับส่งข้อมูลระหว่างเบราว์เซอร์ของผู้ใช้และเซิร์ฟเวอร์",
        "มีการจัดเก็บข้อมูลอย่างปลอดภัยในระบบฐานข้อมูลที่จำกัดสิทธิ์การเข้าถึง (Access Control) เฉพาะผู้ดูแลระบบที่มีหน้าที่เกี่ยวข้องเท่านั้น",
      ],
      title_eng: "Data Security",
      desc_eng:
        "We implement technical security measures to protect your data as follows:",
      key_eng: "4en",
      info_eng: [
        "We utilize the HTTPS protocol to encrypt data transmission between the user's browser and the server.",
        "Data is securely stored in a database system with strict access control, restricted only to authorized administrators with relevant duties.",
      ],
    },
    {
      id: "5",
      title: "สิทธิ์ของเจ้าของข้อมูลส่วนบุคคล",
      desc: "ในฐานะเจ้าของข้อมูลส่วนบุคคล ท่านมีสิทธิ์ตามกฎหมาย PDPA ดังต่อไปนี้:",
      key_th: "5th",
      info: [
        "สิทธิ์ในการเข้าถึงและแก้ไข: ท่านสามารถตรวจสอบและอัปเดตข้อมูลของตนเองให้ถูกต้องได้ตลอดเวลาผ่านหน้าโปรไฟล์",
        "สิทธิ์ในการถอนความยินยอมและลบข้อมูล: ท่านสามารถลบข้อมูลของตนเองออกจากระบบ หรือแจ้งความประสงค์ให้ผู้ดูแลระบบลบข้อมูลให้ได้ โดยการถอนความยินยอมจะไม่ส่งผลกระทบต่อการประมวลผลข้อมูลที่ท่านเคยให้ความยินยอมไปก่อนหน้านั้น",
      ],
      title_eng: "Data Subject Rights",
      desc_eng:
        "As a data subject, you hold the following legal rights under the PDPA:",
      key_eng: "5en",
      info_eng: [
        "Right to Access and Rectify: You can review and update your own information to ensure accuracy at any time via your profile page.",
        "Right to Withdraw Consent and Erase: You can delete your own data from the system or notify the administrator to request data deletion. Note that withdrawing consent will not affect any data processing carried out prior to the withdrawal.",
      ],
    },
    {
      id: "6",
      title: "การใช้คุกกี้",
      desc: "เว็บไซต์นี้มีการใช้งานคุกกี้ที่จำเป็น (Strictly Necessary Cookies) เพื่อวัตถุประสงค์ในการจำการเข้าสู่ระบบ (Login Session) ของผู้ใช้งานเท่านั้น ไม่มีการนำไปใช้เพื่อการติดตามพฤติกรรมหรือการทำโฆษณา",
      key_th: "6th",
      info: [],
      title_eng: "Use of Cookies",
      desc_eng:
        "This website uses Strictly Necessary Cookies solely for the purpose of remembering user login sessions. They are not used for behavioral tracking or advertising purposes.",
      key_eng: "6en",
      info_eng: [],
    },
  ];

  const contacts = [
    { id: "c1", platform: "Instagram", name: "cpe_studentunion" },
  ];


  const cardStyle =
    "group relative z-1 p-6 md:p-8 bg-white text-blue-900 border-3 border-blue-900 rounded-3xl shadow-[6px_6px_0px_0px_var(--color-blue-900)] hover:shadow-[10px_10px_0px_0px_var(--color-quirky)] transition-all duration-300 hover:-translate-x-[2px] hover:-translate-y-[2px] cursor-help overflow-hidden";

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 p-4 md:p-8 pb-20 selection:bg-quirky selection:text-blue-900">

      <BackButton path="/"></BackButton>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto flex flex-col gap-8 mt-20"
      >

        <motion.header
          variants={itemVariants}
          className="relative self-center bg-blue-900 text-white border-4 border-blue-900 px-8 py-6 rounded-3xl rotate-[-1deg] shadow-[8px_8px_0px_0px_var(--color-quirky)] text-center flex flex-col gap-2 min-w-[300px]"
        >
          <div className="absolute -top-5 -left-5 w-10 h-10 bg-quirky border-3 border-blue-900 rounded-full flex items-center justify-center text-blue-900 rotate-12">
            <FontAwesomeIcon icon={faShieldHalved} className="text-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-mali font-bold tracking-tight">
            Privacy Policy
          </h1>
          <span className="text-xs font-sans font-bold opacity-70">
            LAST UPDATED: 8 JULY 2026
          </span>
        </motion.header>


        <motion.div variants={itemVariants} className={cardStyle}>

          <div className="absolute top-2 right-4 text-[10px] font-bold font-mali text-blue-600/60 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
            💡 เอาเมาส์มาชี้เพื่อสลับเป็นภาษาอังกฤษ (Hover to Translate)
          </div>

          <div className="grid grid-cols-1 grid-rows-1">

            <div className="col-start-1 row-start-1 opacity-100 group-hover:opacity-0 transition-all duration-500 ease-in-out flex flex-col gap-3 font-sans font-medium text-base md:text-lg">
              <p className="indent-8 leading-relaxed">
                พวกเราให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของท่าน
                นโยบายความเป็นส่วนตัวฉบับนี้จัดทำขึ้นเพื่อชี้แจงรายละเอียดเกี่ยวกับการเก็บรวบรวม
                การใช้ และการปกป้องข้อมูลส่วนบุคคลของนักศึกษาที่ใช้งานระบบนี้
                ให้เป็นไปตาม พรบ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
              </p>
              <p className="indent-8 leading-relaxed text-sm md:text-base text-blue-900/70 bg-blue-50 p-3 rounded-2xl border-2 border-dashed border-blue-900/30">
                ⚠️
                กรุณาอ่านข้อกำหนดและเงื่อนไขเหล่านี้อย่างละเอียดก่อนใช้งานระบบ
                การเข้าใช้งานหรือการลงทะเบียน
                ถือว่าท่านได้ยอมรับข้อตกลงที่ระบุไว้ทุกประการ
              </p>
            </div>


            <div className="col-start-1 row-start-1 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col gap-3 font-sans font-medium text-base md:text-lg">
              <p className="indent-8 leading-relaxed">
                We prioritize the protection of your personal data. This Privacy
                Policy clarifies the collection, use, and protection of the
                personal data of students using this system, in accordance with
                the Personal Data Protection Act B.E. 2562 (PDPA).
              </p>
              <p className="indent-8 leading-relaxed text-sm md:text-base text-blue-900/70 bg-blue-50 p-3 rounded-2xl border-2 border-dashed border-blue-900/30">
                ⚠️ Please read these terms and conditions carefully before using
                the system. By accessing or registering, you agree to accept all
                terms in their entirety.
              </p>
            </div>
          </div>
        </motion.div>


        <div className="flex flex-col gap-6">
          {lists.map((list) => (
            <motion.div
              variants={itemVariants}
              key={list.id}
              className={cardStyle}
            >
              <div className="grid grid-cols-1 grid-rows-1">

                <div className="col-start-1 row-start-1 opacity-100 group-hover:opacity-0 transition-all duration-500 ease-in-out">
                  <h2 className="text-xl md:text-2xl font-mali font-bold text-blue-900 flex items-center gap-3">
                    <span className="bg-quirky px-2 py-0.5 rounded-lg border-2 border-blue-900 text-sm shadow-[2px_2px_0px_0px_var(--color-blue-900)]">
                      {list.id}
                    </span>
                    {list.title}
                  </h2>
                  <p className="mt-3 font-sans font-medium text-sm md:text-base text-blue-900/90 leading-relaxed pl-2 md:pl-8">
                    {list.desc}
                  </p>
                  {list.info.length > 0 && (
                    <ul className="pl-6 md:pl-14 mt-3 list-disc space-y-1.5 font-sans font-bold text-xs md:text-sm text-blue-700">
                      {list.info.map((infos) => (
                        <li key={infos} className="marker:text-blue-900">
                          <p className="font-medium text-blue-900/80">
                            {infos}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>


                <div className="col-start-1 row-start-1 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <h2 className="text-xl md:text-2xl font-mali font-bold text-blue-900 flex items-center gap-3">
                    <span className="bg-quirky px-2 py-0.5 rounded-lg border-2 border-blue-900 text-sm shadow-[2px_2px_0px_0px_var(--color-blue-900)]">
                      {list.id}
                    </span>
                    {list.title_eng}
                  </h2>
                  <p className="mt-3 font-sans font-medium text-sm md:text-base text-blue-900/90 leading-relaxed pl-2 md:pl-8">
                    {list.desc_eng}
                  </p>
                  {list.info_eng.length > 0 && (
                    <ul className="pl-6 md:pl-14 mt-3 list-disc space-y-1.5 font-sans font-bold text-xs md:text-sm text-blue-700">
                      {list.info_eng.map((infos) => (
                        <li key={infos} className="marker:text-blue-900">
                          <p className="font-medium text-blue-900/80">
                            {infos}
                          </p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>


        <motion.div
          variants={itemVariants}
          className="mt-4 p-6 bg-cloud rounded-3xl border-3 border-blue-900 shadow-[6px_6px_0px_0px_var(--color-blue-900)]"
        >
          <h2 className="font-mali font-bold text-2xl text-blue-900 flex items-center gap-2 mb-4">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-xl text-blue-600"
            />
            Contact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white p-3 rounded-2xl border-2 border-blue-900 shadow-[2px_2px_0px_0px_var(--color-blue-900)] flex flex-col"
              >
                <span className="text-[10px] font-sans font-bold text-blue-500 uppercase tracking-wider">
                  {contact.platform}
                </span>
                <span className="text-sm font-bold text-blue-900 font-mali truncate">
                  {contact.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <footer className="absolute bottom-3 left-4 text-xs text-blue-900/40 z-20 font-mali">
        ©2026 CPE39. All rights reserved.
      </footer>
    </div>
  );
}
