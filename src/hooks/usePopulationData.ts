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
  const cachedData = useRef<Map<number, ApiResponse>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      const newPrefs = selectedPrefs.filter(
        (pref) => !previousSelectedPrefs.current.some((p) => p.prefCode === pref.prefCode),
      );

      const seriesData: { prefName: string; data: { year: number; value: number }[] }[] = [];

      for (const pref of selectedPrefs) {
        try {
          let result: ApiResponse;

          if (cachedData.current.has(pref.prefCode)) {
            result = cachedData.current.get(pref.prefCode)!;
          } else if (newPrefs.some((p) => p.prefCode === pref.prefCode)) {
            const response = await fetch(`/api/population?prefCode=${pref.prefCode}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch population data for ${pref.prefName}`);
            }
            result = (await response.json()) as ApiResponse;
            cachedData.current.set(pref.prefCode, result);
          } else {
            continue;
          }

          const data = result.result.data.find((d) => d.label === selectedDataSet)?.data || [];

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
      previousSelectedPrefs.current = selectedPrefs;
    };

    fetchData().catch((error) => console.error(error));
  }, [selectedPrefs, selectedDataSet]);

  return chartData;
};

export default usePopulationData;
