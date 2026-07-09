"use client";

import {
	faDiscord,
	faFacebook,
	faInstagram,
	faLine,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Variants } from "motion";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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
					`(${contact.syuser_nickname})`,
					contact.syuser_firstname,
					contact.syuser_lastname,
				]
					.filter(Boolean)
					.join(" ") ||
				contact.syuser_nickname ||
				"Unknown",
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
	const [selectedPrograms, setSelectedPrograms] = useState<string[]>([]);
	const [seniorContacts, setSeniorContacts] = useState<UserData[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSeniorContacts = async () => {
			setIsLoading(true);

			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/fy/sy/contact/`,
					{
						credentials: "include",
					},
				);

				if (!response.ok) {
					throw new Error("Failed to fetch senior contacts");
				}

				const data = (await response.json()) as FySeniorContactResponse;
				setSeniorContacts(mapSeniorContacts(data));
			} catch (error) {
				console.error("Failed to load senior contacts:", error);
				setSeniorContacts([]);
			} finally {
				setIsLoading(false);
			}
		};

		fetchSeniorContacts();
	}, []);

	const filteredData = seniorContacts.filter((user) => {
		if (selectedPrograms.length === 0) return true;
		return selectedPrograms.includes(user.program);
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
						รายชื่อพี่
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
								value="Reg"
								aria-label="Toggle Reg"
								className="rounded-2xl px-5 py-1 md:w-auto w-full h-auto drop-shadow-none transition-scale duration-100 active:scale-90"
							>
								Reg
							</ToggleGroupItem>
							<ToggleGroupItem
								value="Inter"
								aria-label="Toggle Inter"
								className="rounded-2xl px-5 py-1 md:w-auto w-full h-auto drop-shadow-none transition-scale duration-100 active:scale-90"
							>
								Inter
							</ToggleGroupItem>
							<ToggleGroupItem
								value="HDS"
								aria-label="Toggle HDS"
								className="rounded-2xl px-5 py-1 md:w-auto w-full h-auto drop-shadow-none transition-scale duration-100 active:scale-90"
							>
								HDS
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
						{isLoading ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="col-span-full rounded-3xl border-2 border-blue-900 bg-cloud px-6 py-10 text-center text-blue-900 shadow-comic"
							>
								กำลังโหลดรายชื่อพี่...
							</motion.div>
						) : filteredData.length === 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="col-span-full rounded-3xl border-2 border-blue-900 bg-cloud px-6 py-10 text-center text-blue-900 shadow-comic"
							>
								ไม่พบรายชื่อพี่ในหมวดที่เลือก
							</motion.div>
						) : (
							filteredData.map((user, index) => (
								<motion.div
									layout
									custom={index}
									variants={itemVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									key={user.id}
									className="flex items-start p-6 rounded-3xl border-2 border-blue-900 bg-cloud text-blue-900 shadow-comic"
								>
									<Image
										src={user.imageUrl}
										alt={user.name}
										width={64}
										height={64}
										className="w-16 h-16 rounded-full object-cover mr-4 shrink-0"
									/>

									<div className="flex flex-col min-w-0">
										<div className="flex flex-row items-center gap-1.5">
											<h3 className="text-base font-bold text-gray-900 truncate">
												{user.name}
											</h3>
											<div className="select-none inline-flex h-auto items-center px-2 py-0.5 rounded-full text-[10px] font-medium border border-indigo-200 text-indigo-500 bg-white">
												{user.program}
											</div>
										</div>

										{user.socials && Object.keys(user.socials).length > 0 && (
											<div className="flex flex-wrap gap-2 mt-auto pt-3">
												{user.socials.instagram && (
													<a
														href={user.socials.instagram.url}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center pl-2 pr-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-80 transition-opacity"
													>
														<FontAwesomeIcon
															icon={faInstagram}
															className="mr-1.5"
														/>
														{user.socials.instagram.username}
													</a>
												)}

												{user.socials.facebook && (
													<a
														href={user.socials.facebook.url}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center pl-2 pr-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-[#1877F2] hover:opacity-80 transition-opacity"
													>
														<FontAwesomeIcon
															icon={faFacebook}
															className="mr-1.5"
														/>
														{user.socials.facebook.username}
													</a>
												)}

												{user.socials.discord && (
													<a
														href={user.socials.discord.url}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center pl-2 pr-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-[#5865F2] hover:opacity-80 transition-opacity"
													>
														<FontAwesomeIcon
															icon={faDiscord}
															className="mr-1.5"
														/>
														{user.socials.discord.username}
													</a>
												)}

												{user.socials.line && (
													<a
														href={user.socials.line.url}
														target="_blank"
														rel="noopener noreferrer"
														className="inline-flex items-center pl-2 pr-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-[#00C300] hover:opacity-80 transition-opacity"
													>
														<FontAwesomeIcon icon={faLine} className="mr-1.5" />
														{user.socials.line.username}
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
		</div>
	);
}
