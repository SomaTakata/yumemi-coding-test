import React from "react";

import RegionList from "@/components/organisms/RegionList";

import regions from "@/data/regions";
import { Prefecture } from "@/types";

interface RegionSelectorProps {
  selectedPrefs: number[];
  togglePrefecture: (prefCode: number) => void;
  toggleRegion: (region: string) => void;
  prefectures: Prefecture[]; // プロパティに prefectures を追加
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  selectedPrefs,
  togglePrefecture,
  toggleRegion,
  prefectures, // prefectures を受け取る
}) => {
  return (
    <div className="flex w-full flex-col p-4 pt-6">
      {Object.entries(regions).map(([region, prefCodes]) => (
        <RegionList
          key={region}
          prefectures={prefCodes.map((code) => ({
            prefCode: code,
            prefName: prefectures.find((p) => p.prefCode === code)?.prefName || "不明",
          }))}
          region={region}
          selectedPrefs={selectedPrefs}
          togglePrefecture={togglePrefecture}
          toggleRegion={toggleRegion}
        />
      ))}
    </div>
  );
};

export default RegionSelector;
