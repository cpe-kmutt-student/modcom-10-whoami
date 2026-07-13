"use client";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Variants } from "motion";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import BackButton from "@/components/BackButton";
import ParcelScene from "@/components/ParcelScene";
import ParticlesBackground from "@/components/ParticlesBackground";
import UserProfile from "@/components/UserProfile";
import { Button } from "@/components/ui/button";
import { useLoading } from "@/context/ExperienceContext";
import { useUser } from "@/context/UserContext";

import { useStudentGuard } from "@/hooks/useRouteGuard";

const VALID_HINTS = ["1", "2", "3"];

const backgroundVarient: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			delay: 0.5,
			duration: 1.5,
		},
	},
	exit: {
		opacity: 0,
		transition: {
			delay: 0,
			duration: 0.5,
		},
	},
};

function HintFlipCard({
	hintImage,
	isFlipped,
}: {
	hintImage: string;
	isFlipped: boolean;
}) {
	const pathname = usePathname();
	const imgRef = useRef<HTMLImageElement>(null);
	useEffect(() => {
		if (imgRef.current)
			imgRef.current.src = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/gb/meme/random/${Math.random()}`;
	}, [pathname]);
	const { studentData } = useUser();
	return (
		<div
			className="select-none relative w-full h-full transition-transform duration-700 ease-in-out"
			style={{
				transformStyle: "preserve-3d",
				transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
			}}
		>
			<div
				className={`absolute inset-0 w-full h-full ${isFlipped ? "pointer-events-none" : ""}`}
				style={{
					backfaceVisibility: "hidden",
					WebkitBackfaceVisibility: "hidden",
					transformStyle: "preserve-3d",
				}}
			>
				<div className={`w-full h-full ${isFlipped ? "" : "hover-3d"}`}>
					<div
						className="w-full h-full bg-white p-4 md:p-6 border-2 border-blue-900 flex flex-col items-center justify-center relative rounded-md shadow-lg"
						style={{
							backgroundImage: `url("${hintImage}")`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
						}}
					>
						<div className="text-center font-mali pointer-events-none select-none"></div>
					</div>
					<div className="w-full h-full"></div>
					<div className="w-full h-full"></div>
					<div className="w-full h-full"></div>
					<div className="w-full h-full"></div>
					<div className="w-full h-full"></div>
					<div className="w-full h-full"></div>
					<div className="w-full h-full"></div>
					<div className="w-full h-full"></div>
				</div>
			</div>
			<div
				className="relative inset-0 w-full h-full bg-blue-900 border-[2px] border-blue-900 flex flex-col items-center justify-center rounded-md shadow-lg"
				style={{
					backfaceVisibility: "hidden",
					WebkitBackfaceVisibility: "hidden",
					transform: "rotateY(180deg)",
				}}
			>
				<img
					ref={imgRef}
					className="w-full h-full object-contain"
					alt={`hint_image_${studentData?.studentID.slice(-4)}`}
				/>
			</div>
		</div>
	);
}

export default function Hint() {
	const t = useTranslations();
	const { isChecking } = useStudentGuard();

	const params = useParams();
	const rawId = params?.id?.[0] || null;
	const isValid = rawId ? VALID_HINTS.includes(rawId) : false;

	const [activeHintId, setActiveHintId] = useState<string | null>(
		isValid ? rawId : null,
	);
	const [isFlipped, setIsFlipped] = useState(false);

	const router = useRouter();
	const { studentData, markHintAsOpened } = useUser();

	const hints = studentData?.hints;

	useEffect(() => {
		if (rawId && hints) {
			const hintObj = hints[rawId as unknown as 1 | 2 | 3];
			const isValidAndOpened = VALID_HINTS.includes(rawId) && hintObj?.isOpen;

			if (!isValidAndOpened) {
				window.history.replaceState(null, "", "/hint");
				// eslint-disable-next-line react-hooks/set-state-in-effect
				setActiveHintId(null);
			}
		}
	}, [rawId, hints]);

	useEffect(() => {
		const handlePopState = () => {
			const currentPath = window.location.pathname;
			const match = currentPath.match(/\/hint\/([^/]+)/);
			const extractedId = match ? match[1] : null;

			if (extractedId && VALID_HINTS.includes(extractedId)) {
				setActiveHintId(extractedId);
				setIsFlipped(false);
			} else {
				setActiveHintId(null);
				setIsFlipped(false);
				if (extractedId) {
					window.history.replaceState(null, "", "/hint");
				}
			}
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []);

	if (isChecking) return null;

	const unopenedHintEntry = Object.entries(hints || {}).find(
		([id, hint]) => hint !== null && hint.isOpen === false,
	);
	const unopenedHintId = unopenedHintEntry ? unopenedHintEntry[0] : null;
	const unopenedHint = unopenedHintEntry ? unopenedHintEntry[1] : null;

	const availableHints = Object.entries(hints || {})
		.filter(([id, hint]) => hint !== null)
		.map(([id, hint]) => ({ id, hint: hint! }));

	const activeHintObj = availableHints.find((h) => h.id === activeHintId);

	const openHint = (id: string) => {
		const hintObj = hints?.[id as unknown as 1 | 2 | 3];
		if (!VALID_HINTS.includes(id) || !hintObj?.isOpen) return;

		setActiveHintId(id);
		setIsFlipped(false);
		window.history.pushState(null, "", `/hint/${id}`);
	};

	const closeHint = () => {
		setActiveHintId(null);
		setIsFlipped(false);
		window.history.pushState(null, "", `/hint`);
	};

	const showBox = !activeHintId && unopenedHintId && unopenedHint;
	const showGrid = !activeHintId && !unopenedHintId;

	return (
		<LayoutGroup>
			<div
				className={`w-full bg-blue-50 relative selection:bg-quirky selection:text-blue-900 ${!showGrid ? "h-[100dvh] overflow-hidden" : "min-h-[100dvh]"}`}
			>
				<code className="hidden">hint: แน่จริงก็หาให้เจอสิ จาก dev ท่านหนึ่ง</code>

				{showBox && (
					<div className="fixed inset-0 z-40">
						<ParcelScene
							key={unopenedHintId}
							hintId={unopenedHintId}
							hintImage={unopenedHint.hint}
							onAnimationComplete={() => {
								markHintAsOpened(unopenedHintId);
								setActiveHintId(unopenedHintId);
								window.history.replaceState(
									null,
									"",
									`/hint/${unopenedHintId}`,
								);
							}}
						/>
					</div>
				)}

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: showGrid ? 1 : 0 }}
					transition={{ duration: 0.5 }}
					className={`relative z-10 flex flex-col min-h-[100dvh] w-full ${showGrid ? "" : "pointer-events-none"}`}
				>
					<UserProfile />

					<div className="flex-1 flex flex-col items-center justify-center pointer-events-none z-10 py-24 pb-32">
						<div className="w-full max-w-6xl px-10 mx-auto flex flex-wrap justify-center gap-10 md:gap-20">
							{!availableHints || availableHints.length === 0 ? (
								<div className="w-full text-center py-10 pointer-events-auto">
									<p className="text-xl text-gray-500 font-medium">
										{t("hint.no_hint")}
									</p>
								</div>
							) : (
								availableHints.map(({ id, hint }) => (
									<div
										key={id}
										className="relative flex flex-col justify-center items-center pointer-events-auto flex-none w-full md:w-[calc(33.333%-53.33px)] max-w-[360px]"
									>
										<div className="absolute bg-blue-950 w-[80%] aspect-square rounded-full -z-10"></div>

										{activeHintId !== id && !showBox && (
											<motion.div
												layoutId={`hint-card-${id}`}
												onClick={() => openHint(id)}
												className="w-full cursor-pointer"
												whileHover={{ scale: 1.05 }}
												style={{
													aspectRatio: "683 / 412",
													transformStyle: "preserve-3d",
												}}
											>
												<div
													className="w-full h-full bg-white p-2 border-[2px] border-blue-900 flex flex-col items-center justify-center rounded-md shadow-lg"
													style={{
														backgroundImage: `url("${hint.hint}")`,
														backgroundSize: "cover",
														backgroundPosition: "center",
														backgroundRepeat: "no-repeat",
													}}
												/>
											</motion.div>
										)}
									</div>
								))
							)}
						</div>
					</div>

					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{
							type: "spring",
							bounce: 0.6,
							duration: 0.8,
							delay: 0.2,
						}}
						className="fixed bottom-4 left-4 z-20"
					>
						<Button
							variant="quirky-tiny"
							size="circle-auto"
							onClick={() => {
								router.push("/list");
							}}
						>
							<FontAwesomeIcon icon={faPeopleGroup} className="md:mr-2" />
							<span className="hidden md:flex">
								{t("hint.mentor_name_list")}
							</span>
						</Button>
					</motion.div>

					<footer className="absolute w-full text-center bottom-3 text-xs text-blue-900/40 z-20 font-mali">
						©2026 CPE39. All rights reserved.
					</footer>
				</motion.div>

				<AnimatePresence>
					{activeHintId && activeHintObj?.hint.isOpen && (
						<motion.div
							key="full-screen-wrapper"
							className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none"
						>
							<motion.div
								variants={backgroundVarient}
								initial="hidden"
								animate="visible"
								exit="exit"
								className="absolute inset-0 bg-blue-50 pointer-events-auto"
								onClick={closeHint}
							>
								<div className="absolute inset-0 z-0 pointer-events-none">
									<ParticlesBackground />
								</div>
							</motion.div>

							<div
								className="absolute inset-2 flex items-center justify-center pointer-events-none z-30"
								style={{ perspective: "1000px" }}
							>
								<motion.div
									layoutId={`hint-card-${activeHintId}`}
									exit={{ opacity: 0, scale: 0.9 }}
									className="relative z-50 w-full max-w-[800px] pointer-events-auto cursor-pointer"
									style={{
										width: "100vmin",
										aspectRatio: "683 / 412",
										transformStyle: "preserve-3d",
									}}
									onClick={(e) => {
										e.stopPropagation();
										setIsFlipped(!isFlipped);
									}}
									transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
								>
									<HintFlipCard
										isFlipped={isFlipped}
										hintImage={activeHintObj?.hint.hint || ""}
									/>
								</motion.div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{activeHintId && <BackButton onClick={closeHint} />}
			</div>
		</LayoutGroup>
	);
}
