"use client";

import clsx from "clsx";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("SearchPage");

  const switchToLocale = useCallback(
    (newLocale: string) => {
      const queryString = searchParams.toString();
      const query = queryString ? `?${queryString}` : "";
      const newPathname = `/${newLocale}${pathname.replace(`/${locale}`, "")}`;
      router.push(`${newPathname}${query}`);
    },
    [locale, pathname, router, searchParams],
  );

  return (
    <div className={clsx("flex items-center gap-1", className)}>
      <button
        onClick={locale === "fr" ? undefined : () => switchToLocale("fr")}
        className={clsx(
          "rounded px-1 py-0.5",
          locale === "fr"
            ? "cursor-default text-gray-500"
            : "cursor-pointer underline hover:text-blue-600",
        )}
        aria-label={t("switch-to-french")}
        disabled={locale === "fr"}
      >
        fr
      </button>
      <span className="text-gray-400" aria-hidden="true">
        |
      </span>
      <button
        onClick={locale === "en" ? undefined : () => switchToLocale("en")}
        className={clsx(
          "rounded px-1 py-0.5",
          locale === "en"
            ? "cursor-default text-gray-500"
            : "cursor-pointer underline hover:text-blue-600",
        )}
        aria-label={t("switch-to-english")}
        disabled={locale === "en"}
      >
        en
      </button>
    </div>
  );
}
