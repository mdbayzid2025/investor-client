'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

export function Topbar() {
  const pathname = usePathname();

  // Convert pathname to breadcrumb
  const getBreadcrumb = () => {
    const segments = pathname.split('/').filter(Boolean);
    
    // Format each segment
    const formatted = segments.map((segment) => {
      // Convert kebab-case or snake_case to Title Case
      return segment
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    });

    return formatted;
  };

  const breadcrumbs = getBreadcrumb();

  return (
    <div className="sticky top-0 z-10 bg-[#0A0A0A]/95 backdrop-blur-sm border-b border-[#D4AF37]/20 px-6 lg:px-8 py-4">
      <div className="flex items-center gap-2 text-sm">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
            <span
              className={
                index === breadcrumbs.length - 1
                  ? 'text-[#D4AF37] font-medium'
                  : 'text-gray-400'
              }
            >
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
