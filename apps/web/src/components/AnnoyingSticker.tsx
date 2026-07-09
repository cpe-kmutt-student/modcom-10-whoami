"use client";

import { useEffect, useState } from "react";

type Sticker = {
  id: number;
  text: string;
  left: number;
  top: number;
  colorClass: string;
};

const COLOR_CLASSES = [
  "bg-[#EF476F] text-white",
  "bg-[#FFD166] text-[#03045E]",
  "bg-[#00B4D8] text-white",
  "bg-[#03045E] text-white",
];

const WORDS = [
  "WRONG_WAY",
  "TRY_HARDER",
  "NOPE",
  "404_LIFE",
  "SYSTEM_TROLL",
  "CPE40",
  "67",
  "24/7",
  "Zzz...",
  "👀",
];

export default function AnnoyingStickers() {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    let stickerId = 0;

    const interval = setInterval(() => {
      const newSticker: Sticker = {
        id: stickerId++,
        text: WORDS[Math.floor(Math.random() * WORDS.length)],
        left: Math.random() * 80 + 5,
        top: Math.random() * 80 + 5,
        colorClass:
          COLOR_CLASSES[Math.floor(Math.random() * COLOR_CLASSES.length)],
      };

      setStickers((prev) => [...prev, newSticker]);

      setTimeout(() => {
        setStickers((prev) => prev.filter((s) => s.id !== newSticker.id));
      }, 3500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {stickers.map((sticker) => (
        <div
          key={sticker.id}
          className={`
            absolute px-3 py-2 border-[3px] border-[#03045E] 
            rounded-lg shadow-[4px_4px_0px_0px_#03045E] 
            font-mali font-bold text-sm pointer-events-none
            animate-sticker-pop
            ${sticker.colorClass}
          `}
          style={{
            left: `${sticker.left}%`,
            top: `${sticker.top}%`,
          }}
        >
          {sticker.text}
        </div>
      ))}
    </div>
  );
}
