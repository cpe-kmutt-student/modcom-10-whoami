"use client";

import MusicPlayer from "@/components/MusicPlayer";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function UtilityCluster() {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex items-end flex-col gap-3">

      <div className="order-2">
        <MusicPlayer />
      </div>

      <div className="order-1">
        <LocaleSwitcher />
      </div>
    </div>
  );
}
