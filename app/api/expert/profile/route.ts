import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        {
          success: false,
          message: "Authorization token missing",
          errorCode: "TOKEN_MISSING",
        },
        { status: 401 },
      );
    }
    console.log("Hello");

    const backendRes = await fetch(`${BASE}/expert/profile`, {
      method: "GET",
      headers: { Authorization: authHeader },
      cache: "no-store",
    });

    if (!backendRes.ok) {
      console.log("Not Found");
      
      const errorBody = await backendRes.json().catch(() => null);
      return NextResponse.json(
        {
          success: false,
          message: errorBody?.message || "Failed to fetch profile",
          errorCode: errorBody?.errorCode || null,
        },
        { status: backendRes.status },
      );
    }

    const data = await backendRes.json();
    console.log(data);
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("/api/expert/profile error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", errorCode: null },
      { status: 500 },
    );
  }
}
