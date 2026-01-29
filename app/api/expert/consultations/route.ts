import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const expertType = searchParams.get("expertType");

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

    const url = new URL(`${BASE}/expert/consultations`);
    if (expertType) {
      url.searchParams.set("expertType", expertType);
    }

    const backendRes = await fetch(url.toString(), {
      method: "GET",
      headers: { Authorization: authHeader },
      cache: "no-store",
    });

    if (!backendRes.ok) {
      const errorBody = await backendRes.json().catch(() => null);
      return NextResponse.json(
        {
          success: false,
          message: errorBody?.message || "Failed to fetch consultations",
          errorCode: errorBody?.errorCode || null,
        },
        { status: backendRes.status },
      );
    }

    const data = await backendRes.json();

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("/api/expert/consultations error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", errorCode: null },
      { status: 500 },
    );
  }
}
