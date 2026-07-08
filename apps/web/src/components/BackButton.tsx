"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  path?: string;
  onClick?: () => void;
  className?: string;
}

export default function BackButton({ path, onClick, className }: BackButtonProps) {
  const router = useRouter();

  const handleBackBTN = () => {
    if (onClick) {
      onClick();
    } else if (path) {
      router.push(path);
    } else {
      router.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotate: -90 }}
      animate={{ opacity: 1, x: 0, rotate: 0 }}
      transition={{ type: "spring", bounce: 0.6, duration: 0.8 }}
      className={`fixed top-4 left-4 z-[100] ${className || ""}`}
    >
      <Button size="circle" variant="default-tiny" onClick={handleBackBTN}>
        <FontAwesomeIcon icon={faArrowLeft} className="text-lg md:text-2xl" />
      </Button>
    </motion.div>
  );
}
