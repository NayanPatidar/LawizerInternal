"use client";

import { useEffect, useState } from "react";
import { serverApi } from "@/lib/apis/axios";

interface LawizerExpertProfile {
  name: string;
  email: string;
  experience?: string;
}

export default function ProfileTab() {
  const [profile, setProfile] = useState<LawizerExpertProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await serverApi.get("/api/profile");
        setProfile(res.data.profile);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
    return <p className="mt-8 text-gray-500">Loading profile…</p>;
  }

  if (!profile) {
    return <p className="mt-8 text-red-600">Profile not found.</p>;
  }

  return (
    <div className="mt-4 max-w-3xl space-y-6">
      <p className="text-gray-600">
        Your internal Lawizer expert details.
      </p>

      <div className="bg-white rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name" value={profile.name} />
        <Field label="Email" value={profile.email} />
        <Field label="Role" value="Lawizer Expert" />
        {profile.experience && (
          <Field label="Experience" value={profile.experience} />
        )}
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-gray-800 font-medium">{value}</p>
    </div>
  );
}
