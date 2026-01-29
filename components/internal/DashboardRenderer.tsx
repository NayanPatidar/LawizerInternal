"use client";

import { useSearchParams } from "next/navigation";
import DashboardTab from "@/components/internal/tabs/DashboardTab";
import ServicesTab from "@/components/internal/tabs/ServicesTab";
import ProfileTab from "@/components/internal/tabs/ProfileTab";

export default function InternalDashboardRenderer() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "dashboard";

  return (
    <>
      {tab === "dashboard" && <DashboardTab />}
      {tab === "services" && <ServicesTab />}
      {tab === "profile" && <ProfileTab />}
    </>
  );
}
