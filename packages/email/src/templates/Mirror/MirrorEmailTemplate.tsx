import {
	Body,
	Button,
	Container,
	Font,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";
import * as React from "react";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";

export default function MirrorEmailTemplate({
	nickname,
	contents,
}: {
	nickname: string;
	contents: string[];
}) {
	return (
		<Html>
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {
								zootopia: {
									navy: "#464f6a",
									blue: "#92a6d2",
									orange: "#e98d55",
									yellow: "#f2d575",
									brown: "#504039",
								},
							},
						},
					},
				}}
			>
				<Head>
					<Font
						fontFamily="Helvetica"
						fallbackFontFamily="Arial"
						fontWeight={400}
						fontStyle="normal"
					/>
				</Head>
				<Preview>คือไรน้าาาา ลองเปิดดูสิ อิอิ</Preview>

				<Body className="bg-white font-sans">
					<Container className="mx-auto w-full max-w-[800px] my-10 bg-white rounded-2xl overflow-hidden shadow-lg">
						<Header />

						<Section className="bg-white px-6 py-8 text-center">
							<Text className="text-sm font-semibold text-[#92a6d2] m-0 mb-2 tracking-widest">
								Technical Team of ModCom Cup 2026
							</Text>
						</Section>

						<Section className="px-6 pt-4 pb-10">
							<Section className="">
								<Text className="text-base leading-relaxed m-0">
									สวัสดี{nickname}
								</Text>
							</Section>

							<Section className="">
								{contents.map((content) => (
									<Text
										key={content}
										className="text-base leading-relaxed indent-16"
									>
										{content}
									</Text>
								))}
							</Section>

							<Section className="mt-10">
								<Text className="text-end text-base leading-relaxed m-0">
									เซ่นเซวิก - ซิกเซเว่น
								</Text>
							</Section>
							<Text className="text-sm text-center m-0 mt-6">
								ขอบคุณที่ได้มาพบกันในค่าย ModCom Cup 2026 นะ 🫶🏻
							</Text>
						</Section>

						<Footer />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
