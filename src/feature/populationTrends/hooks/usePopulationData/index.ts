import { useMemo } from "react";

import { Prefecture } from "@/types/prefecture";

import useFetchPopulationData from "../useFetchPopulationData";

const usePopulationData = (selectedPrefs: Prefecture[], selectedDataSet: string) => {
  const prefCodes = selectedPrefs.map((pref) => pref.prefCode);
  const fetchedData = useFetchPopulationData(prefCodes, selectedDataSet);

  const chartData = useMemo(() => {
    return selectedPrefs.map((pref) => {
      const data = fetchedData.find((item) => item.prefCode === pref.prefCode)?.data || [];
      return {
        prefName: pref.prefName,
        data,
      };
    });
  }, [fetchedData, selectedPrefs]);

  return chartData;
};

export default usePopulationData;
