import { NextResponse } from "next/server";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PrefectureResponse {
  message: null;
  result: Prefecture[];
}

export async function GET() {
  try {
    const response = await fetch(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_RESAS_API_KEY as string,
      },
    });

    if (!response.ok) {
      throw new Error(`都道府県データの取得に失敗しました`);
    }

    // 明示的にデータの型を指定
    const data: PrefectureResponse = (await response.json()) as PrefectureResponse;

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "不明なエラーが発生しました";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
