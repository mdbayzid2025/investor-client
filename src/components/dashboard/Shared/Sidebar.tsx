"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  FileText,
  Package,
  CreditCard,
} from "lucide-react";
import Cookies from "js-cookie";
import Image from "next/image";
import { getImageUrl } from "@/utils/baseUrl";
import { useGetProfileQuery } from "@/redux/slice/userApi";



interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { name: "Dashboard", href: "/user-dashboard", icon: LayoutDashboard },
  { name: "My Listing", href: "/user-dashboard/my-listing", icon: FileText },
  { name: "Requests", href: "/user-dashboard/requests", icon: FileText },
  { name: "Stock", href: "/user-dashboard/stock", icon: Package },
  {
    name: "Subscription",
    href: "/user-dashboard/subscription",
    icon: CreditCard,
  },
  { name: "Profile", href: "/user-dashboard/profile", icon: User },
  { name: "Settings", href: "/user-dashboard/settings", icon: Settings },
  // {
  //   name: "Help & Support",
  //   href: "/user-dashboard/help-and-support",
  //   icon: HelpCircle,
  // },
];

export function Sidebar() {

  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { data: profile } = useGetProfileQuery({});
  const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-1 sm:left-4 z-50 p-2 bg-[#111111] border border-primary/20 rounded-lg text-white hover:bg-[#1A1A1A] transition-colors cursor-pointer"
      >
        {isMobileOpen ? (
          <X className="size-5" />
        ) : (
          <Menu className="size-4 sm:size-6" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-[#0A0A0A] border-r border-primary/20 z-40
          transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-72"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-primary/20">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center gap-3">
                  {profile?.image ? <Image height={100} width={100} className="h-12! w-12! rounded-full border-2 border-slate-200/80" src={getImageUrl() + profile?.image} alt="Profile" /> :
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary to-[#E4C77D] flex items-center justify-center">
                      <User className="w-5 h-5 text-black" />
                    </div>}


                  <div>
                    <h3 className="text-white font-semibold">{profile?.name}</h3>
                    <p className="text-gray-400 text-xs">{profile?.email}</p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:block p-1.5 hover:bg-[#1A1A1A] rounded-lg transition-colors text-gray-400 hover:text-primary"
              >
                <ChevronLeft
                  className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? "bg-[#D4AF371A] text-primary font-medium border border-[#D4AF374D]"
                      : "text-[#99A1AF] hover:bg-[#1A1A1A] hover:text-primary/60"
                    }
                    ${isCollapsed ? "justify-center" : ""}
                  `}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-primary/20">
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
                text-gray-300 hover:bg-red-500/10 hover:text-red-500 transition-all
                ${isCollapsed ? "justify-center" : ""}
              `}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
