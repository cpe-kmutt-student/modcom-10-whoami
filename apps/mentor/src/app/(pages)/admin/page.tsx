"use client";

import axios from "axios";
import clsx from "clsx";
import { Edit, Filter, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import AdminAboutUpdateModal from "../../../components/AdminAboutUpdateModal";
import AdminHintUpdateModal from "../../../components/AdminHintUpdateModal";
import AdminProfileUpdateModal from "../../../components/AdminProfileUpdateModal";

const getDepartmentColor = (dept: string) => {
	switch (dept?.toUpperCase()) {
		case "REG":
			return "bg-blue-100 text-blue-800 border-blue-200";
		case "INTER":
			return "bg-green-100 text-green-800 border-green-200";
		case "HDS":
			return "bg-yellow-100 text-yellow-800 border-yellow-200";
		default:
			return "bg-gray-100 text-gray-800 border-gray-200";
	}
};

export default function AdminPage() {
	const router = useRouter();
	const [data, setData] = useState<any[]>([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);
	const [authorized, setAuthorized] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedHint, setSelectedHint] = useState<{
		juniorId: string;
		hintIndex: number;
	} | null>(null);

	const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
	const [selectedAbout, setSelectedAbout] = useState<{
		syUserId: string;
		nickname: string;
		contacts: { platform: string; value: string }[];
	} | null>(null);

	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
	const [selectedProfile, setSelectedProfile] = useState<{
		syUserId: string;
		initialProfileUrl: string | null;
	} | null>(null);

	const fetchData = async () => {
		try {
			axios.defaults.withCredentials = true;

			// Check permission first
			await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/admin/get-permission`,
			);
			setAuthorized(true);

			// If permitted, fetch data from API
			const res = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/admin/sy/account/`,
			);
			setData(res.data);
		} catch (e: any) {
			if (e.response?.status === 401 || e.response?.status === 403) {
				router.push("/");
				return;
			}
			console.error("Fetch Admin Data Fail: ", e);
			// Fallback to mock data if API fails
			// try {
			// 	const mockData = await import("./mock.json");
			// 	setData(mockData.default);
			// } catch (mockErr) {
			// 	console.error("Mock data fallback failed", mockErr);
			// }
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleOpenModal = (juniorId: string, hintIndex: number) => {
		setSelectedHint({ juniorId, hintIndex });
		setIsModalOpen(true);
	};

	const handleOpenAboutModal = (syuser: any) => {
		setSelectedAbout({
			syUserId: syuser.syuser_id,
			nickname: syuser.syuser_nickname || "",
			contacts:
				syuser.sycontact?.map((c: any) => ({
					platform: c.sycontact_platform,
					value: c.sycontact_detail,
				})) || [],
		});
		setIsAboutModalOpen(true);
	};

	const handleOpenProfileModal = (syuser: any) => {
		setSelectedProfile({
			syUserId: syuser.syuser_id,
			initialProfileUrl: syuser.syuser_profile_url || null,
		});
		setIsProfileModalOpen(true);
	};

	// Filter data based on search and incomplete status
	const filteredData = data.filter((syuser) => {
		const searchLower = search.toLowerCase();
		const matchesSearch =
			syuser.syuser_id?.toLowerCase().includes(searchLower) ||
			syuser.syuser_firstname?.toLowerCase().includes(searchLower) ||
			syuser.syuser_nickname?.toLowerCase().includes(searchLower);

		if (!matchesSearch) return false;

		if (showIncompleteOnly) {
			let isComplete = true;
			if (!syuser.fyuser || syuser.fyuser.length === 0) {
				// No juniors might mean incomplete or we just skip them, let's treat as incomplete for now
				isComplete = false;
			} else {
				for (const jWrapper of syuser.fyuser) {
					const j = jWrapper.fyuser;
					if (!j) continue;
					const hasHint1 = j.fyquest?.some((q: any) => q.fyquest_index === 1);
					const hasHint2 = j.fyquest?.some((q: any) => q.fyquest_index === 2);
					const hasHint3 = j.fyquest?.some((q: any) => q.fyquest_index === 3);
					if (!hasHint1 || !hasHint2 || !hasHint3) {
						isComplete = false;
						break;
					}
				}
			}
			return !isComplete;
		}

		return true;
	});

	if (!authorized) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
			</div>
		);
	}

	return (
		<div className="container mx-auto w-full text-black min-h-screen pb-20">
			<div className="flex flex-row justify-center max-w-7xl mx-auto">
				<div className="flex flex-col w-full min-w-0 my-14 mx-5">
					<div className="text-3xl font-extrabold text-white">
						Admin Dashboard
					</div>
					{/* <div className="text-base text-white mt-2">
                        Overview of all second-year users and their hint upload status.
                    </div> */}

					<div className="mt-10 rounded-3xl px-4 sm:px-8 shadow-2xl mb-5 py-8 flex flex-col bg-[white] bg-opacity-95 relative">
						<div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
							<div className="relative w-full max-w-md">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Search className="w-5 h-5 text-gray-500" />
								</div>
								<input
									type="text"
									className="bg-white border-[2px] border-[#CAF0F8] text-gray-900 text-sm rounded-xl focus:ring-[#8ae4f6] focus:border-[#8ae4f6] block w-full pl-10 p-2.5 outline-none duration-300 shadow-md"
									placeholder="Search by ID, Name, or Nickname..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
								/>
							</div>

							<label className="flex items-center cursor-pointer bg-white border-[2px] border-[#CAF0F8] px-4 py-2.5 rounded-xl shadow-sm hover:bg-gray-50 duration-300">
								<div className="relative">
									<input
										type="checkbox"
										className="sr-only"
										checked={showIncompleteOnly}
										onChange={(e) => setShowIncompleteOnly(e.target.checked)}
									/>
									<div
										className={clsx(
											"block w-10 h-6 rounded-full duration-300",
											showIncompleteOnly ? "bg-red-400" : "bg-gray-300",
										)}
									></div>
									<div
										className={clsx(
											"absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300",
											showIncompleteOnly ? "transform translate-x-4" : "",
										)}
									></div>
								</div>
								<div className="ml-3 text-sm font-medium text-gray-700 flex items-center gap-2">
									<Filter size={16} /> Show Incomplete Only
								</div>
							</label>
						</div>

						{loading ? (
							<div className="flex justify-center items-center py-20">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8ae4f6]"></div>
							</div>
						) : (
							<div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
								<table className="w-full text-left border-collapse">
									<thead>
										<tr className="bg-[#CAF0F8] text-black">
											<th className="p-4 font-bold border-b whitespace-nowrap">
												Senior ID
											</th>
											<th className="p-4 font-bold border-b whitespace-nowrap">
												Name
											</th>
											<th className="p-4 font-bold border-b min-w-[300px]">
												Juniors & Hints
											</th>
											<th className="p-4 font-bold border-b text-center whitespace-nowrap">
												Status
											</th>
										</tr>
									</thead>
									<tbody>
										{filteredData.map((syuser, index) => {
											let allComplete = true;
											if (!syuser.fyuser || syuser.fyuser.length === 0) {
												allComplete = false;
											}

											return (
												<tr
													key={syuser.syuser_uuid || index}
													className="border-b hover:bg-gray-50 duration-150 transition-colors"
												>
													<td className="p-4 font-medium">
														{syuser.syuser_id}
													</td>
													<td className="p-4">
														<div className="flex items-center gap-4">
															<div
																onClick={() => handleOpenProfileModal(syuser)}
																className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-200 border border-gray-300 shadow-sm cursor-pointer hover:opacity-80 active:scale-95 transition-all group"
															>
																<div className="absolute inset-0 z-10 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-[10px] font-medium">
																	Edit
																</div>
																{syuser.syuser_profile_url ? (
																	<Image
																		src={syuser.syuser_profile_url}
																		alt={`${syuser.syuser_firstname}'s profile`}
																		fill
																		unoptimized
																		sizes="(max-width: 640px) 40px, 48px"
																		className="object-cover"
																	/>
																) : (
																	<div className="w-full h-full flex items-center justify-center text-gray-400">
																		<span className="text-[10px] sm:text-xs">
																			No Img
																		</span>
																	</div>
																)}
															</div>
															<div>
																<div className="font-semibold flex items-center gap-2 flex-wrap">
																	<span className="capitalize">
																		{syuser.syuser_firstname}{" "}
																		{syuser.syuser_lastname}
																	</span>
																	{syuser.syuser_department && (
																		<span
																			className={clsx(
																				"inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium border",
																				getDepartmentColor(
																					syuser.syuser_department,
																				),
																			)}
																		>
																			{syuser.syuser_department}
																		</span>
																	)}
																</div>
																<div
																	className="flex items-center gap-2 mt-1 group cursor-pointer w-fit"
																	onClick={() => handleOpenAboutModal(syuser)}
																>
																	<div className="text-sm text-gray-500 group-hover:text-black transition-colors">
																		{syuser.syuser_nickname || "No Nickname"}
																	</div>
																	<button
																		type="button"
																		className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#18b0f7]"
																	>
																		<Edit size={14} />
																	</button>
																</div>
																<div className="flex flex-col gap-1 mt-2">
																	{syuser.sycontact &&
																	syuser.sycontact.length > 0 ? (
																		syuser.sycontact.map((contact: any) => (
																			<div
																				key={contact.sycontact_id}
																				className="text-xs text-gray-600 flex items-center gap-1.5 group cursor-pointer w-fit"
																				onClick={() =>
																					handleOpenAboutModal(syuser)
																				}
																			>
																				<span className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded leading-none">
																					{contact.sycontact_platform}
																				</span>
																				<span className="font-medium leading-none group-hover:text-black transition-colors">
																					{contact.sycontact_detail}
																				</span>
																				<button
																					type="button"
																					className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#18b0f7] ml-1"
																				>
																					<Edit size={12} />
																				</button>
																			</div>
																		))
																	) : (
																		<div
																			className="flex items-center gap-2 group cursor-pointer w-fit"
																			onClick={() =>
																				handleOpenAboutModal(syuser)
																			}
																		>
																			<span className="text-xs text-gray-400 italic group-hover:text-black transition-colors">
																				No contact info
																			</span>
																			<button
																				type="button"
																				className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-[#18b0f7]"
																			>
																				<Edit size={14} />
																			</button>
																		</div>
																	)}
																</div>
															</div>
														</div>
													</td>
													<td className="p-4">
														{syuser.fyuser && syuser.fyuser.length > 0 ? (
															<div className="flex flex-col gap-3">
																{syuser.fyuser.map(
																	(jWrapper: any, jIndex: number) => {
																		const j = jWrapper.fyuser;
																		if (!j) return null;

																		const hasHint1 = j.fyquest?.some(
																			(q: any) => q.fyquest_index === 1,
																		);
																		const hasHint2 = j.fyquest?.some(
																			(q: any) => q.fyquest_index === 2,
																		);
																		const hasHint3 = j.fyquest?.some(
																			(q: any) => q.fyquest_index === 3,
																		);

																		if (!hasHint1 || !hasHint2 || !hasHint3) {
																			allComplete = false;
																		}

																		return (
																			<div
																				key={j.fyuser_uuid || jIndex}
																				className="flex flex-col text-sm bg-white p-3 rounded-xl border border-gray-100 shadow-sm"
																			>
																				<span className="font-semibold mb-2 text-gray-700 capitalize">
																					{j.fyuser_id} - {j.fyuser_firstname}{" "}
																					{j.fyuser_lastname}
																				</span>
																				<div className="flex flex-wrap gap-2">
																					<div
																						onClick={() =>
																							handleOpenModal(j.fyuser_id, 1)
																						}
																						className={clsx(
																							"px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 cursor-pointer hover:opacity-80 active:scale-95 transition-all",
																							hasHint1
																								? "bg-[#CAF0F8] border-[#8ae4f6] text-slate-800"
																								: "bg-red-50 border-red-200 text-red-600",
																						)}
																					>
																						<span className="opacity-70">
																							1:
																						</span>{" "}
																						{hasHint1 ? "Posted" : "Missing"}
																					</div>
																					<div
																						onClick={() =>
																							handleOpenModal(j.fyuser_id, 2)
																						}
																						className={clsx(
																							"px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 cursor-pointer hover:opacity-80 active:scale-95 transition-all",
																							hasHint2
																								? "bg-[#CAF0F8] border-[#8ae4f6] text-slate-800"
																								: "bg-red-50 border-red-200 text-red-600",
																						)}
																					>
																						<span className="opacity-70">
																							2:
																						</span>{" "}
																						{hasHint2 ? "Posted" : "Missing"}
																					</div>
																					<div
																						onClick={() =>
																							handleOpenModal(j.fyuser_id, 3)
																						}
																						className={clsx(
																							"px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1 cursor-pointer hover:opacity-80 active:scale-95 transition-all",
																							hasHint3
																								? "bg-[#CAF0F8] border-[#8ae4f6] text-slate-800"
																								: "bg-red-50 border-red-200 text-red-600",
																						)}
																					>
																						<span className="opacity-70">
																							3:
																						</span>{" "}
																						{hasHint3 ? "Posted" : "Missing"}
																					</div>
																				</div>
																			</div>
																		);
																	},
																)}
															</div>
														) : (
															<div className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-500 border border-gray-200">
																No Juniors Assigned
															</div>
														)}
													</td>
													<td className="p-4 text-center">
														{syuser.fyuser && syuser.fyuser.length > 0 ? (
															allComplete ? (
																<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
																	Complete
																</span>
															) : (
																<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 border border-red-200 shadow-sm">
																	Incomplete
																</span>
															)
														) : (
															<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
																N/A
															</span>
														)}
													</td>
												</tr>
											);
										})}
										{filteredData.length === 0 && (
											<tr>
												<td
													colSpan={4}
													className="p-12 text-center text-gray-500"
												>
													<div className="flex flex-col items-center justify-center">
														<Search className="w-10 h-10 mb-3 opacity-20" />
														<div className="text-lg font-medium">
															No users found
														</div>
														<div className="text-sm opacity-70">
															Try adjusting your search or filters
														</div>
													</div>
												</td>
											</tr>
										)}
									</tbody>
								</table>
							</div>
						)}
					</div>
				</div>
			</div>

			{selectedHint && (
				<AdminHintUpdateModal
					isOpen={isModalOpen}
					onOpen={() => setIsModalOpen(true)}
					onClose={() => setIsModalOpen(false)}
					reload={fetchData}
					hintIndex={selectedHint.hintIndex}
					juniorId={selectedHint.juniorId}
				/>
			)}

			{selectedAbout && (
				<AdminAboutUpdateModal
					isOpen={isAboutModalOpen}
					onOpen={() => setIsAboutModalOpen(true)}
					onClose={() => setIsAboutModalOpen(false)}
					reload={fetchData}
					syUserId={selectedAbout.syUserId}
					initialNickname={selectedAbout.nickname}
					initialContacts={selectedAbout.contacts}
				/>
			)}

			{selectedProfile && (
				<AdminProfileUpdateModal
					isOpen={isProfileModalOpen}
					onOpen={() => setIsProfileModalOpen(true)}
					onClose={() => setIsProfileModalOpen(false)}
					reload={fetchData}
					syUserId={selectedProfile.syUserId}
					initialProfileUrl={selectedProfile.initialProfileUrl}
				/>
			)}
		</div>
	);
}
