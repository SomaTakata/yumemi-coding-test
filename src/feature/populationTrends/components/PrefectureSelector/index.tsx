import React from "react";

import { Prefecture } from "@/types";

import RegionSelector from "../RegionSelector";
import SelectedPrefectures from "../SelectedPrefectures";

interface PrefectureSelectorProps {
  selectedPrefs: Prefecture[];
  togglePrefecture: (prefCode: number) => void;
  toggleRegion: (region: string) => void;
  prefectures: Prefecture[];
  loading: boolean;
}

const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({
  selectedPrefs,
  togglePrefecture,
  toggleRegion,
  prefectures,
  loading,
}) => {
  return (
    <>
      <div className="flex flex-col justify-start gap-1 sm:flex-row sm:items-center sm:gap-3 ">
        <p className="border-l-4 pl-4 text-sm ">都道府県を選択してください</p>
        <p className="pl-5 text-[10px] text-gray-300 sm:pl-1 sm:text-xs">
          出典：RESAS（地域経済分析システム）を元に加工して作成
        </p>
      </div>

      <RegionSelector
        loading={loading}
        prefectures={prefectures}
        selectedPrefs={selectedPrefs.map((pref) => pref.prefCode)}
        togglePrefecture={togglePrefecture}
        toggleRegion={toggleRegion}
      />
      <SelectedPrefectures selectedPrefs={selectedPrefs} togglePrefecture={togglePrefecture} />
    </>
  );
};

export default PrefectureSelector;
