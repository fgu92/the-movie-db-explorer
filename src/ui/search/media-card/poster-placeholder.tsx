import { PhotoIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

interface PosterPlaceholderProps {
  title: string;
  className?: string;
}

export function PosterPlaceholder({
  title,
  className,
}: PosterPlaceholderProps) {
  return (
    <div
      className={clsx(
        "relative flex aspect-[2/3] max-w-[300px] flex-col items-center justify-center rounded-sm bg-gray-200",
        className,
      )}
    >
      <PhotoIcon className="mb-3 h-20 w-20 text-gray-400" />
      <div className="px-4 text-center text-sm leading-tight font-medium text-gray-600">
        {title}
      </div>
    </div>
  );
}
