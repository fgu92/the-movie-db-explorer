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
        "relative flex flex-col aspect-[2/3] justify-center items-center bg-gray-200 rounded-sm max-w-[300px]",
        className,
      )}
    >
      <PhotoIcon className="w-20 h-20 mb-3 text-gray-400" />
      <div className="text-sm font-medium text-gray-600 px-4 text-center leading-tight">
        {title}
      </div>
    </div>
  );
}
