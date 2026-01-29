import { NextResponse } from "next/server";

const BASE = process.env.NEXT_PUBLIC_API_URL!;

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { success: false, message: "Authorization missing" },
        { status: 401 },
      );
    }

    const backendRes = await fetch(`${BASE}/lawizerExpert/profile`, {
      headers: { Authorization: authHeader },
      cache: "no-store",
    });

    const data = await backendRes.json();
    return NextResponse.json({ success: true, ...data });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    );
  }
}
