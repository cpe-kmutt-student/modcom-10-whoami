import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Heading,
	Html,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";

interface NewHintEmailProps {
	menteeName: string;
	hint: string;
	url: string;
}

export default function NewHintEmail({
	menteeName,
	hint,
	url,
}: NewHintEmailProps) {
	return (
		<Html>
			<Head>
				<Font
					fontFamily="Helvetica"
					fallbackFontFamily="Arial"
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>

			<Preview>🔍 ใบ้ใหม่จากพี่รหัสมาเเล้ว มาตามหาพี่ๆ กันเถอะ</Preview>

			<Tailwind>
				<Body className="bg-slate-100 font-sans py-10">
					<Container className="mx-auto my-10 max-w-[720px] overflow-hidden rounded-3xl bg-white shadow-xl">
						{/* Header */}
						<Section className="bg-gradient-to-r from-amber-600 to-blue-600 px-8 pt-12 pb-5 text-center">
							<Text className="m-0 text-2xl font-bold uppercase tracking-[4px] text-amber-600 mb-3">
								ModCom
							</Text>
							<Text className="m-0 text-sm font-bold uppercase tracking-[4px] text-amber-600">
								Mentor • Mentee
							</Text>

							<Heading className="m-0 mt-4 font-bold text-black flex flex-col">
								<Text className="text-7xl">🔍</Text>
								<Text className="text-3xl">มีคำใบ้ใหม่! จากใครเอ่ยยย??</Text>
							</Heading>
						</Section>

						{/* Body */}
						<Section className="px-8 pb-10 ">
							<Text className="text-lg leading-8 text-black">
								สวัสดีคับบ น้อง<strong>{menteeName}</strong> 👋
							</Text>

							<Text className="mt-4 text-base leading-8 text-black">
								พี่รหัสของน้องได้ส่ง
								<strong> คำใบ้ใหม่ </strong>
								มาให้แล้ว!
							</Text>

							<Text className="mt-2 text-base leading-8 text-black">
								ลองใช้คำใบ้นี้เดาดูซิว่า พี่รหัสของน้องเป็นใครเอ่ยยย?? 🕵🏻‍♂️
							</Text>

							{/* Hint Card */}
							<Section className="my-10 rounded-2xl border border-amber-100 bg-amber-50 px-8 py-8 text-center">
								<Text className="m-0 text-lg font-bold uppercase tracking-[3px] text-amber-600">
									💡 Hint
								</Text>

								<Text className="mt-6 text-lg font-bold italic leading-10 text-black">
									"{hint}"
								</Text>
							</Section>

							{/* CTA */}
							<Section className="my-12 text-center">
								<Button
									href={url}
									className="rounded-full bg-amber-600 px-20 py-5 text-base font-bold text-white no-underline"
								>
									🔍 ดูคำใบ้ทั้งหมด
								</Button>

								<Text className="mt-6 text-sm text-black">
									เข้าสู่ระบบ Mentor-Mentee เพื่อดูคำใบ้ทั้งหมด
								</Text>
							</Section>

							{/* Info */}
							<Section className="rounded-2xl bg-slate-50 px-6 py-6">
								<Text className="m-0 text-center text-base leading-7 text-slate-600">
									💙 ขอให้เจอพี่รหัสเร็วๆ นะ เอ๊ะ! หรือเจอช้าๆ ดี อิอิ 😜
								</Text>
							</Section>
						</Section>

						{/* Footer */}
						<Section className="border-t border-slate-200 bg-slate-50 px-8 py-8 text-center">
							<Text className="m-0 text-lg font-bold text-black">ModCom10</Text>

							<Text className="mt-3 text-sm leading-6 text-black">
								กิจกรรมตามหาสายรหัสสำหรับน้องๆ CPE#40
							</Text>

							<Section className="mt-6 text-xs text-black flex flex-col items-center">
								<Text>อีเมลฉบับนี้ได้ถูกส่งโดยมนุษย์</Text>
								<Text className="mt-[-15px]">
									โปรดอย่าตอบกลับเพราะมนุษย์ไม่เข้าใจภาษาของโปรแกรมเมอร์ 🧑‍💻
								</Text>
							</Section>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
