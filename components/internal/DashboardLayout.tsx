"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/internal/Sidebar";
import Header from "@/components/internal/Header";
import { useAuth } from "@/context/authContext";

export default function InternalDashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isLoggedIn, loading, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace("/login");
    }
  }, [loading, isLoggedIn, router]);

  if (loading || !isLoggedIn) {
    return <div className="p-6">Checking authentication...</div>;
  }

  let activeTab = "dashboard";
  if (searchParams.get("tab")) {
    activeTab = searchParams.get("tab")!;
  }

  const handleLogout = () => {
    logout();
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
