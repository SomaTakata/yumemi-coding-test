import { useState, useEffect } from "react";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

interface PrefectureResponse {
  message: null;
  result: Prefecture[];
}

const useFetchPrefectures = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrefectures = async () => {
      try {
        // APIから都道府県データを取得
        const response = await fetch("/api/prefectures");
        if (!response.ok) {
          throw new Error("Failed to fetch prefectures");
        }

        const data: PrefectureResponse = (await response.json()) as PrefectureResponse;
        setPrefectures(data.result);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    // 非同期関数を呼び出す
    fetchPrefectures().catch((error) => console.error(error));
  }, []);

  return { prefectures, loading, error };
};

export default useFetchPrefectures;
