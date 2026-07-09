"use client";

import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from "react";
import { authClient, Session } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export interface HintItem {
  hint: string;
  isOpen: boolean;
}

export interface StudentData {
  studentID: string;
  name: string;
  program: string;
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
}

const isMockMode = (process.env.NEXT_PUBLIC_USE_MOCK === "true");

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data, isPending, error } = authClient.useSession();
  const router = useRouter();

  const initialMockData = {
    session: {
      id: "mock-session",
      expiresAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "mock",
      token: "ok",
    },
    user: {
      id: "mock",
      name: "Joe Don",
      email: "student@kmutt.ac.th",
      createdAt: new Date(),
      updatedAt: new Date(),
      emailVerified: false,
    },
    studentData: {
      studentID: "69070501000",
      name: "ห่านนอย ลอยคอ",
      program: "reg",
      hints: {
        1: { hint: "/test-hint.png", isOpen: true },
        2: { hint: "/to1045.png", isOpen: true },
        3: { hint: "/IMG_20260702_202700_208.jpg", isOpen: true },
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
  const [isStudentLoading, setIsStudentLoading] = useState<boolean>(false);

  const [mockData, setMockData] = useState<{
    session: Session["session"];
    user: Session["user"];
    studentData: StudentData;
  } | null>({
    ...initialMockData,
  });

  useEffect(() => {
    if (isMockMode) return;

    if (data?.user) {
      const fetchStudentData = async () => {
        setIsStudentLoading(true);
        try {
          const response = await fetch(`/api/students/${data.user.id}`);
          const resData: StudentData = await response.json();
          setStudentData(resData);
        } catch (err) {
          console.error("Failed to fetch student data:", err);
        } finally {
          setIsStudentLoading(false);
        }
      };

      fetchStudentData();
    }
  }, [data?.user, isPending]);

  const handleSignOut = async () => {
    if (isMockMode) {
      setMockData(null);
      setStudentData(null);
      router.refresh();
      return;
    }

    try {
      await authClient.signOut();
      setStudentData(null);
      router.refresh();
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

      await fetch(`/api/students/${data?.user?.id}/hints`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hintId: id, isOpen: true }),
      });
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
