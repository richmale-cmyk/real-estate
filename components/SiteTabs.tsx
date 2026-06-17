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
    <nav className="flex flex-wrap items-center gap-2">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={[
              "rounded-full border px-5 py-2 text-sm font-semibold transition-all duration-200",
              active
                ? "border-primary bg-primary text-white shadow-sm"
                : "border-gray-200 bg-white text-text-muted hover:border-primary hover:text-primary",
            ].join(" ")}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
