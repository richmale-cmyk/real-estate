"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Personal OS" },
  { href: "/page-2", label: "Page 2" },
];

export default function SiteTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-3">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200",
              active
                ? "border-accent bg-accent text-white"
                : "border-white/10 bg-white/5 text-white/75 hover:border-white/25 hover:text-white",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
