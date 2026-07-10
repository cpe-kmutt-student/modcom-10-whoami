import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useLoading } from "@/context/ExperienceContext";

// --------------------------------------------------
// /
// --------------------------------------------------
export function useGuestGuard() {
  const router = useRouter();
  const { user, studentData, isLoading, isStudentLoading } = useUser();
  const [isReady, setIsReady] = useState(false);
  const isRedirectingRef = useRef(false);

  const isPending = isLoading || isStudentLoading;

  useEffect(() => {
    if (isPending || isRedirectingRef.current) return;

    if (user) {
      isRedirectingRef.current = true;
      if (studentData) router.replace("/hint");
      else router.replace("/genetic-testing");
      return;
    }

    setIsReady(true);
  }, [isPending, user, studentData, router]);

  return {
    isChecking: isPending || isRedirectingRef.current || !isReady,
  };
}

// --------------------------------------------------
// /genetic-testing
// --------------------------------------------------
export function useVerifyGuard() {
  const router = useRouter();
  const { user, studentData, isLoading, isStudentLoading } = useUser();
  const { showLoading, hideLoading } = useLoading();

  const [isReady, setIsReady] = useState(false);
  const isShowingLoadingRef = useRef(false);
  const isRedirectingRef = useRef(false);

  const isPending = isLoading || isStudentLoading;

  useEffect(() => {
    if (isPending || isRedirectingRef.current) {
      if (!isShowingLoadingRef.current) {
        showLoading();
        isShowingLoadingRef.current = true;
      }
      return;
    }

    if (!user) {
      isRedirectingRef.current = true;
      router.replace("/");
      return;
    }

    if (studentData) {
      isRedirectingRef.current = true;
      router.replace("/hint");
      return;
    }

    if (isShowingLoadingRef.current) {
      hideLoading();
      isShowingLoadingRef.current = false;
    }
    setIsReady(true);
  }, [isPending, user, studentData, router, showLoading, hideLoading]);

  useEffect(() => {
    return () => {
      if (isShowingLoadingRef.current) hideLoading();
    };
  }, [hideLoading]);

  return { isChecking: isPending || isRedirectingRef.current || !isReady };
}

// --------------------------------------------------
// /hint, /list
// --------------------------------------------------
export function useStudentGuard() {
  const router = useRouter();
  const { user, studentData, isLoading, isStudentLoading } = useUser();
  const { showLoading, hideLoading } = useLoading();

  const [isReady, setIsReady] = useState(false);
  const isShowingLoadingRef = useRef(false);
  const isRedirectingRef = useRef(false);

  const isPending = isLoading || isStudentLoading;

  useEffect(() => {

    if (isPending || isRedirectingRef.current) {
      if (!isShowingLoadingRef.current) {
        showLoading();
        isShowingLoadingRef.current = true;
      }
      return;
    }


    if (!user) {
      isRedirectingRef.current = true;
      router.replace("/");
      return;
    }

    if (!studentData) {
      isRedirectingRef.current = true;
      router.replace("/genetic-testing");
      return;
    }


    if (isShowingLoadingRef.current) {
      hideLoading();
      isShowingLoadingRef.current = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsReady(true);
  }, [isPending, user, studentData, router, showLoading, hideLoading]);

  useEffect(() => {
    return () => {
      if (isShowingLoadingRef.current) hideLoading();
    };
  }, [hideLoading]);

  return { isChecking: isPending || isRedirectingRef.current || !isReady };
}
