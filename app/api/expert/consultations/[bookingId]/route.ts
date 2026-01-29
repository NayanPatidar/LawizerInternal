import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(
  req: NextRequest,
  { params }: { params: { bookingId: string } },
) {
  try {
    const { bookingId } = params;

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

    const backendRes = await fetch(
      `${BASE}/expert/consultations/${bookingId}`,
      {
        method: "GET",
        headers: { Authorization: authHeader },
        cache: "no-store",
      },
    );

    if (!backendRes.ok) {
      const errorBody = await backendRes.json().catch(() => null);
      return NextResponse.json(
        {
          success: false,
          message: errorBody?.message || "Failed to fetch consultation",
          errorCode: errorBody?.errorCode || null,
        },
        { status: backendRes.status },
      );
    }

    const data = await backendRes.json();

    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("/api/expert/consultations/[bookingId] error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
