"use client";

import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type Props = {
  lang: Locale;
  labels: { ko: string; en: string };
};

export default function LanguageSwitcher({ lang, labels }: Props) {
  const pathname = usePathname() || `/${lang}`;
  const rest = pathname.replace(/^\/(ko|en)(?=\/|$)/, "") || "";

  return (
    <div className="lang-switcher" aria-label="Language">
      <a
        href={`/ko${rest}`}
        className={`lang-btn${lang === "ko" ? " active" : ""}`}
        hrefLang="ko"
      >
        {labels.ko}
      </a>
      <span className="lang-sep">/</span>
      <a
        href={`/en${rest}`}
        className={`lang-btn${lang === "en" ? " active" : ""}`}
        hrefLang="en"
      >
        {labels.en}
      </a>
    </div>
  );
}
