"use client";
import React, { useState } from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

const data: Prefecture[] = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  { prefCode: 3, prefName: "岩手県" },
  { prefCode: 4, prefName: "宮城県" },
  { prefCode: 5, prefName: "秋田県" },
  { prefCode: 6, prefName: "山形県" },
  { prefCode: 7, prefName: "福島県" },
  { prefCode: 8, prefName: "茨城県" },
  { prefCode: 9, prefName: "栃木県" },
  { prefCode: 10, prefName: "群馬県" },
  { prefCode: 11, prefName: "埼玉県" },
  { prefCode: 12, prefName: "千葉県" },
  { prefCode: 13, prefName: "東京都" },
  { prefCode: 14, prefName: "神奈川県" },
  { prefCode: 15, prefName: "新潟県" },
  { prefCode: 16, prefName: "富山県" },
  { prefCode: 17, prefName: "石川県" },
  { prefCode: 18, prefName: "福井県" },
  { prefCode: 19, prefName: "山梨県" },
  { prefCode: 20, prefName: "長野県" },
  { prefCode: 21, prefName: "岐阜県" },
  { prefCode: 22, prefName: "静岡県" },
  { prefCode: 23, prefName: "愛知県" },
  { prefCode: 24, prefName: "三重県" },
  { prefCode: 25, prefName: "滋賀県" },
  { prefCode: 26, prefName: "京都府" },
  { prefCode: 27, prefName: "大阪府" },
  { prefCode: 28, prefName: "兵庫県" },
  { prefCode: 29, prefName: "奈良県" },
  { prefCode: 30, prefName: "和歌山県" },
  { prefCode: 31, prefName: "鳥取県" },
  { prefCode: 32, prefName: "島根県" },
  { prefCode: 33, prefName: "岡山県" },
  { prefCode: 34, prefName: "広島県" },
  { prefCode: 35, prefName: "山口県" },
  { prefCode: 36, prefName: "徳島県" },
  { prefCode: 37, prefName: "香川県" },
  { prefCode: 38, prefName: "愛媛県" },
  { prefCode: 39, prefName: "高知県" },
  { prefCode: 40, prefName: "福岡県" },
  { prefCode: 41, prefName: "佐賀県" },
  { prefCode: 42, prefName: "長崎県" },
  { prefCode: 43, prefName: "熊本県" },
  { prefCode: 44, prefName: "大分県" },
  { prefCode: 45, prefName: "宮崎県" },
  { prefCode: 46, prefName: "鹿児島県" },
  { prefCode: 47, prefName: "沖縄県" },
];

const regions: { [key: string]: number[] } = {
  "北海道・東北": [1, 2, 3, 4, 5, 6, 7],
  関東: [8, 9, 10, 11, 12, 13, 14],
  "北陸・甲信越": [15, 16, 17, 18, 19, 20],
  東海: [21, 22, 23, 24],
  関西: [25, 26, 27, 28, 29, 30],
  中国: [31, 32, 33, 34, 35],
  四国: [36, 37, 38, 39],
  九州: [40, 41, 42, 43, 44, 45, 46, 47],
};

export default function Home() {
  const [selectedPrefs, setSelectedPrefs] = useState<number[]>([]);

  const togglePrefecture = (prefCode: number) => {
    setSelectedPrefs((prevSelectedPrefs) =>
      prevSelectedPrefs.includes(prefCode)
        ? prevSelectedPrefs.filter((code) => code !== prefCode)
        : [...prevSelectedPrefs, prefCode],
    );
  };

  return (
    <main className="relative flex min-h-screen w-full flex-col items-center px-6 pt-12 sm:px-12">
      <div className="absolute top-0 flex h-12 w-full items-center justify-center border-b text-sm sm:text-base">
        都道府県別人口遷移
      </div>
      <div className="h-10" />
      <div className="w-full">
        <div className="flex justify-start border-l-4 pl-4 text-sm">都道府県を選択してください</div>
        <div className="mt-4 flex flex-wrap gap-4 rounded-md border p-2">
          {/* Display selected prefectures */}
          {selectedPrefs.length === 0 ? (
            <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-2 py-1 text-sm shadow-md">
              <p className="text-xs text-gray-300 sm:text-sm">選択なし</p>
            </button>
          ) : (
            selectedPrefs.map((prefCode) => {
              const pref = data.find((p) => p.prefCode === prefCode);
              if (!pref) return null;
              return (
                <button
                  className="flex items-center justify-center gap-2 rounded-lg border border-blue-600 px-2 py-1 text-sm shadow-md"
                  key={prefCode}
                  onClick={() => togglePrefecture(prefCode)}
                >
                  <p className="text-xs text-blue-600 sm:text-sm">{pref.prefName}</p>
                  <IoCloseCircle className="text-blue-600" size={20} />
                </button>
              );
            })
          )}
        </div>
        <div className="flex w-full flex-col p-4 pt-6">
          {Object.entries(regions).map(([region, prefs]) => (
            <div className="mb-5 flex flex-col" key={region}>
              <p className="mb-2 w-fit border-b border-black text-sm">{region}</p>
              <div className="flex flex-wrap gap-3">
                {prefs.map((prefCode) => {
                  const pref = data.find((p) => p.prefCode === prefCode);
                  if (!pref) return null;
                  const isSelected = selectedPrefs.includes(prefCode);
                  return (
                    <button
                      className={`flex items-center justify-center gap-3 rounded-lg border px-2 py-1 text-sm shadow-md ${
                        isSelected ? "border-blue-600" : ""
                      }`}
                      key={prefCode}
                      onClick={() => togglePrefecture(prefCode)}
                    >
                      {isSelected ? (
                        <FaCheckCircle className="text-blue-600" size={16} />
                      ) : (
                        <FaCircle className="text-gray-200" size={16} />
                      )}
                      <p
                        className={
                          isSelected
                            ? "text-xs text-blue-600 sm:text-sm"
                            : "text-xs text-slate-600 sm:text-sm"
                        }
                      >
                        {pref.prefName}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
