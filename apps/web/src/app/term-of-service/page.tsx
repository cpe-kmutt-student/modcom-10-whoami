import Image from "next/image";

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
				<h1 className="text-7xl font-bold col-start-1 row-start-1 row-span-3 justify-self-center">
					Term Of Service
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
								เว็บไซต์นี้จัดทำขึ้นเพื่อเป็นระบบรวบรวมรายชื่อ รหัสนักศึกษา และอีเมลของรุ่นน้อง
								เพื่อประโยชน์ในการติดต่อประสานงาน
								และสร้างเครือข่ายภายในภาควิชาวิศวกรรมคอมพิวเตอร์
							</p>
							<p>
								กรุณาอ่านข้อกำหนดและเงื่อนไขเหล่านี้อย่างละเอียดก่อนใช้งานระบบ
								การเข้าใช้งานหรือการลงทะเบียนในระบบนี้
								ถือว่าท่านได้ยอมรับข้อตกลงและเงื่อนไขที่ระบุไว้ดังต่อไปนี้ทุกประการ
							</p>
						</div>
						<div className="col-start-1 row-start-1 opacity-0 group-hover:delay-100 transition group-hover:opacity-100 duration-1000 ease-in-out">
							<p>
								This website was created as a system to gather the names,
								student IDs, and emails of juniors for the purpose of
								coordination and networking within the Department of Computer
								Engineering. Please read these terms and conditions carefully
								before using the system. By accessing or registering on this
								system, you agree to accept all terms and conditions stated
								below in their entirety.
							</p>
							<p></p>
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
					<div className="p-3 m-5 my-10 bg-[#03045E] rounded-lg transition delay-200 ease-in-out duration-3000 hover:bg-white">
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
