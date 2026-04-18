type ArrowIconProps = {
  size?: number;
};

/** Small right-arrow used inside primary/ghost buttons across the site. */
export function ArrowIcon({ size = 14 }: ArrowIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
