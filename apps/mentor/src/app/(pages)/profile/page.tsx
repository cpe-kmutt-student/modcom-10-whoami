"use client";

import { ContactPlatform } from "@repo/database/prisma";
import clsx from "clsx";
import {
	Camera,
	CirclePlus,
	Lightbulb,
	LogOut,
	Plus,
	Save,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { signOut } from "../../../libs/auth-client";

export default function ProfilePage(): React.JSX.Element {
	const router = useRouter();

	const inputRef = useRef<HTMLInputElement>(null);
	const [isProfileAvailable, setIsProfileAvailable] = useState<boolean>(false);
	const [contacts, setContacts] = useState<
		{ platform: string; value: string }[]
	>([{ platform: Object.keys(ContactPlatform)[0] || "", value: "" }]);

	useEffect(() => {
		console.log(contacts);
	}, [contacts]);

	const handleAddContactField = () => {
		setContacts([
			...contacts,
			{ platform: Object.keys(ContactPlatform)[0] || "", value: "" },
		]);
	};

	const handleSignOut = async () => {
		await signOut();
		router.push("/login");
	};

	const handleUploadClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			console.log(file);
			// Upload file here
		}
	};
	return (
		<>
			<div className="container mx-auto w-full text-black">
				<div className="flex flex-row justify-center max-w-3xl mx-auto">
					<div className="w-full my-14 mx-5">
						<div className="text-3xl font-extrabold">Mentor's Profile</div>
						<div className="text-base">
							Add your details and three hints. Mentees will use these clues to
							find the right mentor.
						</div>
						<div className="mt-10 rounded-3xl px-8 border shadow-2xl mb-5 py-8 flex flex-col bg-white relative">
							<button
								type="button"
								className="absolute right-5 top-5 w-12 h-12 border rounded-2xl hover:bg-[#ffbfbf] duration-300 hover:shadow-xl active:scale-[.97]"
								onClick={() => handleSignOut()}
							>
								<LogOut className="mx-auto" />
							</button>
							<div className="flex flex-col items-center justify-center">
								<input
									ref={inputRef}
									type="file"
									className="hidden"
									onChange={handleFileChange}
								/>
								<div
									className="w-28 h-28 bg-[#E6E9EE] rounded-full hover:bg-[#bbbbbb] duration-300 flex flex-col justify-center items-center cursor-pointer group"
									onClick={() => handleUploadClick()}
								>
									<Camera
										className={clsx("text-black z-10", {
											"opacity-0": isProfileAvailable,
											"opacity-100": !isProfileAvailable,
										})}
									/>
								</div>
								<button
									type="button"
									className="border px-12 py-1 mt-3 rounded-full hover:bg-[#CAF0F8] hover:shadow-md duration-300 hover:px-6 active:scale-[.97] text-sm font-semibold"
									onClick={() => handleUploadClick()}
								>
									Upload photo
								</button>
								<div className="mt-10 font-bold text-2xl">
									kanakorn.thai@kmutt.ac.th
								</div>
								<div className="font-semibold text-lg">68070501007</div>
							</div>

							<div className="h-[2px] w-auto border shadow-lg my-10 mb-6 rounded-full mx-20"></div>

							<div className="flex flex-row items-start mt-3">
								<div className="p-2.5 bg-[#CAF0F8] rounded-lg">
									<User />
								</div>
								<div className="flex flex-col ml-5 justify-start">
									<div className="font-bold">About You</div>
									<div className="mt-[-5px]">
										Provide a few details about yourself
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start mt-5">
								<div className="font-medium text-sm ml-1 peer-focus:scale-150">
									Nickname
								</div>
								<input
									className="bg-white w-full border-[2px] rounded-xl h-10 px-5 mt-2 shadow-md outline-none border-[#CAF0F8] focus:scale-105 duration-300 peer"
									type="text"
									placeholder="What should people call you?"
								/>
							</div>
							<div className="flex flex-col items-start mt-5">
								<div className="flex flex-row items-center justify-between w-full">
									<div className="font-medium text-sm ml-1">Contact</div>
									<Plus
										size={20}
										className="text-black cursor-pointer hover:text-[#3adeff] duration-300 mr-1"
										onClick={() => handleAddContactField()}
									/>
								</div>
								{contacts.map((contact, index) => (
									<div key={index} className="flex flex-row w-full">
										<select
											className="bg-white border-[2px] w-28 rounded-xl h-10 pl-2 pr-5 mt-2 shadow-md outline-none border-[#CAF0F8] focus:scale-105 duration-300 peer"
											value={contact.platform}
											onChange={(e) => {
												setContacts(
													contacts.map((c, i) =>
														i === index
															? { ...c, platform: e.target.value }
															: c,
													),
												);
											}}
										>
											{Object.keys(ContactPlatform).map((pf, i) => (
												<option key={i} value={pf}>
													{pf.slice(0, 1).toUpperCase()}
													{pf.slice(1).toLowerCase()}
												</option>
											))}
										</select>
										<input
											className="bg-white w-full ml-2 border-[2px] rounded-xl h-10 px-5 mt-2 shadow-md outline-none border-[#CAF0F8] focus:scale-105 duration-300 peer"
											type="text"
											placeholder="Enter your username or link"
											value={contact.value}
											onChange={(e) => {
												setContacts(
													contacts.map((c, i) =>
														i === index ? { ...c, value: e.target.value } : c,
													),
												);
											}}
										/>
									</div>
								))}
							</div>

							<div className="h-[2px] w-auto border shadow-lg my-10 mb-6 rounded-full mx-20"></div>

							<div className="flex flex-row items-start mt-3">
								<div className="p-2.5 bg-[#CAF0F8] rounded-lg">
									<Lightbulb />
								</div>
								<div className="flex flex-col ml-5 justify-start">
									<div className="font-bold">Three hints</div>
									<div className="mt-[-5px]">
										Clues about your expertise, lab, or interests — keep them
										short and specific.
									</div>
								</div>
							</div>

							<div className="flex flex-col items-start mt-5">
								<div className="w-full relative">
									<textarea
										placeholder="e.g. Full-stack developer"
										className="bg-white w-full border-[2px] rounded-xl h-10 pl-10 pr-5 mt-2 shadow-md outline-none border-[#CAF0F8] focus:scale-105 duration-300 peer py-[0.40rem] overflow-y-hidden"
									></textarea>
									<div className="absolute top-4 left-5 text-base peer-focus:left-1 duration-300">
										1
									</div>
								</div>

								<div className="w-full relative mt-2">
									<textarea
										placeholder="e.g. AI & Machine Learning"
										className="bg-white w-full border-[2px] rounded-xl h-10 pl-10 pr-5 mt-2 shadow-md outline-none border-[#CAF0F8] focus:scale-105 duration-300 peer py-[0.40rem] overflow-y-hidden"
									></textarea>
									<div className="absolute top-4 left-5 text-base peer-focus:left-1 duration-300">
										2
									</div>
								</div>

								<div className="w-full relative mt-2">
									<textarea
										placeholder="e.g. Loves hackathons"
										className="bg-white w-full border-[2px] rounded-xl h-10 pl-10 pr-5 mt-2 shadow-md outline-none border-[#CAF0F8] focus:scale-105 duration-300 peer py-[0.40rem] overflow-y-hidden"
									></textarea>
									<div className="absolute top-4 left-5 text-base peer-focus:left-1 duration-300">
										3
									</div>
								</div>
							</div>

							<div className="h-[2px] w-auto border shadow-lg my-10 mb-4 rounded-full "></div>

							<div className="flex flex-row items-center w-full justify-end mt-1">
								<button
									type="button"
									className="border px-5 py-2 rounded-xl bg-[#CAF0F8] hover:bg-[#b3f2ff] hover:shadow-md duration-300 active:scale-[.97] text-sm font-semibold flex flex-row items-center gap-2"
								>
									<Save />
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
