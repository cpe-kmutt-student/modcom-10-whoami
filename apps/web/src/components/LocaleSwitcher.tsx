"use client";

import { useTransition } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ReactCountryFlag from "react-country-flag";

export default function LocaleSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();

  const toggleLanguage = () => {
    if (isPending) return;

    const nextLocale = locale === "th" ? "en" : "th";
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000`;

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="z-[100] select-none user-d">
      <Button
        variant="glass-clear"
        size="circle"
        onClick={toggleLanguage}
        disabled={isPending}
        className="flex items-center justify-center gap-2"
      >
        <ReactCountryFlag
          countryCode={locale === "th" ? "GB" : "TH"}
          svg
          style={{
            width: "2em",
            height: "2em",
          }}
          className="rounded-full  object-cover"
          title={locale === "th" ? "Thai" : "English"}
        />
      </Button>
    </div>
  );
}
