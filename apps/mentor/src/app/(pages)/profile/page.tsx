"use client";

import { useDisclosure, useToast } from "@chakra-ui/react";
import { ContactPlatform } from "@repo/database/prisma";
import axios from "axios";
import clsx from "clsx";
import {
	Camera,
	CirclePlus,
	Lightbulb,
	LogOut,
	Plus,
	Save,
	Trash2,
	User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import HintUpdateModal from "../../../components/HintUpdateModal";
import LinkAccountModal from "../../../components/LinkAccountModal";
import { authClient, signOut } from "../../../libs/auth-client";

export default function ProfilePage(): React.JSX.Element {
	const router = useRouter();
	const { data } = authClient.useSession();
	const toast = useToast();

	const inputRef = useRef<HTMLInputElement>(null);
	const [profile, setProfile] = useState<string | null>(null);
	const [reload, setReload] = useState<number>(0);
	const [hintSelectIndex, setHintSelectIndex] = useState<number>(0);
	const [hintJuniorId, setHintJuniorId] = useState<string>("");
	const [contacts, setContacts] = useState<
		{ platform: string; value: string }[]
	>([{ platform: Object.keys(ContactPlatform)[0] || "", value: "" }]);
	const [nickname, setNickname] = useState<string>("");
	const [userData, setUserData] = useState<{
		email: string;
		id: string;
	}>({
		email: "Loading...",
		id: "Loading...",
	});
	const [triggerAfterFetchUser, setTriggerAfterFetchUser] = useState<number>(0);
	const [junior, setJunior] = useState([]);

	const linkAccount = useDisclosure();
	const linkAccountIsOpen = linkAccount.isOpen;
	const linkAccountOnOpen = linkAccount.onOpen;
	const linkAccountOnClose = linkAccount.onClose;

	const hintUpdateModal = useDisclosure();
	const hintUpdateModalIsOpen = hintUpdateModal.isOpen;
	const hintUpdateModalOnOpen = hintUpdateModal.onOpen;
	const hintUpdateModalOnClose = hintUpdateModal.onClose;

	useEffect(() => {
		(async () => {
			try {
				axios.defaults.withCredentials = true;
				const getSeniorData = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/sy/account/profile`,
				);

				setProfile(
					getSeniorData.data.joiner_syuser[0].syuser.syuser_profile_url,
				);
				setUserData({
					email: getSeniorData.data.email,
					id: getSeniorData.data.joiner_syuser[0].syuser.syuser_id,
				});
				setNickname(getSeniorData.data.joiner_syuser[0].syuser.syuser_nickname);
				setContacts(
					getSeniorData.data.joiner_syuser[0].syuser.sycontact.map((c: any) => {
						return {
							platform: c.sycontact_platform,
							value: c.sycontact_detail,
						};
					}),
				);

				setTriggerAfterFetchUser((prev) => prev++);
			} catch (e) {
				linkAccountOnOpen();
			}
		})();
	}, [reload]);

	// useEffect(() => {
	// 	(async() => {
	// 		try {
	// 			const getJuniorHint = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/sy/profile`);
	// 			const juniors = getJuniorHint.data.joiner_syuser[0].syuser.fyuser;
	// 			setJunior(juniors);
	// 		}
	// 		catch(e){
	// 			console.log("Fetch Profile Fail: ", e);
	// 		}
	// 	})();
	// }, [reload, triggerAfterFetchUser]);

	useEffect(() => {
		(async () => {
			try {
				const getJuniorHint = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/sy/junior-hint`,
				);
				const juniors = getJuniorHint.data.joiner_syuser[0].syuser.fyuser;
				setJunior(juniors);
			} catch (e) {
				console.log("Fetch Junior Fail: ", e);
			}
		})();
	}, [triggerAfterFetchUser]);

	const handleAddContactField = () => {
		setContacts([
			...contacts,
			{ platform: Object.keys(ContactPlatform)[0] || "", value: "" },
		]);
	};

	const handleDeleteContactField = (deleteIndex: number) => {
		setContacts((prev) => {
			if (prev.length <= 1) {
				return [{ platform: Object.keys(ContactPlatform)[0] || "", value: "" }];
			}

			return prev.filter((_, index) => index !== deleteIndex);
		});
	};

	const handleSignOut = async () => {
		await signOut();
		router.push("/login");
	};

	const handleUploadClick = () => {
		inputRef.current?.click();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				const formData = new FormData();
				formData.append("file", file);

				axios.defaults.withCredentials = true;
				await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/sy/update/profile`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					},
				);

				toast({
					status: "success",
					description: "Updated",
					position: "top",
					duration: 2500,
					isClosable: true,
				});
				setReload((prev) => prev + 1);
			} catch (error) {
				toast({
					status: "error",
					description: "Internal Server Error",
					position: "top",
					duration: 2500,
					isClosable: true,
				});
				console.error("Failed to upload profile picture:", error);
			}
		}
	};

	const handleAboutSubmit = async () => {
		try {
			axios.defaults.withCredentials = true;
			const updateAbout = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/sy/update/about`,
				{
					nickname: nickname,
					contact: contacts,
				},
			);
			toast({
				status: "success",
				description: "Updated",
				position: "top",
				duration: 2500,
				isClosable: true,
			});
		} catch (e) {
			toast({
				status: "error",
				description: "Internal server error",
				position: "top",
				duration: 2500,
				isClosable: true,
			});
			console.log("Error to update info: ", e);
		}
	};

	return (
		<>
			<LinkAccountModal
				isOpen={linkAccountIsOpen}
				onOpen={linkAccountOnOpen}
				onClose={linkAccountOnClose}
				reload={() => setReload((prev) => prev + 1)}
			/>
			<HintUpdateModal
				isOpen={hintUpdateModalIsOpen}
				onOpen={hintUpdateModalOnOpen}
				onClose={hintUpdateModalOnClose}
				reload={() => setTriggerAfterFetchUser((prev) => prev + 1)}
				hintIndex={hintSelectIndex}
				juniorId={hintJuniorId}
			/>
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
									className={clsx(
										"w-28 h-28 rounded-full hover:bg-[#bbbbbb] duration-300 flex justify-center items-center cursor-pointer group overflow-hidden relative",
										{
											"bg-[#E6E9EE]": !profile,
										},
									)}
									style={
										profile
											? {
													backgroundImage: `url(${profile})`,
													backgroundSize: "cover",
													backgroundPosition: "center",
													backgroundRepeat: "no-repeat",
												}
											: undefined
									}
									onClick={handleUploadClick}
								>
									<Camera
										className={clsx(
											"text-black z-10 transition-opacity duration-300",
											{
												"opacity-100": !profile,
												"opacity-0 group-hover:opacity-100": profile,
											},
										)}
									/>

									{profile && (
										<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									)}
								</div>
								<button
									type="button"
									className="border px-12 py-1 mt-3 rounded-full hover:bg-[#CAF0F8] hover:shadow-md duration-300 hover:px-6 active:scale-[.97] text-sm font-semibold"
									onClick={() => handleUploadClick()}
								>
									Upload photo
								</button>
								<div className="mt-10 font-bold text-2xl">{userData.email}</div>
								<div className="font-semibold text-lg">{userData.id}</div>
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
								<div className="font-medium text-sm ml-1">Nickname</div>
								<input
									value={nickname}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
										setNickname(e.target.value)
									}
									className="bg-white w-full border-[2px] rounded-xl h-10 px-5 mt-2 shadow-md outline-none border-[#CAF0F8] duration-300"
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
											className="bg-white border-[2px] w-28 rounded-xl h-10 pl-2 pr-5 mt-2 shadow-md outline-none border-[#CAF0F8] duration-300"
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
											className="bg-white w-full ml-2 border-[2px] rounded-xl h-10 px-5 mt-2 shadow-md outline-none border-[#CAF0F8] duration-300"
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
										<button
											type="button"
											className="ml-2 mt-2 h-10 w-10 shrink-0 rounded-xl border-[2px] border-[#ffd2d2] bg-[#fff1f1] text-[#c92a2a] hover:bg-[#ffe4e4] duration-300"
											onClick={() => handleDeleteContactField(index)}
											aria-label={`Delete contact ${index + 1}`}
										>
											<Trash2 size={18} className="mx-auto" />
										</button>
									</div>
								))}
							</div>

							<div className="flex flex-row items-center w-full justify-end mt-5">
								<button
									type="button"
									className="border px-5 py-2 rounded-xl bg-[#CAF0F8] hover:bg-[#b3f2ff] hover:shadow-md duration-300 active:scale-[.97] text-sm font-semibold flex flex-row items-center gap-2"
									onClick={() => handleAboutSubmit()}
								>
									<Save />
									Save
								</button>
							</div>

							<div className="h-[2px] w-auto border shadow-lg my-5 mb-6 rounded-full mx-20"></div>

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

							{junior.map((j: any, i) => (
								<div
									className="border rounded-2xl mt-5 shadow p-5 flex flex-col"
									key={i}
								>
									<div className="flex flex-col justify-between ">
										<div className="text-black font-extrabold text-balance">
											{j.fyuser_id}
										</div>
										<div className="text-black font-medium text-balance">
											{j.fyuser.fyuser_firstname} {j.fyuser.fyuser_lastname}
										</div>
									</div>
									<div className="grid grid-cols-1 sm:grid-cols-3 items-start gap-x-3 mt-3">
										<div className="w-full relative">
											<div
												className={clsx(
													" cursor-pointer w-full border-[2px] rounded-xl h-10 pl-5 pr-5 shadow-md outline-none duration-300 py-[0.40rem] overflow-y-hidden flex flex-row",
													{
														"bg-[#CAF0F8] border-[#8ae4f6] hover:bg-[#b3f2ff]":
															j.fyuser.fyquest[0],
														"bg-[#aaaaaa] border-[#7d7d7d] hover:bg-[#919191]":
															!j.fyuser.fyquest[0],
													},
												)}
												onClick={() => {
													hintUpdateModalOnOpen();
													setHintJuniorId(j.fyuser_id);
													setHintSelectIndex(1);
												}}
											>
												<div className="">1</div>
												<div className="grow text-center font-medium">
													{j.fyuser.fyquest[0] ? "Posted" : "Not Found"}
												</div>
											</div>
										</div>

										<div className="w-full relative mt-2 sm:mt-0">
											<div
												className={clsx(
													" cursor-pointer w-full border-[2px] rounded-xl h-10 pl-5 pr-5 shadow-md outline-none duration-300 py-[0.40rem] overflow-y-hidden flex flex-row",
													{
														"bg-[#CAF0F8] border-[#8ae4f6] hover:bg-[#b3f2ff]":
															j.fyuser.fyquest[1],
														"bg-[#aaaaaa] border-[#7d7d7d] hover:bg-[#919191]":
															!j.fyuser.fyquest[1],
													},
												)}
												onClick={() => {
													hintUpdateModalOnOpen();
													setHintJuniorId(j.fyuser_id);
													setHintSelectIndex(2);
												}}
											>
												<div className="">2</div>
												<div className="grow text-center font-medium">
													{j.fyuser.fyquest[1] ? "Posted" : "Not Found"}
												</div>
											</div>
										</div>

										<div className="w-full relative mt-2 sm:mt-0">
											<div
												className={clsx(
													" cursor-pointer w-full border-[2px] rounded-xl h-10 pl-5 pr-5 shadow-md outline-none duration-300 py-[0.40rem] overflow-y-hidden flex flex-row",
													{
														"bg-[#CAF0F8] border-[#8ae4f6] hover:bg-[#b3f2ff]":
															j.fyuser.fyquest[2],
														"bg-[#aaaaaa] border-[#7d7d7d] hover:bg-[#919191]":
															!j.fyuser.fyquest[2],
													},
												)}
												onClick={() => {
													hintUpdateModalOnOpen();
													setHintJuniorId(j.fyuser_id);
													setHintSelectIndex(3);
												}}
											>
												<div className="">3</div>
												<div className="grow text-center font-medium">
													{j.fyuser.fyquest[2] ? "Posted" : "Not Found"}
												</div>
											</div>
										</div>
									</div>
								</div>
							))}

							<div className="h-[2px] w-auto border shadow-lg my-10 mb-4 rounded-full "></div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
