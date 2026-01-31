import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

/* ============================================================
   🔹 LAWIZER EXPERT – UPLOAD DOCUMENT
============================================================ */
export async function POST(
  req: Request,
  { params }: { params: { serviceId: string } },
) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization missing" },
        { status: 401 },
      );
    }

    const body = await req.json();

    const backendRes = await fetch(
      `${BASE}/lawizerExpert/services/${params.serviceId}/documents/upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(body),
        cache: "no-store",
      },
    );

    const data = await backendRes.json();

    return NextResponse.json(
      { success: backendRes.ok, ...data },
      { status: backendRes.status },
    );
  } catch (error) {
    console.error("Expert upload document route error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
