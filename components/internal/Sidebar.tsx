"use client";

import { LayoutDashboard, ClipboardList, User, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

interface SidebarProps {
  activeTab: string;
  handleLogout: () => void;
  menuOpen: boolean;
}

export default function Sidebar({
  activeTab,
  handleLogout,
  menuOpen,
}: SidebarProps) {
  const router = useRouter();

  return (
    <aside
      className={`bg-white border-r border-[#ebebeb] w-64 p-5 fixed top-0 left-0 h-full
        transition-transform duration-300 z-40
        ${menuOpen ? "translate-x-0" : "-translate-x-64"} lg:translate-x-0`}
    >
      {/* LOGO */}
      <div
        className="flex items-center gap-2 cursor-pointer pb-5"
        onClick={() => router.push("/dashboard")}
      >
        <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-sm">
          <img src="/logoLawizer.jpg" alt="Lawizer Logo" className="w-7 h-7" />
        </div>
        <span className="text-2xl font-bold text-[#c92c41]">
          Lawizer Internal
        </span>
      </div>

      {/* NAV */}
      <nav className="space-y-2 pt-4">
        <SidebarItem
          label="Dashboard"
          icon={LayoutDashboard}
          active={activeTab === "dashboard"}
          onClick={() => router.push("/dashboard")}
        />

        <SidebarItem
          label="Services"
          icon={ClipboardList}
          active={activeTab === "services"}
          onClick={() => router.push("/dashboard?tab=services")}
        />

        <SidebarItem
          label="My Profile"
          icon={User}
          active={activeTab === "profile"}
          onClick={() => router.push("/dashboard?tab=profile")}
        />

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-md
                     text-red-600 hover:bg-red-50 transition mt-6"
        >
          <LogOut size={18} />
          Logout
        </button>
      </nav>
    </aside>
  );
}

/* =========================
   SIDEBAR ITEM
========================= */

function SidebarItem({
  label,
  icon: Icon,
  active,
  onClick,
}: {
  label: string;
  icon: any;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 w-full px-4 py-4 rounded-md
        font-light transition
        ${
          active ? "bg-[#d62038] text-white" : "text-[#737373] hover:bg-red-50"
        }`}
    >
      <Icon size={18} />
      {label}
    </button>
  );
}
