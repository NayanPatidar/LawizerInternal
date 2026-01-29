import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function GET() {
  try {
    const apiRes = await fetch(`${BASE}/user/experts`, {
      method: "GET",
      cache: "no-store",
    });

    if (!apiRes.ok) {
      const errorBody = await apiRes.json().catch(() => null);

      return NextResponse.json(
        {
          success: false,
          message: errorBody?.message || "Failed to fetch experts",
          errorCode: errorBody?.errorCode || null,
        },
        { status: apiRes.status },
      );
    }

    const data = await apiRes.json();

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error("/api/experts error:", error);

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
