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
  const [chartData, setChartData] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);
  const previousSelectedPrefs = useRef<Prefecture[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const seriesData: { prefName: string; data: { year: number; value: number }[] }[] = [];

      for (const pref of selectedPrefs) {
        try {
          const response = await fetch(`/api/population?prefCode=${pref.prefCode}`);
          if (!response.ok) {
            throw new Error(`Failed to fetch population data for ${pref.prefName}`);
          }

          // 明示的に型を指定
          const result: ApiResponse = (await response.json()) as ApiResponse;
          console.log("Fetched data:", result); // デバッグ情報を追加

          const data = result.result.data.find((d) => d.label === selectedDataSet)?.data || [];
          console.log(`Data for ${selectedDataSet}:`, data); // デバッグ情報を追加

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

      // 更新された都道府県リストを保存
      previousSelectedPrefs.current = selectedPrefs;
    };

    fetchData().catch((error) => console.error(error));
  }, [selectedPrefs, selectedDataSet]);

  return chartData;
};

export default usePopulationData;
