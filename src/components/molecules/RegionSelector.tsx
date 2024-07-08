import React from "react";

import RegionList from "@/components/organisms/RegionList";

import regions from "@/data/regions";
import { Prefecture } from "@/types";

import LoadingPlaceholder from "./LoadingPlaceholder";

interface RegionSelectorProps {
  prefectures: Prefecture[];
  selectedPrefs: number[];
  togglePrefecture: (prefCode: number) => void;
  toggleRegion: (region: string) => void;
  loading: boolean;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({
  prefectures,
  selectedPrefs,
  togglePrefecture,
  toggleRegion,
  loading,
}) => {
  if (loading) {
    return <LoadingPlaceholder />;
  }

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
