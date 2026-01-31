"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

export default function Home() {
  const { loading, isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(isLoggedIn ? "/dashboard" : "/login");
  }, [loading, isLoggedIn, router]);

  return null;
}
