"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
};

/**
 * Client shell that conditionally shows the shared header/footer.
 * Header and footer are resolved on the server (passed as RSC slots)
 * so no Node-only modules leak into the client bundle.
 */
export default function LayoutShell({ children, header, footer }: Props) {
  const pathname = usePathname();
  // Home (full-screen Signal experience) and landing pages (their own chrome)
  // render without the shared header/footer.
  const isBare = pathname === "/" || pathname.startsWith("/lp");

  if (isBare) {
    return <>{children}</>;
  }

  return (
    <div className="site-shell">
      {header}
      <main className="relative z-10">{children}</main>
      <div className="relative z-10">{footer}</div>
    </div>
  );
}
