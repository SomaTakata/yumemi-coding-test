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
  // 前回選択された都道府県の参照
  const previousSelectedPrefs = useRef<Prefecture[]>([]);
  // APIから取得したデータのキャッシュ
  const cachedData = useRef<Map<number, ApiResponse>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      // 選択された都道府県がない場合、チャートデータをクリア
      if (selectedPrefs.length === 0) {
        setChartData([]);
        previousSelectedPrefs.current = [];
        return;
      }

      // 新しく選択された都道府県を取得
      const newPrefs = selectedPrefs.filter(
        (pref) => !previousSelectedPrefs.current.some((p) => p.prefCode === pref.prefCode),
      );

      // フェッチしたデータを格納する配列
      const seriesData: { prefName: string; data: { year: number; value: number }[] }[] = [];

      // 新しい都道府県がある場合、APIからデータをフェッチ
      if (newPrefs.length > 0) {
        const prefCodes = newPrefs.map((pref) => pref.prefCode).join(",");
        const response = await fetch(`/api/population?prefCodes=${prefCodes}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch population data for prefCodes ${prefCodes}`);
        }

        const results = (await response.json()) as ApiResponse[];

        // フェッチしたデータをキャッシュに保存し、seriesDataに追加
        results.forEach((result, index) => {
          const pref = newPrefs[index];
          if (pref) {
            cachedData.current.set(pref.prefCode, result);

            const data = result.result.data.find((d) => d.label === selectedDataSet)?.data || [];

            seriesData.push({
              prefName: pref.prefName,
              data: data.map((point) => ({
                year: point.year,
                value: point.value,
              })),
            });
          }
        });
      }

      // 選択された都道府県のデータをキャッシュから取得してseriesDataに追加
      selectedPrefs.forEach((pref) => {
        if (!newPrefs.some((p) => p.prefCode === pref.prefCode)) {
          const result = cachedData.current.get(pref.prefCode);
          const data = result?.result.data.find((d) => d.label === selectedDataSet)?.data || [];

          seriesData.push({
            prefName: pref.prefName,
            data: data.map((point) => ({
              year: point.year,
              value: point.value,
            })),
          });
        }
      });

      // チャートデータを更新し、前回選択された都道府県を更新
      setChartData(seriesData);
      previousSelectedPrefs.current = selectedPrefs;
    };

    fetchData().catch((error) => console.error(error));
  }, [selectedPrefs, selectedDataSet]);

  return chartData;
};

export default usePopulationData;
