"use client";

import { useEffect, useMemo, useState } from "react";
import { serverApi } from "@/lib/apis/axios";
import { FileText, Clock, CheckCircle, ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";

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
  uploadedBy?: "USER" | "EXPERT";
};

type ExpertFile = {
  id: string;
  title: string;
  fileUrl: string;
  uploadedAt: any;
};

type Service = {
  serviceId: string;
  title: string;
  status: "active" | "completed";
  documentsRequired: DocumentItem[];
  expertUploadedFiles?: ExpertFile[];
  documentStats: {
    pending: number;
  };
  userDetails?: UserDetails;
};

type UserDetails = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
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
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [openRequestDoc, setOpenRequestDoc] = useState(false);
  const [requestLabel, setRequestLabel] = useState("");
  const [requestRequired, setRequestRequired] = useState(true);
  const [requesting, setRequesting] = useState(false);

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

  const requestDocumentFromUser = async (
    serviceId: string,
    label: string,
    required = true,
  ) => {
    await serverApi.post(`/api/services/${serviceId}/documents/request`, {
      label,
      required,
    });
  };

  const uploadExpertDocument = async () => {
    if (!file || !title || !selectedService) return;

    try {
      setUploading(true);

      const fakeUrl = URL.createObjectURL(file);

      await serverApi.post(
        `/api/services/${selectedService?.serviceId}/upload`,
        {
          title: title,
          fileUrl: fakeUrl,
        },
      );

      // reset form
      setTitle("");
      setFile(null);

      // reload details
      await openService(selectedService.serviceId);
    } finally {
      setUploading(false);
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
      <div className="space-y-6 max-w-4xl mb-8">
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

        {/* ================= USER UPLOADED DOCUMENTS ================= */}
        <div className="bg-white border rounded-xl p-5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">User Documents</h3>

            <button
              onClick={() => setOpenRequestDoc(true)}
              className="flex items-center gap-2 text-sm text-[#c92c41] font-medium"
            >
              <Upload size={14} />
              Request Document
            </button>
          </div>

          {selectedService.documentsRequired.length ? (
            selectedService.documentsRequired.map((doc) => (
              <div
                key={doc.key}
                className="flex justify-between items-center border rounded-lg p-3"
              >
                <div>
                  <p className="font-medium text-sm">{doc.label}</p>
                  <p className="text-xs text-gray-500">Status: {doc.status}</p>
                </div>

                <div className="flex items-center gap-3">
                  {doc.fileUrl && (
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#c92c41] underline"
                    >
                      View
                    </a>
                  )}

                  {doc.status === "APPROVED" && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Approved
                    </span>
                  )}

                  {doc.status === "REJECTED" && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                      Rejected
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No documents uploaded yet</p>
          )}
        </div>

        {/* ================= EXPERT UPLOADED FILES ================= */}
        <div className="bg-white border rounded-xl p-5 space-y-4">
          <h3 className="font-medium text-lg">Expert Documents</h3>

          {selectedService.expertUploadedFiles?.length ? (
            selectedService.expertUploadedFiles.map((file) => (
              <div
                key={file.id}
                className="flex justify-between items-center border rounded-lg p-3"
              >
                <div>
                  <p className="font-medium text-sm">{file.title}</p>
                  <p className="text-xs text-gray-500">Uploaded by you</p>
                </div>

                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#c92c41] underline"
                >
                  View
                </a>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No expert documents uploaded yet
            </p>
          )}
        </div>

        {/* ================= UPLOAD NEW EXPERT DOCUMENT ================= */}
        <div className="bg-white border rounded-xl p-5 space-y-4">
          <h3 className="font-medium text-lg">Upload New Document</h3>

          <input
            type="text"
            placeholder="Document title (e.g. Final Agreement Draft)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm"
          />

          <button
            disabled={!title || !file || uploading}
            onClick={uploadExpertDocument}
            className="bg-[#c92c41] text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
          >
            {uploading ? "Uploading…" : "Upload Document"}
          </button>
        </div>

        {openRequestDoc && selectedService && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold">Request Document</h3>

              <input
                type="text"
                placeholder="Document name (e.g. GST Certificate)"
                value={requestLabel}
                onChange={(e) => setRequestLabel(e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={requestRequired}
                  onChange={(e) => setRequestRequired(e.target.checked)}
                />
                Required for service completion
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setOpenRequestDoc(false)}
                  className="text-sm text-gray-500"
                >
                  Cancel
                </button>

                <button
                  disabled={!requestLabel || requesting}
                  onClick={async () => {
                    try {
                      setRequesting(true);

                      await requestDocumentFromUser(
                        selectedService.serviceId,
                        requestLabel,
                        requestRequired,
                      );

                      toast.success("Document requested from user");

                      setRequestLabel("");
                      setRequestRequired(true);
                      setOpenRequestDoc(false);

                      // Reload service details to reflect new doc
                      await openService(selectedService.serviceId);
                    } catch (err: any) {
                      toast.error(
                        err.response?.data?.message ||
                          "Failed to request document",
                      );
                    } finally {
                      setRequesting(false);
                    }
                  }}
                  className="bg-[#c92c41] text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
                >
                  {requesting ? "Requesting…" : "Request"}
                </button>
              </div>
            </div>
          </div>
        )}
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
