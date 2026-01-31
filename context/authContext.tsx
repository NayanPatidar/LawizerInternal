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
  login: (expert: LawizerExpert, token: string) => void;
  logout: () => void;
}

/* ===================== CONTEXT ===================== */

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

/* ===================== PROVIDER ===================== */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<LawizerExpert | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  /* ===================== INIT ===================== */
  useEffect(() => {
    const token = localStorage.getItem("token");
    const uid = localStorage.getItem("uid");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (token && uid && email && role === "LAWIZER_EXPERT") {
      setUser({ uid, email, role: "LAWIZER_EXPERT" });
    }

    setLoading(false);
  }, []);

  /* ===================== LOGIN ===================== */
  const login = (expert: LawizerExpert, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("uid", expert.uid);
    localStorage.setItem("email", expert.email);
    localStorage.setItem("role", expert.role);
    localStorage.setItem("userProfile", JSON.stringify(expert));

    setUser(expert);
    router.replace("/dashboard");
  };

  /* ===================== LOGOUT ===================== */
  const logout = () => {
    localStorage.clear();
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ===================== HOOK ===================== */

export const useAuth = () => useContext(AuthContext);
