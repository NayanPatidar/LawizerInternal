import InternalDashboardClient from "@/components/internal/DashboardRenderer";
import { Suspense } from "react";

export default function InternalDashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <InternalDashboardClient />
    </Suspense>
  );
}
