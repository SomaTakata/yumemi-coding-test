import React from "react";
import { IoCloseCircle } from "react-icons/io5";

import { Prefecture } from "@/types";

import Button from "../../../../shared/components/Button";
import Icon from "../../../../shared/components/Icon";

interface SelectedPrefecturesProps {
  selectedPrefs: Prefecture[];
  togglePrefecture: (prefCode: number) => void;
}

const SelectedPrefectures: React.FC<SelectedPrefecturesProps> = ({
  selectedPrefs,
  togglePrefecture,
}) => {
  return (
    <div className="mb-8 flex flex-wrap gap-2 rounded-md  border p-2 sm:gap-3">
      {selectedPrefs.length === 0 ? (
        <Button
          className="flex items-center justify-center gap-1 rounded-lg border border-gray-300 px-2 py-1 text-sm shadow-md sm:gap-2"
          onClick={() => {}}
        >
          <p className="text-xs text-gray-300 sm:text-sm">選択なし</p>
        </Button>
      ) : (
        selectedPrefs.map((pref) => (
          <Button
            className="flex items-center justify-center gap-1 rounded-lg border border-blue-600 px-2 py-1 text-sm shadow-md sm:gap-2"
            key={pref.prefCode}
            onClick={() => togglePrefecture(pref.prefCode)}
          >
            <p className="text-xs text-blue-600 sm:text-sm">{pref.prefName}</p>
            <Icon IconComponent={IoCloseCircle} className="text-blue-600" size={16} />
          </Button>
        ))
      )}
    </div>
  );
};

export default SelectedPrefectures;
