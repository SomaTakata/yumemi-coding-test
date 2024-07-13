import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const prefCodes = searchParams.get("prefCodes")?.split(",") || [];

  if (prefCodes.length === 0) {
    return NextResponse.json({ error: "prefCodes are required" }, { status: 400 });
  }

  try {
    const fetchPopulationData = (prefCode: string) =>
      fetch(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
        {
          headers: {
            "X-API-KEY": process.env.RESAS_API_KEY as string,
          },
        },
      ).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch population data for prefCode ${prefCode}`);
        }
        return res.json();
      });

    const responses = await Promise.all(prefCodes.map(fetchPopulationData));

    return NextResponse.json(responses);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
