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
      // 前回選択されていなかった新たに選択された都道府県を取得
      const newPrefs = selectedPrefs.filter(
        (pref) => !previousSelectedPrefs.current.some((p) => p.prefCode === pref.prefCode),
      );

      // フェッチしたデータを格納する配列
      const seriesData: { prefName: string; data: { year: number; value: number }[] }[] = [];

      for (const pref of selectedPrefs) {
        try {
          let result: ApiResponse;

          if (cachedData.current.has(pref.prefCode)) {
            // キャッシュがある場合はキャッシュから取得
            result = cachedData.current.get(pref.prefCode)!;
          } else if (newPrefs.some((p) => p.prefCode === pref.prefCode)) {
            // 新たに選択された都道府県の場合、APIからデータをフェッチしてキャッシュに保存
            const response = await fetch(`/api/population?prefCode=${pref.prefCode}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch population data for ${pref.prefName}`);
            }
            result = (await response.json()) as ApiResponse;
            cachedData.current.set(pref.prefCode, result);
          } else {
            // 新たに選択された都道府県でなければ次のループへ
            continue;
          }

          // 選択されたデータセットに対応するデータを取得
          const data = result.result.data.find((d) => d.label === selectedDataSet)?.data || [];

          // フェッチしたデータをseriesDataに追加
          seriesData.push({
            prefName: pref.prefName,
            data: data.map((point) => ({
              year: point.year,
              value: point.value,
            })),
          });
        } catch (error) {
          console.error(error);
        }
      }

      setChartData(seriesData);
      // 前回選択された都道府県を更新
      previousSelectedPrefs.current = selectedPrefs;
    };

    // 非同期関数を呼び出す
    fetchData().catch((error) => console.error(error));
  }, [selectedPrefs, selectedDataSet]);

  return chartData;
};

export default usePopulationData;
