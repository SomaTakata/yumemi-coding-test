import PopulationTrendsPage from "@/feature/populationTrends/pages/PopulationTrendsPage";
import { Prefecture } from "@/types/prefecture";

interface PrefectureResponse {
  message: null;
  result: Prefecture[];
}

async function fetchPrefectures(): Promise<Prefecture[]> {
  const response = await fetch(`https://opendata.resas-portal.go.jp/api/v1/prefectures`, {
    headers: {
      "X-API-KEY": process.env.RESAS_API_KEY as string,
    },
    next: { revalidate: 86400 }, // データをキャッシュして、1日ごとに再フェッチ
  });

  if (!response.ok) {
    throw new Error(`都道府県データの取得に失敗しました`);
  }

  const data = (await response.json()) as PrefectureResponse;
  return data.result;
}

export default async function Page() {
  const prefectures = await fetchPrefectures();

  return <PopulationTrendsPage prefectures={prefectures} />;
}
