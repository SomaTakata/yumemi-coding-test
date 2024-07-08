import { useState } from "react";

import regions from "@/data/regions";
import { Prefecture } from "@/types/prefecture";
import { Regions } from "@/types/region";

export const usePrefectureSelection = (prefectures: Prefecture[]) => {
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([]);

  const togglePrefecture = (prefCode: number) => {
    const pref = prefectures.find((p) => p.prefCode === prefCode);
    if (!pref) return;

    setSelectedPrefs((prevSelectedPrefs) =>
      prevSelectedPrefs.some((p) => p.prefCode === prefCode)
        ? prevSelectedPrefs.filter((p) => p.prefCode !== prefCode)
        : [...prevSelectedPrefs, pref],
    );
  };

  const toggleRegion = (region: keyof Regions) => {
    const regionPrefCodes = regions[region] || [];
    const regionPrefs = regionPrefCodes
      .map((code) => prefectures.find((p) => p.prefCode === code))
      .filter((p): p is Prefecture => p !== undefined);

    const allSelected = regionPrefs.every((pref) =>
      selectedPrefs.some((selected) => selected.prefCode === pref.prefCode),
    );

    if (allSelected) {
      setSelectedPrefs((prevSelectedPrefs) =>
        prevSelectedPrefs.filter((pref) => !regionPrefCodes.includes(pref.prefCode)),
      );
    } else {
      setSelectedPrefs((prevSelectedPrefs) => {
        const newSelectedPrefs = [...prevSelectedPrefs];

        regionPrefs.forEach((pref) => {
          if (!newSelectedPrefs.some((selected) => selected.prefCode === pref.prefCode)) {
            newSelectedPrefs.push(pref);
          }
        });

        return newSelectedPrefs;
      });
    }
  };

  return {
    selectedPrefs,
    togglePrefecture,
    toggleRegion,
  };
};
