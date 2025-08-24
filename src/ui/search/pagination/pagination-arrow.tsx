import clsx from "clsx";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

interface PaginationArrowProps {
  href: string;
  direction: "left" | "right";
  isDisabled?: boolean;
}

export default function PaginationArrow({
  href,
  direction,
  isDisabled = false,
}: PaginationArrowProps) {
  const className = clsx(
    "flex h-10 w-10 items-center justify-center rounded-md border",
    {
      "pointer-events-none text-gray-300": isDisabled,
      "hover:bg-gray-100": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    },
  );

  const icon =
    direction === "left" ? (
      <ArrowLeftIcon className="w-4" />
    ) : (
      <ArrowRightIcon className="w-4" />
    );

  const label = direction === "left" ? "Previous page" : "Next page";

  if (isDisabled) {
    return (
      <span
        className={className}
        aria-disabled="true"
        aria-label={label}
        role="link"
      >
        {icon}
      </span>
    );
  }

  return (
    <Link className={className} href={href} aria-label={label}>
      {icon}
    </Link>
  );
}
