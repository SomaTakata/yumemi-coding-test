import React from "react";

import { Prefecture } from "@/types";

import PrefectureButton from "../PrefectureButton";
import RegionToggleButton from "../RegionToggleButton";

interface RegionListProps {
  region: string;
  prefectures: Prefecture[];
  selectedPrefs: number[];
  togglePrefecture: (prefCode: number) => void;
  toggleRegion: (region: string) => void;
}

const RegionList: React.FC<RegionListProps> = ({
  region,
  prefectures,
  selectedPrefs,
  togglePrefecture,
  toggleRegion,
}) => {
  const allSelected = prefectures.every((pref) => selectedPrefs.includes(pref.prefCode));

  return (
    <div className="mb-5 flex flex-col">
      <p className="mb-2 w-fit border-b border-black text-sm">{region}</p>
      <div className="flex flex-wrap gap-3">
        <RegionToggleButton allSelected={allSelected} region={region} toggleRegion={toggleRegion} />
        {prefectures.map((pref) => (
          <PrefectureButton
            key={pref.prefCode}
            name={pref.prefName}
            onClick={() => togglePrefecture(pref.prefCode)}
            selected={selectedPrefs.includes(pref.prefCode)}
          />
        ))}
      </div>
    </div>
  );
};

export default RegionList;
