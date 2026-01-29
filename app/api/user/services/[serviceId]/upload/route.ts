import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(
  req: Request,
  { params }: { params: { serviceId: string } },
) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization token missing" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const backendRes = await fetch(
      `${BASE}/user/services/${params.serviceId}/upload`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    if (!backendRes.ok) {
      const error = await backendRes.json().catch(() => null);
      return NextResponse.json(
        {
          success: false,
          message: error?.message || "Failed to upload document",
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
    console.error("/api/user/services/upload error:", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
