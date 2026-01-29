import InternalDashboardLayoutClient from "@/components/internal/DashboardLayout";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="p-6">Loading dashboard...</div>}>
      <InternalDashboardLayoutClient>{children}</InternalDashboardLayoutClient>
    </Suspense>
  );
}
