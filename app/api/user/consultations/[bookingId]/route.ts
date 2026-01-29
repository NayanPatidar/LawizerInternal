import { NextRequest, NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(
  req: NextRequest,
  context: { params: { bookingId: string } },
) {
  try {
    const { bookingId } = context.params;

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

    /* ===================== BACKEND REQUEST ===================== */

    const backendRes = await fetch(`${BASE}/user/consultations/${bookingId}`, {
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
          message: errorBody?.message || "Failed to fetch consultation",
          errorCode: errorBody?.errorCode || null,
        },
        { status: backendRes.status },
      );
    }

    const data = await backendRes.json();

    /* ===================== SUCCESS ===================== */

    return NextResponse.json(
      {
        success: true,
        ...data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("/api/user/consultations/[bookingId] error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
