"use client";

import { IoCloseCircle } from "react-icons/io5";

import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import RegionList from "@/components/organisms/RegionList";
import Template from "@/components/templates/Template";

import prefectures from "@/data/prefectures";
import regions from "@/data/regions";
import { usePrefectureSelection } from "@/hooks/usePrefectureSelection";

export default function PopulationTrendsPage() {
  const { selectedPrefs, togglePrefecture, toggleRegion } = usePrefectureSelection();

  return (
    <Template
      content={
        <>
          <div className="flex justify-start border-l-4 pl-4 text-sm">
            都道府県を選択してください
          </div>
          <div className="mt-4 flex flex-wrap gap-4 rounded-md border p-2">
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
          <div className="flex w-full flex-col p-4 pt-6">
            {Object.entries(regions).map(([region, prefCodes]) => (
              <RegionList
                key={region}
                prefectures={prefCodes.map((code) => ({
                  prefCode: code,
                  prefName: prefectures.find((p) => p.prefCode === code)?.prefName || "不明",
                }))}
                region={region}
                selectedPrefs={selectedPrefs.map((pref) => pref.prefCode)}
                togglePrefecture={togglePrefecture}
                toggleRegion={toggleRegion}
              />
            ))}
          </div>
        </>
      }
      header={
        <div className="absolute top-0 flex h-12 w-full items-center justify-center border-b text-sm sm:text-base">
          都道府県別人口推移
        </div>
      }
    />
  );
}
