import LanguageSwitcher from "@/ui/language-switcher";
import clsx from "clsx";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={clsx("justify-self-end p-4 text-xl", className)}>
      <LanguageSwitcher />
    </header>
  );
}
