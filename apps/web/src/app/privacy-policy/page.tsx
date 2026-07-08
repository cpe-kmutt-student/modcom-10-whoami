import Image from "next/image";

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
				"Login Information (Session Tokens)  to maintain your login status on the website.",
			],
		},
		{
			id: "2",
			title: "วัตถุประสงค์ในการประมวลผลข้อมูล",
			desc: "ราจัดเก็บและประมวลผลข้อมูลส่วนบุคคลของท่านภายใต้ ฐานความยินยอม (Consent Basis) โดยมีวัตถุประสงค์ดังต่อไปนี้:",
			key_th: "2th",
			info: [
				"เพื่อใช้เป็นฐานข้อมูลและระบบสืบค้นรายชื่อสำหรับติดต่อสื่อสารและประสานงานภายในกลุ่มนักศึกษา",
				"เพื่อใช้ในการยืนยันตัวตน (Authentication) ว่าผู้ใช้งานเป็นนักศึกษาหรือบุคคลากรของสถาบันจริง",
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
		{ id: "c1", platform: "aa", name: "b" },
		{ id: "c2", platform: "ab", name: "bb" },
		{ id: "c3", platform: "ac", name: "bbb" },
	];

	const default_style =
		"group z-1 p-3 m-3 mx-7 bg-[#03045E] rounded-lg rotate-0 transition-all delay-100 ease-in-out hover:scale-102 hover:rotate-1 border-b-1 hover:shadow-[10px_10px_0px_0px_rgba(0,180,216,1)] hover:my-7";
	const a =
		"grid grid-cols-1 grid-rows-1 group p-3 mt-30 mb-10 border-10 border-[#00b4d8] mx-5 bg-[#03045E] rounded-lg -rotate-1 shadow-[10px_10px_0px_0px_rgba(0,180,216,1)]";

	return (
		<div className="bg-light-cyan-200 text-white">
			<header className="grid grid-cols-1 grid-rows-5 justify-self-center justify-center p-20 pb-17 my-10 bg-[#03045E] border-20 border-[#00b4d8] rotate-1 shadow-[20px_20px_0px_0px_rgba(0,180,216,1)]">
				<h1 className="text-7xl font-bold col-start-1 row-start-1 row-span-3">
					Privacy Policy
				</h1>
				<span className="opacity-60 col-start-1 row-start-5 justify-self-center">
					last updated: today
				</span>
			</header>
			<div className="flex flex-col text-lg">
				<div className={default_style}>
					<div className="grid grid-cols-1 grid-rows-1">
						<div className="col-start-1 row-start-1 opacity-100 group-hover:delay-100 transition group-hover:opacity-0 duration-1000 ease-in-out">
							<p>
								ให้ความสำคัญกับการคุ้มครองข้อมูลส่วนบุคคลของท่าน
								นโยบายความเป็นส่วนตัวฉบับนี้จัดทำขึ้นเพื่อชี้แจงรายละเอียดเกี่ยวกับการเก็บรวบรวม
								การใช้ และการปกป้องข้อมูลส่วนบุคคลของนักศึกษาและศิษย์เก่าที่ใช้งานระบบนี้
								ให้เป็นไปตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
							</p>
							<p>
								กรุณาอ่านข้อกำหนดและเงื่อนไขเหล่านี้อย่างละเอียดก่อนใช้งานระบบ
								การเข้าใช้งานหรือการลงทะเบียนในระบบนี้
								ถือว่าท่านได้ยอมรับข้อตกลงและเงื่อนไขที่ระบุไว้ดังต่อไปนี้ทุกประการ
							</p>
						</div>
						<div className="col-start-1 row-start-1 opacity-0 group-hover:delay-100 transition group-hover:opacity-100 duration-1000 ease-in-out">
							<p>
								We prioritize the protection of your personal data. This Privacy
								Policy is established to clarify the details regarding the
								collection, use, and protection of the personal data of students
								and alumni using this system, in accordance with the Personal
								Data Protection Act B.E. 2562 (PDPA).
							</p>
							<p>
								Please read these terms and conditions carefully before using
								the system. By accessing or registering on this system, you
								agree to accept all terms and conditions stated below in their
								entirety.
							</p>
						</div>
					</div>
				</div>
				<div className="w-11/12 border-t-8 h-2 self-center rounded-full my-7"></div>
				<div className="grid gird-cols-1 pt-2 [&_h1]:font-bold [&_h1]:text-xl ">
					{lists.map((list) => (
						<div key={list.id} className={default_style}>
							<div className="grid grid-cols-1 grid-rows-1">
								<div className="col-start-1 row-start-1 opacity-100 group-hover:delay-100 transition group-hover:opacity-0 duration-1000 ease-in-out">
									<h1>
										{list.id}. {list.title}
									</h1>
									<p className="indent-10 mt-1">{list.desc}</p>

									<ul key={list.key_th} className="pl-16 mt-2 list-disc">
										{list.info.map((infos, index) => (
											<li key={infos}>
												<p>{infos}</p>
											</li>
										))}
									</ul>
								</div>
								<div className="col-start-1 row-start-1 opacity-0 group-hover:delay-100 transition group-hover:opacity-100 duration-1000 ease-in-out">
									<h1>
										{list.id}. {list.title_eng}
									</h1>
									<p className="indent-10 mt-1">{list.desc_eng}</p>
									<ul key={list.key_eng} className="pl-16 mt-2 list-disc">
										{list.info_eng.map((infos, index) => (
											<li key={infos}>
												<p>{infos}</p>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					))}

					<div className="w-11/12 border-t-2 h-2 self-center mt-4"></div>
					<div className="p-3 m-5 my-10 bg-light-cyan-950/70 rounded-lg transition delay-200 ease-in-out duration-3000 hover:bg-white">
						<h1 className="font-bold text-xl">Contact</h1>
						{contacts.map((contact) => (
							<p key={contact.id} className="mt-3 indent-3">
								{contact.platform}: {contact.name}
							</p>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
