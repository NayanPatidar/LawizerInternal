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

  if (loading || !isLoggedIn) return null;

  const activeTab = searchParams.get("tab") ?? "dashboard";

  return (
    <div className="flex bg-[#fafafa] min-h-screen">
      <Sidebar
        activeTab={activeTab}
        menuOpen={menuOpen}
        handleLogout={logout}
      />
      <Header setMenuOpen={setMenuOpen} />
      <main className="flex-1 ml-0 lg:ml-64 pt-20 px-6 lg:px-10">
        {children}
      </main>
    </div>
  );
}
