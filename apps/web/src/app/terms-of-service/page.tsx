"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faScaleBalanced,
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
      title: "คุณสมบัติของผู้ใช้งาน",
      desc: "",
      key_th: "1th",
      info: [
        "ผู้ใช้งานระบบและผู้ที่ได้รับการบันทึกข้อมูลในระบบนี้ จะต้องเป็นนักศึกษาสังกัดภาควิชาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี เท่านั้น",
        "ผู้จัดทำระบบขอสงวนสิทธิ์ในการตรวจสอบสิทธิ์ และปฏิเสธการให้บริการแก่บุคคลภายนอกที่ไม่เกี่ยวข้อง",
      ],
      title_eng: "User Qualifications",
      desc_eng: "",
      key_eng: "1en",
      info_eng: [
        "Must be a student under the Department of Computer Engineering, King Mongkut's University of Technology Thonburi (KMUTT) only.",
        "Developers reserve the right to verify eligibility and deny service to external parties.",
      ],
    },
    {
      id: "2",
      title: "การเก็บรวบรวมข้อมูลและการให้ความยินยอม",
      desc: "",
      key_th: "2th",
      info: [
        "การกรอกข้อมูลรหัสนักศึกษา อีเมล หรือข้อมูลส่วนบุคคลอื่นๆ ลงในระบบนี้ ต้องกระทำโดยความสมัครใจของเจ้าของข้อมูลเองเท่านั้น",
        "ผู้ใช้งานยอมรับว่า ข้อมูลที่ท่านระบุจะถูกนำไปเก็บไว้ในฐานข้อมูลชั่วคราว เพื่อให้สมาชิกคนอื่นในระบบสามารถสืบค้นและใช้ติดต่อประสานงานได้ตามวัตถุประสงค์ของเว็บไซต์",
      ],
      title_eng: "Data Collection & Consent",
      desc_eng: "",
      key_eng: "2en",
      info_eng: [
        "Providing personal data (Student ID, email, etc.) must be entirely voluntary.",
        "Data will be stored in a temporary database allowing other members within the system to search and contact each other for official coordination purposes.",
      ],
    },
    {
      id: "3",
      title: "ข้อจำกัดและข้อห้ามในการใช้งานระบบ",
      desc: "",
      key_th: "3th",
      info: [
        "ห้ามนำข้อมูลของผู้อื่นมาลงทะเบียนโดยไม่ได้รับอนุญาต หรือแอบอ้างเป็นบุคคลอื่น",
        "ห้ามใช้โปรแกรมอัตโนมัติในการดึงข้อมูลรายชื่อ รหัสนักศึกษา หรืออีเมล ออกจากระบบนี้โดยเด็ดขาด",
        "ห้ามนำอีเมลและข้อมูลติดต่อจากระบบนี้ ไปใช้ในวัตถุประสงค์เพื่อการค้า การโฆษณา การส่งสแปม หรือการกระทำอื่นใดที่สร้างความเดือดร้อนรำคาญให้แก่เจ้าของข้อมูล",
      ],
      title_eng: "Restrictions & Prohibitions",
      desc_eng: "",
      key_eng: "3en",
      info_eng: [
        "Prohibited to register using other people's data or impersonate others.",
        "Automated programs/bots are strictly banned from extracting data from the system.",
        "Prohibited to use contact details for commercial use, advertising, spamming, or causing a nuisance.",
      ],
    },
    {
      id: "4",
      title: "สิทธิ์ของเจ้าของข้อมูลและการลบข้อมูล",
      desc: "",
      key_th: "4th",
      info: [
        "เจ้าของข้อมูลมีสิทธิ์ในการเข้าถึง แก้ไข อัปเดต หรือลบข้อมูลส่วนบุคคลของตนเองออกจากระบบได้ตลอดเวลา",
        "ในกรณีที่ไม่สามารถดำเนินการด้วยตนเองได้ สามารถติดต่อผู้ดูแลระบบเพื่อแจ้งความประสงค์ขอลบข้อมูลออกได้ที่ช่องทางติดต่อด้านล่าง โดยผู้ดูแลระบบจะดำเนินการลบข้อมูลให้ภายใน 72 ชั่วโมง",
      ],
      title_eng: "Data Owner Rights & Deletion",
      desc_eng: "",
      key_eng: "4en",
      info_eng: [
        "Users can access, edit, update, or delete their personal data at any time.",
        "If unable to delete data manually, users can request deletion through the contact channels. The admin will process the removal within 72 hours.",
      ],
    },
    {
      id: "5",
      title: "การจำกัดความรับผิดชอบ",
      desc: "",
      key_th: "5th",
      info: [
        "ผู้จัดทำระบบได้พยายามอย่างเต็มที่ในการรักษาความปลอดภัยของระบบฐานข้อมูลตามมาตรฐานสากล อย่างไรก็ตาม ผู้จัดทำระบบไม่สามารถรับประกันความปลอดภัยสัมบูรณ์จากการจารกรรมข้อมูล (Hacking) หรือเหตุสุดวิสัยทางเทคนิคได้",
        "ผู้จัดทำระบบจะไม่รับผิดชอบต่อความเสียหายใดๆ ที่เกิดขึ้นจากการที่ผู้ใช้งานนำข้อมูลในระบบนี้ไปใช้ในทางที่ผิดกฎหมายหรือผิดวัตถุประสงค์",
      ],
      title_eng: "Limitation of Liability",
      desc_eng: "",
      key_eng: "5en",
      info_eng: [
        "Developers implement international security standards but cannot guarantee absolute security against hacking or technical force majeure.",
        "Developers are not liable for any damages caused by illegal use or misuse of the data.",
      ],
    },
    {
      id: "6",
      title: "การเปลี่ยนแปลงข้อตกลง",
      desc: "",
      key_th: "6th",
      info: [
        "ผู้จัดทำระบบขอสงวนสิทธิ์ในการแก้ไขปรับปรุงข้อกำหนดและเงื่อนไขการใช้งานนี้ได้ตลอดเวลา โดยจะประกาศการเปลี่ยนแปลงบนหน้าเว็บไซต์นี้เพื่อให้ผู้ใช้รับทราบ",
      ],
      title_eng: "Amendments to the Terms",
      desc_eng: "",
      key_eng: "6en",
      info_eng: [
        "Terms can be updated at any time. Any modifications will be announced on the website.",
      ],
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
          className="relative self-center bg-blue-900 text-white border-4 border-blue-900 px-8 py-6 rounded-3xl rotate-[1deg] shadow-[8px_8px_0px_0px_var(--color-quirky)] text-center flex flex-col gap-2 min-w-[320px]"
        >
          <div className="absolute -top-5 -left-5 w-10 h-10 bg-quirky border-3 border-blue-900 rounded-full flex items-center justify-center text-blue-900 rotate-[-12deg]">
            <FontAwesomeIcon icon={faScaleBalanced} className="text-sm" />
          </div>
          <h1 className="text-4xl md:text-5xl font-mali font-bold tracking-tight">
            Terms of Service
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
                เว็บไซต์นี้จัดทำขึ้นเพื่อเป็นระบบรวบรวมรายชื่อ รหัสนักศึกษา
                และอีเมลของรุ่นน้อง เพื่อประโยชน์ในการติดต่อประสานงาน
                และสร้างเครือข่ายภายในภาควิชาวิศวกรรมคอมพิวเตอร์
              </p>
              <p className="indent-8 leading-relaxed text-sm md:text-base text-blue-900/70 bg-blue-50 p-3 rounded-2xl border-2 border-dashed border-blue-900/30">
                ⚠️
                กรุณาอ่านข้อกำหนดและเงื่อนไขเหล่านี้อย่างละเอียดก่อนใช้งานระบบ
                การเข้าใช้งานหรือการลงทะเบียนในระบบนี้
                ถือว่าท่านได้ยอมรับข้อตกลงและเงื่อนไขที่ระบุไว้ทุกประการ
              </p>
            </div>


            <div className="col-start-1 row-start-1 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out flex flex-col gap-3 font-sans font-medium text-base md:text-lg">
              <p className="indent-8 leading-relaxed">
                This website was created as a system to gather the names,
                student IDs, and emails of juniors for the purpose of
                coordination and networking within the Department of Computer
                Engineering.
              </p>
              <p className="indent-8 leading-relaxed text-sm md:text-base text-blue-900/70 bg-blue-50 p-3 rounded-2xl border-2 border-dashed border-blue-900/30">
                ⚠️ Please read these terms and conditions carefully before using
                the system. By accessing or registering on this system, you
                agree to accept all terms and conditions stated in their
                entirety.
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

                  {list.info.length > 0 && (
                    <ul className="pl-4 md:pl-10 mt-4 list-disc space-y-2.5 font-sans font-medium text-sm md:text-base text-blue-900/90 leading-relaxed">
                      {list.info.map((infos) => (
                        <li key={infos} className="marker:text-blue-900">
                          <p>{infos}</p>
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

                  {list.info_eng.length > 0 && (
                    <ul className="pl-4 md:pl-10 mt-4 list-disc space-y-2.5 font-sans font-medium text-sm md:text-base text-blue-900/90 leading-relaxed">
                      {list.info_eng.map((infos) => (
                        <li key={infos} className="marker:text-blue-900">
                          <p>{infos}</p>
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
