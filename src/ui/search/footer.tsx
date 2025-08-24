import TMDBLogo from "@/ui/assets/icons/tmdb-logo";
import clsx from "clsx";
import { useTranslations } from "next-intl";

interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  const t = useTranslations("SearchPage");

  return (
    <footer
      className={clsx(
        "flex flex-col gap-2 items-center justify-center",
        className,
      )}
    >
      <TMDBLogo width="150" />
      <div className="text-center text-sm text-gray-500">{t("disclaimer")}</div>
    </footer>
  );
}
