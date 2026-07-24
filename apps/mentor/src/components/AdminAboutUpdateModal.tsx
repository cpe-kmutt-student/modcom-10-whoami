import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	useToast,
} from "@chakra-ui/react";
import { ContactPlatform } from "@repo/database/prisma";
import axios from "axios";
import { CirclePlus, Trash2, User } from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";

export default function AdminAboutUpdateModal({
	isOpen,
	onOpen,
	onClose,
	reload,
	syUserId,
	initialNickname,
	initialContacts,
}: {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	reload: () => void;
	syUserId: string;
	initialNickname: string;
	initialContacts: { platform: string; value: string }[];
}): React.JSX.Element {
	const [nickname, setNickname] = useState(initialNickname);
	const [contacts, setContacts] = useState(initialContacts);
	const [isSaving, setIsSaving] = useState(false);
	const toast = useToast();

	// Sync state when modal opens or props change
	useEffect(() => {
		setNickname(initialNickname);
		setContacts(
			initialContacts.length > 0
				? initialContacts
				: [{ platform: Object.keys(ContactPlatform)[0] || "", value: "" }],
		);
	}, [initialNickname, initialContacts, isOpen]);

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

	const handleSave = async () => {
		try {
			setIsSaving(true);
			axios.defaults.withCredentials = true;
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/admin/sy/update/about`,
				{
					syUserId: syUserId,
					nickname: nickname,
					contact: contacts,
				},
			);

			toast({
				status: "success",
				description: "About updated successfully",
				position: "top",
				duration: 2500,
				isClosable: true,
			});
			onClose();
			reload();
		} catch (error) {
			toast({
				status: "error",
				description: "Internal Server Error",
				position: "top",
				duration: 2500,
				isClosable: true,
			});
			console.error("Failed to update about:", error);
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered={true}
				size={"md"}
				motionPreset={"slideInBottom"}
				closeOnOverlayClick={false}
			>
				<ModalOverlay />
				<ModalContent bgColor={"white"} borderRadius={"8px"}>
					<ModalCloseButton
						className="outline-none outline-0"
						color={"rgb(199, 204, 216)"}
						_hover={{
							color: "#f76418",
						}}
					/>
					<ModalBody paddingY={"1.5rem"} paddingX={"1.5rem"}>
						<div className="flex flex-col w-full text-black gap-5">
							<div className="text-black text-center font-bold text-md">
								<div>Edit About ({syUserId})</div>
							</div>

							<div className="flex flex-col gap-4 mt-2">
								{/* Nickname */}
								<div className="flex flex-col w-full">
									<div className="text-sm font-semibold mb-2 flex items-center gap-2">
										<User size={16} /> Nickname
									</div>
									<input
										className="bg-white border-[2px] rounded-xl h-10 px-5 shadow-sm outline-none border-[#CAF0F8] duration-300"
										type="text"
										placeholder="Nickname"
										value={nickname}
										onChange={(e) => setNickname(e.target.value)}
									/>
								</div>

								{/* Contacts */}
								<div className="flex flex-col w-full mt-2">
									<div className="flex flex-row items-center justify-between mb-2">
										<div className="text-sm font-semibold flex items-center gap-2">
											<CirclePlus size={16} /> Social Media
										</div>
										<button
											type="button"
											className="border-2 rounded-xl text-xs font-semibold px-2 py-1 shadow-sm border-[#CAF0F8] hover:bg-[#CAF0F8] duration-300"
											onClick={handleAddContactField}
										>
											+ Add Field
										</button>
									</div>

									<div className="flex flex-col gap-2 max-h-[250px] overflow-y-auto p-1">
										{contacts.map((contact, index) => (
											<div
												className="flex flex-row items-start w-full"
												key={index}
											>
												<select
													className="bg-white text-sm shrink-0 font-semibold border-[2px] rounded-xl h-10 px-2 shadow-sm outline-none border-[#CAF0F8] duration-300"
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
													className="bg-white w-full text-sm ml-2 border-[2px] rounded-xl h-10 px-3 shadow-sm outline-none border-[#CAF0F8] duration-300"
													type="text"
													placeholder="Link or handle"
													value={contact.value}
													onChange={(e) => {
														setContacts(
															contacts.map((c, i) =>
																i === index
																	? { ...c, value: e.target.value }
																	: c,
															),
														);
													}}
												/>
												<button
													type="button"
													className="ml-2 h-10 w-10 shrink-0 rounded-xl border-[2px] border-[#ffd2d2] bg-[#fff1f1] text-[#c92a2a] hover:bg-[#ffe4e4] duration-300"
													onClick={() => handleDeleteContactField(index)}
												>
													<Trash2 size={16} className="mx-auto" />
												</button>
											</div>
										))}
									</div>
								</div>

								{/* Save Button */}
								<div className="flex flex-row justify-center mt-4">
									<button
										type="button"
										disabled={isSaving}
										className="flex flex-row items-center justify-center gap-2 text-center font-bold text-slate-800 bg-[#CAF0F8] hover:bg-[#8ae4f6] active:scale-[.97] disabled:opacity-60 duration-300 cursor-pointer w-full py-2.5 rounded-xl border border-[#8ae4f6]"
										onClick={handleSave}
									>
										{isSaving ? (
											<>
												<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
												Saving...
											</>
										) : (
											"Save Changes"
										)}
									</button>
								</div>
							</div>
						</div>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
}
