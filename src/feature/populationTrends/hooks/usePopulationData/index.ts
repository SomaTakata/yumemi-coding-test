import { useState, useEffect, useRef } from "react";

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationDataSet {
  label: string;
  data: PopulationData[];
}

interface ApiResponse {
  result: {
    data: PopulationDataSet[];
  };
}

interface Prefecture {
  prefCode: number;
  prefName: string;
}

const usePopulationData = (selectedPrefs: Prefecture[], selectedDataSet: string) => {
  // チャートに表示するデータの状態
  const [chartData, setChartData] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);
  // APIから取得したデータのキャッシュ
  const cachedData = useRef<Map<number, ApiResponse>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      // 選択された都道府県がない場合、チャートデータをクリア
      if (selectedPrefs.length === 0) {
        setChartData([]);
        return;
      }

      // キャッシュされていない新しい都道府県を取得
      const newPrefs = selectedPrefs.filter((pref) => !cachedData.current.has(pref.prefCode));

      // 新しい都道府県がある場合、APIからデータをフェッチ
      if (newPrefs.length > 0) {
        const prefCodes = newPrefs.map((pref) => pref.prefCode).join(",");
        const response = await fetch(`/api/population?prefCodes=${prefCodes}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch population data for prefCodes ${prefCodes}`);
        }

        const results = (await response.json()) as ApiResponse[];

        // フェッチしたデータをキャッシュに保存
        results.forEach((result, index) => {
          const pref = newPrefs[index];
          if (pref) {
            cachedData.current.set(pref.prefCode, result);
          }
        });
      }

      // キャッシュされたデータからchartDataに追加
      const updatedChartData = selectedPrefs.map((pref) => {
        const cachedResult = cachedData.current.get(pref.prefCode);
        if (cachedResult) {
          const data =
            cachedResult.result.data.find((d) => d.label === selectedDataSet)?.data || [];
          return {
            prefName: pref.prefName,
            data: data.map((point) => ({
              year: point.year,
              value: point.value,
            })),
          };
        }
        return { prefName: pref.prefName, data: [] };
      });

      // チャートデータを更新
      setChartData(updatedChartData);
    };

    fetchData().catch((error) => console.error(error));
  }, [selectedPrefs, selectedDataSet]);

  return chartData;
};

export default usePopulationData;
