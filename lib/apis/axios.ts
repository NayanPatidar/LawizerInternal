import axios from "axios";

/* ===================== SHARED TOKEN INTERCEPTOR ===================== */

const attachAuthToken = (config: any) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
};

/* ===================== NEXT.JS SERVER API ===================== */
/* Calls /api/* → same origin */

export const serverApi = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

serverApi.interceptors.request.use(attachAuthToken);

/* ===================== BACKEND / FIREBASE API ===================== */
/* Calls external backend directly */

export const backendApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

backendApi.interceptors.request.use(attachAuthToken);
