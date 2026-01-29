"use client";

import { useEffect, useMemo, useState } from "react";
import { serverApi } from "@/lib/apis/axios";
import { FileText, Clock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Tab = "active" | "completed";

export default function ServicesTab() {
  const [services, setServices] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await serverApi.get("/api/services");
        setServices(res.data?.services || []);
      } catch (err) {
        console.error("Failed to fetch services", err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const filtered = useMemo(
    () => services.filter((s) => s.status === activeTab),
    [services, activeTab],
  );

  if (loading) {
    return <p className="mt-8 text-gray-500">Loading services…</p>;
  }

  return (
    <div className="space-y-8 pt-4">
      {/* TABS */}
      <div className="inline-flex bg-gray-100 rounded-xl p-1">
        {(["active", "completed"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition
              ${
                activeTab === tab
                  ? "bg-white shadow text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
          >
            {tab === "active" ? "Active" : "Completed"}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-6">
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl p-10 text-center text-gray-500">
            No services found
          </div>
        )}

        {filtered.map((s) => (
          <div
            key={s.serviceId}
            className="bg-white rounded-2xl p-5 shadow-sm flex justify-between items-start"
          >
            {/* LEFT */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">
                {s.serviceName}
              </h3>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FileText size={14} />
                  {s.documentStats?.pending ?? 0} pending docs
                </span>

                <span className="flex items-center gap-1">
                  {s.status === "active" ? (
                    <Clock size={14} />
                  ) : (
                    <CheckCircle size={14} />
                  )}
                  {s.status}
                </span>
              </div>
            </div>

            {/* RIGHT */}
            <button
              onClick={() => router.push(`/services/${s.serviceId}`)}
              className="text-sm font-semibold text-[#c92c41]"
            >
              View →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
