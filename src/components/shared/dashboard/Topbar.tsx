"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Bell, ChevronRight, Dot } from "lucide-react";
import Link from "next/link";

export function Topbar() {
  const pathname = usePathname();

  // Convert pathname to breadcrumb
  const getBreadcrumb = () => {
    const segments = pathname.split("/").filter(Boolean);

    // Format each segment
    const formatted = segments.map((segment) => {
      // Convert kebab-case or snake_case to Title Case
      return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    });

    return formatted;
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <div className="sticky top-0 z-10 flex flex-col gap-2 sm:flex-row items-center justify-between bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-primary/20 px-6 sm:px-20 lg:px-8 py-4">
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center text-xs sm:text-base">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-500 mx-1" />
            )}
            <span
              className={
                index === breadcrumbs.length - 1
                  ? "text-primary font-medium"
                  : "text-gray-400"
              }
            >
              {crumb}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/"
          className="text-sm text-gray-400 hover:text-primary transition-colors border border-primary/20 hover:border-primary/50 px-4 py-2 rounded-lg"
        >
          Go to website
        </Link>

        <Link
          href="/user-dashboard/notifications"
          className="text-white relative hover:text-primary transition-colors"
        >
          <Dot className="text-primary absolute -top-3 -right-3.5 size-8" />
          <Bell className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
