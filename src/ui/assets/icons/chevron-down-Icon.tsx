interface ChevronDownIconProps {
  className?: string;
}

export default function ChevronDownIcon({ className }: ChevronDownIconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      data-slot="icon"
      aria-hidden="true"
      className={className}
      data-testid="chevron-down-icon"
    >
      <path
        d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
        fillRule="evenodd"
      />
    </svg>
  );
}
