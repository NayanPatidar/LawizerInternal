import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization token missing" },
        { status: 401 },
      );
    }

    const backendRes = await fetch(`${BASE}/user/services`, {
      method: "GET",
      headers: {
        Authorization: authHeader,
      },
      cache: "no-store",
    });

    if (!backendRes.ok) {
      const error = await backendRes.json().catch(() => null);
      return NextResponse.json(
        {
          success: false,
          message: error?.message || "Failed to fetch services",
        },
        { status: backendRes.status },
      );
    }

    const data = await backendRes.json();

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (err) {
    console.error("/api/user/services error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
