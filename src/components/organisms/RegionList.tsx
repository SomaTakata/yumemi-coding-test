import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

import { Prefecture } from "@/types";

import Button from "../atoms/Button";
import Icon from "../atoms/Icon";
import PrefectureButton from "../molecules/PrefectureButton";

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
        <Button onClick={() => toggleRegion(region)}>
          <Icon
            IconComponent={allSelected ? FaCheckCircle : FaCircle}
            className={allSelected ? "text-blue-600" : "text-gray-200"}
          />
          <p
            className={
              allSelected ? "text-xs text-blue-600 sm:text-sm" : "text-xs text-slate-600 sm:text-sm"
            }
          >
            全て
          </p>
        </Button>
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
