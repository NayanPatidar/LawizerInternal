"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function InternalHeader({
  setMenuOpen,
}: {
  setMenuOpen: (open: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  let title = "Dashboard";
  if (tab === "services") title = "Services";
  else if (tab === "profile") title = "My Profile";

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white border-b border-[#ebebeb] z-30">
      <div className="h-full flex items-center justify-between px-6">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          {/* MOBILE MENU */}
          <button className="lg:hidden" onClick={() => setMenuOpen(true)}>
            <Menu size={22} />
          </button>

          <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <Search size={16} className="text-gray-500" />
            <input
              placeholder="Search services…"
              className="bg-transparent text-sm outline-none w-40"
            />
          </div>

          {/* Notifications */}
          <button className="relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-[#c92c41]" />
          </button>

          {/* Avatar */}
          <div className="h-9 w-9 rounded-full bg-[#c92c41] text-white flex items-center justify-center font-medium text-sm">
            L
          </div>
        </div>
      </div>
    </header>
  );
}
