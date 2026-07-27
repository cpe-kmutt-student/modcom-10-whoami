'use client'

import { useEffect } from "react"

// บอก TypeScript ว่า window มี property ชื่อ clarity
declare global {
    interface Window {
        clarity: any;
    }
}

export const initializeClarity = () => {
    if (typeof window !== "undefined" && !window.clarity) {
        // สร้างฟังก์ชันพื้นฐานของ Clarity
        window.clarity = window.clarity || function() {
            (window.clarity.q = window.clarity.q || []).push(arguments);
        };

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.clarity.ms/tag/${process.env.NEXT_PUBLIC_MICROSOFT_CLARITY}`;

        const firstScript = document.getElementsByTagName("script")[0];
        if (firstScript && firstScript.parentNode) {
            firstScript.parentNode.insertBefore(script, firstScript);
        }

    }
}

const MicrosoftClarity = () => {
    useEffect(() => {
        // เช็คตอนโหลดหน้า (สำหรับคนที่เคยยอมรับไปแล้ว)
        const consent = localStorage.getItem("mentormentee2026_cookie_consent");
        if (consent === "all") {
            console.log(process.env.NEXT_PUBLIC_MICROSOFT_CLARITY)
            initializeClarity();
        }
    }, []);

    return null; // ไม่ต้อง render อะไรออกมา
}

export default MicrosoftClarity;