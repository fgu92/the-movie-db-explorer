import clsx from "clsx";
import Link from "next/link";

interface PaginationNumberProps {
  page: number | string;
  href: string;
  position?: "first" | "last" | "middle" | "single";
  isActive: boolean;
}

export default function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: PaginationNumberProps) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center text-sm border",
    {
      "rounded-l-md": position === "first" || position === "single",
      "rounded-r-md": position === "last" || position === "single",
      "z-10 bg-blue-600 border-blue-600 text-white": isActive,
      "hover:bg-gray-100": !isActive && position !== "middle",
      "text-gray-300 pointer-events-none": position === "middle",
    },
  );

  if (isActive) {
    return (
      <span className={className} aria-current="page" role="link">
        {page}
      </span>
    );
  }

  if (position === "middle") {
    return <span className={className}>{page}</span>;
  }

  return (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}
