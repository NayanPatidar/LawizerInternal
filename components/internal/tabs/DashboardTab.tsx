"use client";

import { useEffect, useState } from "react";
import { serverApi } from "@/lib/apis/axios";
import { ClipboardList, CheckCircle, Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";

const PRIMARY = "#c92c41";

export default function DashboardTab() {
  const [dashboard, setDashboard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await serverApi.get("/api/dashboard");
        setDashboard(res.data.dashboard);
      } catch (err) {
        console.error("Failed to load internal dashboard", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <p className="mt-12 text-gray-500 text-lg">Loading dashboard…</p>;
  }

  return (
    <motion.div
      className="pt-4 space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* HEADER */}
      <div>
        <p className="text-lg font-light text-[#373737]">Welcome back 👋</p>
        <p className="text-gray-500 mt-1">
          Here’s an overview of your assigned services.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard
          title="Assigned Services"
          value={dashboard?.assignedServices ?? 0}
          icon={ClipboardList}
        />

        <StatCard
          title="Active Services"
          value={dashboard?.activeServices ?? 0}
          icon={Clock}
        />

        <StatCard
          title="Pending Documents"
          value={dashboard?.pendingDocuments ?? 0}
          icon={FileText}
        />

        <StatCard
          title="Completed Services"
          value={dashboard?.completedServices ?? 0}
          icon={CheckCircle}
        />
      </div>
    </motion.div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: any;
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-5 flex justify-between items-center"
      whileHover={{ boxShadow: "0 10px 24px rgba(0,0,0,0.08)" }}
    >
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-3xl font-semibold mt-2">{value}</p>
      </div>

      <div
        className="h-14 w-14 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: "#c92c4112" }}
      >
        <Icon size={26} color={PRIMARY} />
      </div>
    </motion.div>
  );
}
