import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prefCode = searchParams.get("prefCode");

  if (!prefCode) {
    return NextResponse.json({ error: "prefCode is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        headers: {
          "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY as string,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch population for prefCode ${prefCode}`);
    }

    const data = (await response.json()) as Record<string, unknown>;
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
