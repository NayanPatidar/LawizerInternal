"use client";
import { useAuth } from "@/context/authContext";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isLoggedIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (isLoggedIn) {
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [isLoggedIn, loading, router]);

  return null;
}
