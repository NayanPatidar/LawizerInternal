import { backendApi } from "./axios";

/* -------------------------------------------------------------------------- */
/*                      🔐 LAWIZER EXPERT LOGIN API                           */
/* -------------------------------------------------------------------------- */

export const lawizerExpertLogin = async (idToken: string) => {
  try {
    const res = await backendApi.post("/lawizerExpert/login", {
      idToken,
    });

    // backend returns: { token, expert, expiresIn }
    if (res.data?.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("uid", res.data.expert.uid);
      localStorage.setItem("email", res.data.expert.email);
      localStorage.setItem("role", "LAWIZER_EXPERT");
      localStorage.setItem("userProfile", JSON.stringify(res.data.expert));
    }

    return {
      success: true,
      token: res.data.token,
      expert: res.data.expert,
      expiresIn: res.data.expiresIn,
    };
  } catch (err: any) {
    console.error("Lawizer expert login error:", err);

    return {
      success: false,
      message:
        err?.response?.data?.message || "Unable to login. Please try again.",
    };
  }
};
