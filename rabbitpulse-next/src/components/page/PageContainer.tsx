import type { ReactNode } from "react";

/**
 * Shared wrapper that gives every chapter page the right top padding
 * (so it clears the fixed header) and a sensible reading width.
 */
export function PageContainer({ children }: { children: ReactNode }) {
  return <div className="rp-page-container">{children}</div>;
}
