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

    const backendRes = await fetch(`${BASE}/user/dashboard`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
      cache: "no-store",
    });

    if (!backendRes.ok) {
      const errorBody = await backendRes.json().catch(() => null);

      return NextResponse.json(
        {
          success: false,
          message: errorBody?.message || "Failed to fetch dashboard",
          errorCode: errorBody?.errorCode || null,
        },
        { status: backendRes.status },
      );
    }

    const data = await backendRes.json();

    return NextResponse.json({
      success: true,
      dashboard: data.dashboard,
    });
  } catch (error) {
    console.error("/api/user/dashboard error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        errorCode: null,
      },
      { status: 500 },
    );
  }
}
