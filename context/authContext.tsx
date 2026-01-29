"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/* ===================== TYPES ===================== */

interface LawizerExpert {
  uid: string;
  email: string;
  role: "LAWIZER_EXPERT";
}

interface AuthContextType {
  user: LawizerExpert | null;
  loading: boolean;
  isLoggedIn: boolean;
  refreshUser: () => void;
  logout: () => void;
}

/* ===================== CONTEXT ===================== */

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoggedIn: false,
  refreshUser: () => {},
  logout: () => {},
});

/* ===================== PROVIDER ===================== */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LawizerExpert | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* ===================== REFRESH USER ===================== */
  const refreshUser = () => {
    try {
      const token = localStorage.getItem("token");
      const uid = localStorage.getItem("uid");
      const email = localStorage.getItem("email");
      const role = localStorage.getItem("role");

      if (!token || !uid || !email || role !== "LAWIZER_EXPERT") {
        setUser(null);
        setLoading(false);
        return;
      }

      setUser({
        uid,
        email,
        role: "LAWIZER_EXPERT",
      });
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  /* ===================== INIT ===================== */
  useEffect(() => {
    refreshUser();
  }, []);

  /* ===================== LOGOUT ===================== */
  const logout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userProfile");

    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ===================== HOOK ===================== */

export const useAuth = () => useContext(AuthContext);
