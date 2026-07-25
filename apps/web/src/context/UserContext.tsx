"use client";

import { useRouter } from "next/navigation";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { authClient, type Session } from "@/lib/auth-client";

export interface HintItem {
	hint: string;
	isOpen: boolean;
}

export interface StudentData {
	studentID: string;
	name: string;
	program: string;
	annotation: string | null;
	hints: {
		1: HintItem | null;
		2: HintItem | null;
		3: HintItem | null;
	};
}

interface UserContextType {
	session: Session["session"] | null;
	user: Session["user"] | null;
	isLoading: boolean;
	isStudentLoading: boolean;
	error: Error | null;
	signOut: () => Promise<void>;
	studentData: StudentData | null;
	markHintAsOpened: (hintId: string) => Promise<void>;
	refreshStudentData: () => void;
}

const isMockMode = process.env.NEXT_PUBLIC_USE_MOCK === "true";

const UserContext = createContext<UserContextType | undefined>(undefined);

type FyAccountProfileResponse = {
	joiner_fyuser?: Array<{
		fyuser?: {
			fyuser_id?: string;
			fyuser_firstname?: string;
			fyuser_lastname?: string;
			fyuser_annotation?: string | null;
		};
	}>;
};

type FyQuestResponse = Array<{
	fyquest_index: number;
	fyquest_status_boxopen: boolean;
	fyquest_url: string | null;
}>;

const emptyHints = (): StudentData["hints"] => ({
	1: null,
	2: null,
	3: null,
});

const mapProfileAndQuestsToStudentData = (
	profile: FyAccountProfileResponse,
	quests: FyQuestResponse,
): StudentData | null => {
	const fyuser = profile.joiner_fyuser?.[0]?.fyuser;

	if (!fyuser?.fyuser_id) {
		return null;
	}

	const hints = emptyHints();

	quests.forEach((quest) => {
		if (
			quest.fyquest_index === 1 ||
			quest.fyquest_index === 2 ||
			quest.fyquest_index === 3
		) {
			hints[quest.fyquest_index] = {
				hint: quest.fyquest_url ?? "",
				isOpen: quest.fyquest_status_boxopen,
			};
		}
	});

	const fullName = [fyuser.fyuser_firstname, fyuser.fyuser_lastname]
		.filter(Boolean)
		.join(" ")
		.trim();

	return {
		studentID: fyuser.fyuser_id,
		name: fullName || fyuser.fyuser_id,
		program:
			fyuser.fyuser_id.slice(7, 9) === "10"
				? "reg"
				: fyuser.fyuser_id.slice(7, 9) === "34"
					? "inter"
					: fyuser.fyuser_id.slice(7, 9) === "52"
						? "hds"
						: "",
		annotation: fyuser.fyuser_annotation ?? null,
		hints,
	};
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { data, isPending, error } = authClient.useSession();
	const router = useRouter();
	const [studentDataRefreshKey, setStudentDataRefreshKey] = useState(0);

	const initialMockData = {
		session: {
			id: "mock-session",
			createdAt: new Date(),
			updatedAt: new Date(),
			userId: "mock",
			expiresAt: new Date(),
			token: "mock-token",
		},
		user: {
			id: "mock",
			createdAt: new Date(),
			updatedAt: new Date(),
			name: "Joe Don",
			email: "student@kmutt.ac.th",
			emailVerified: false,
			image: null,
		},
		studentData: {
			studentID: "69070501000",
			name: "นายห่านนอย ลอยคอ",
			program: "Reg",
			annotation: "I love cats",
			hints: {
				1: { hint: "/test-hint.png", isOpen: true },
				2: { hint: "/to1045.png", isOpen: true },
				3: { hint: "/IMG_20260702_202700_208.jpg", isOpen: false },
			},
		},
	} satisfies {
		session: Session["session"];
		user: Session["user"];
		studentData: StudentData;
	};

	const [studentData, setStudentData] = useState<StudentData | null>(() =>
		isMockMode ? initialMockData.studentData : null,
	);
	const [isStudentLoading, setIsStudentLoading] = useState<boolean>(
		!isMockMode,
	);

	const [mockData, setMockData] = useState<{
		session: Session["session"];
		user: Session["user"];
		studentData: StudentData;
	} | null>({
		...initialMockData,
	});

	useEffect(() => {
		if (isMockMode) return;

		if (isPending) {
			setIsStudentLoading(true);
			return;
		}

		if (data?.user?.id) {
			const fetchStudentData = async () => {
				setIsStudentLoading(true);

				try {
					const [profileResponse, questResponse] = await Promise.all([
						fetch(
							`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/fy/account/profile`,
							{ credentials: "include" },
						),
						fetch(
							`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/fy/quest/`,
							{ credentials: "include" },
						),
					]);

					if (!profileResponse.ok || !questResponse.ok) {
						router.push("/genetic-testing");
						throw new Error("Failed to fetch student data from backend");
					}

					const [profileData, questData] = await Promise.all([
						profileResponse.json() as Promise<FyAccountProfileResponse>,
						questResponse.json() as Promise<FyQuestResponse>,
					]);

					const mappedStudentData = mapProfileAndQuestsToStudentData(
						profileData,
						questData,
					);
					setStudentData(mappedStudentData);
				} catch (err) {
					console.error("Failed to fetch student data:", err);
				} finally {
					setIsStudentLoading(false);
				}
			};

			fetchStudentData();
		} else {
			setStudentData(null);

			setIsStudentLoading(false);
		}
	}, [data?.user?.id, isPending, studentDataRefreshKey]);

	const refreshStudentData = () => {
		if (isMockMode) {
			setStudentData(initialMockData.studentData);
			return;
		}

		setStudentDataRefreshKey((currentKey) => currentKey + 1);
	};

	const handleSignOut = async () => {
		if (isMockMode) {
			setMockData(null);
			setStudentData(null);
			router.push("/");
			return;
		}

		try {
			await authClient.signOut();
			setStudentData(null);
			router.push("/");
		} catch (err) {
			console.error("Sign out failed", err);
		}
	};

	const markHintAsOpened = async (hintId: string) => {
		const validIds = ["1", "2", "3"];
		if (!validIds.includes(hintId) || !studentData) return;

		const id = parseInt(hintId, 10) as 1 | 2 | 3;
		const currentHint = studentData.hints[id];

		if (!currentHint || currentHint.isOpen) return;

		const updatedStudentData = {
			...studentData,
			hints: {
				...studentData.hints,
				[id]: { ...currentHint, isOpen: true },
			},
		};

		setStudentData(updatedStudentData);

		if (isMockMode) {
			if (mockData) {
				setMockData({ ...mockData, studentData: updatedStudentData });
			}
			return;
		}

		try {
			await fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/_/fy/quest/opened/${id}`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					credentials: "include",
				},
			);
		} catch (err) {
			console.error("Failed to update hint status:", err);
		}
	};

	const value = isMockMode
		? {
				session: mockData?.session || null,
				user: mockData?.user || null,
				isLoading: false,
				isStudentLoading: false,
				error: null,
				signOut: handleSignOut,
				studentData: studentData,
				markHintAsOpened,
				refreshStudentData,
			}
		: {
				session: data?.session || null,
				user: data?.user || null,
				isLoading: isPending,
				isStudentLoading: isStudentLoading,
				error: error || null,
				signOut: handleSignOut,
				studentData: studentData,
				markHintAsOpened,
				refreshStudentData,
			};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
