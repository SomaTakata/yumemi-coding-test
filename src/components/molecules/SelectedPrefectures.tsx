import React from "react";
import { IoCloseCircle } from "react-icons/io5";

import { Prefecture } from "@/types";

import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

interface SelectedPrefecturesProps {
  selectedPrefs: Prefecture[];
  togglePrefecture: (prefCode: number) => void;
}

const SelectedPrefectures: React.FC<SelectedPrefecturesProps> = ({
  selectedPrefs,
  togglePrefecture,
}) => {
  return (
    <div className="mt-4 flex flex-wrap gap-3 rounded-md border p-2">
      {selectedPrefs.length === 0 ? (
        <Button
          className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-1 text-sm shadow-md"
          onClick={() => {}}
        >
          <p className="text-xs text-gray-300 sm:text-sm">選択なし</p>
        </Button>
      ) : (
        selectedPrefs.map((pref) => (
          <Button
            className="flex items-center justify-center gap-2 rounded-lg border border-blue-600 px-2 py-1 text-sm shadow-md"
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
