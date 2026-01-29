"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Sidebar from "@/components/internal/Sidebar";
import Header from "@/components/internal/Header";

export default function InternalDashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [menuOpen, setMenuOpen] = useState(false);

  let activeTab = "dashboard";

  if (searchParams.get("tab")) {
    activeTab = searchParams.get("tab")!;
  }

  const handleLogout = () => {
    localStorage.clear();
    document.cookie = "token=; path=/; max-age=0";
    window.location.href = "/login";
  };

  return (
    <div className="flex bg-[#fafafa] overflow-hidden min-h-screen">
      <Sidebar
        activeTab={activeTab}
        menuOpen={menuOpen}
        handleLogout={handleLogout}
      />

      {/* HEADER */}
      <Header setMenuOpen={setMenuOpen} />

      {/* CONTENT */}
      <main className="flex-1 ml-0 lg:ml-64 pt-20 px-6 lg:px-10">
        {children}
      </main>
    </div>
  );
}
