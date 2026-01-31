"use client";

import { useEffect, useMemo, useState } from "react";
import { serverApi } from "@/lib/apis/axios";
import { FileText, Clock, CheckCircle, ArrowLeft, Upload } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Tab = "active" | "completed";

type DocumentItem = {
  key: string;
  label: string;
  required: boolean;
  status: "PENDING" | "UPLOADED" | "APPROVED" | "REJECTED";
  fileUrl?: string | null;
};

type UserDetails = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
};

type Service = {
  serviceId: string;
  title: string;
  status: "active" | "completed";
  documentsRequired: DocumentItem[];
  documentStats: {
    pending: number;
  };
  userDetails?: UserDetails;
};

/* -------------------------------------------------------------------------- */
/*                               COMPONENT                                    */
/* -------------------------------------------------------------------------- */

export default function ServicesTab() {
  const [services, setServices] = useState<Service[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("active");
  const [loading, setLoading] = useState(true);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);

  /* ===================== LOAD SERVICES ===================== */

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await serverApi.get("/api/services");

        const normalized: Service[] = (res.data?.services || []).map(
          (s: any) => {
            const docs = s.documentsRequired || [];
            return {
              serviceId: s.serviceId,
              title: s.title,
              status: s.status.toLowerCase(),
              documentsRequired: docs,
              documentStats: {
                pending: docs.filter((d: any) => d.status === "PENDING").length,
              },
            };
          },
        );

        setServices(normalized);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  /* ===================== LOAD DETAILS ===================== */

  const openService = async (serviceId: string) => {
    try {
      setDetailsLoading(true);
      const res = await serverApi.get(`/api/services/${serviceId}`);

      setSelectedService({
        ...res.data.service,
        status: res.data.service.status.toLowerCase(),
      });
    } finally {
      setDetailsLoading(false);
    }
  };

  /* ===================== UPLOAD DOCUMENT ===================== */

  const uploadDocument = async (docName: string, file: File) => {
    try {
      setUploadingDoc(docName);
      const fakeUrl = URL.createObjectURL(file);

      await serverApi.post(
        `/api/services/${selectedService?.serviceId}/upload`,
        {
          name: docName,
          fileUrl: fakeUrl,
        },
      );

      await openService(selectedService!.serviceId);
    } finally {
      setUploadingDoc(null);
    }
  };

  /* ===================== FILTER ===================== */

  const filtered = useMemo(
    () => services.filter((s) => s.status === activeTab),
    [services, activeTab],
  );

  /* ===================== LOADING ===================== */

  if (loading) {
    return <p className="mt-8 text-gray-500">Loading services…</p>;
  }

  /* ======================================================================== */
  /*                             DETAIL VIEW                                   */
  /* ======================================================================== */

  if (selectedService) {
    return (
      <div className="space-y-6 max-w-4xl">
        {/* BACK */}
        <button
          onClick={() => setSelectedService(null)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to Services
        </button>

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-semibold">{selectedService.title}</h2>
          <p className="text-sm text-gray-500 capitalize">
            Status: {selectedService.status}
          </p>
        </div>

        {/* CLIENT DETAILS */}
        {selectedService.userDetails && (
          <div className="bg-white border rounded-xl p-5 space-y-2">
            <h3 className="font-medium text-lg">Client Details</h3>

            <div className="text-sm space-y-1">
              <p>
                <span className="text-gray-500">Name:</span>{" "}
                <span className="font-medium">
                  {selectedService.userDetails.name}
                </span>
              </p>

              <p>
                <span className="text-gray-500">Email:</span>{" "}
                {selectedService.userDetails.email}
              </p>

              {selectedService.userDetails.phone && (
                <p>
                  <span className="text-gray-500">Phone:</span>{" "}
                  {selectedService.userDetails.phone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* DOCUMENTS */}
        <div className="bg-white border rounded-xl p-5 space-y-4">
          <h3 className="font-medium text-lg">Documents</h3>

          {detailsLoading ? (
            <p className="text-sm text-gray-500">Loading documents…</p>
          ) : (
            selectedService.documentsRequired.map((doc) => (
              <div
                key={doc.key}
                className="flex justify-between items-center border rounded-lg p-3"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} />
                  <div>
                    <p className="text-sm font-medium">{doc.label}</p>
                    <p className="text-xs text-gray-500">{doc.status}</p>
                  </div>
                </div>

                {(doc.status === "PENDING" || doc.status === "REJECTED") && (
                  <label className="cursor-pointer flex items-center gap-2 text-sm text-[#c92c41]">
                    <Upload size={16} />
                    {uploadingDoc === doc.key ? "Uploading…" : "Upload"}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          uploadDocument(doc.key, e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                )}

                {doc.status === "APPROVED" && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Approved
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  /* ======================================================================== */
  /*                               LIST VIEW                                   */
  /* ======================================================================== */

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
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-gray-900">{s.title}</h3>

              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FileText size={14} />
                  {s.documentStats.pending} pending documents
                </span>

                <span className="flex items-center gap-1 capitalize">
                  {s.status === "active" ? (
                    <Clock size={14} />
                  ) : (
                    <CheckCircle size={14} />
                  )}
                  {s.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => openService(s.serviceId)}
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
