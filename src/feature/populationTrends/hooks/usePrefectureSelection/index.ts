import { useState } from "react";

import regions from "@/data/regions";
import { Prefecture } from "@/types/prefecture";
import { Regions } from "@/types/region";

const usePrefectureSelection = (prefectures: Prefecture[]) => {
  const [selectedPrefs, setSelectedPrefs] = useState<Prefecture[]>([]);

  const togglePrefecture = (prefCode: number) => {
    const pref = prefectures.find((p) => p.prefCode === prefCode);
    if (!pref) return;

    // 選択された都道府県をトグルする
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

    // 全ての都道府県が選択されているか確認
    const allSelected = regionPrefs.every((pref) =>
      selectedPrefs.some((selected) => selected.prefCode === pref.prefCode),
    );

    if (allSelected) {
      // すべて選択されている場合は選択解除
      setSelectedPrefs((prevSelectedPrefs) =>
        prevSelectedPrefs.filter((pref) => !regionPrefCodes.includes(pref.prefCode)),
      );
    } else {
      // 一部または全く選択されていない場合は選択追加
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

export default usePrefectureSelection;
