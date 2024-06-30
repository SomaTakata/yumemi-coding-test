"use client";

import { useState, useEffect } from "react";

import DataSetSelector from "@/components/molecules/DataSetSelector";
import RegionSelector from "@/components/molecules/RegionSelector";
import ScrollButton from "@/components/molecules/ScrollButton"; // 追加
import SelectedPrefectures from "@/components/molecules/SelectedPrefectures";
import PopulationChart from "@/components/organisms/PopulationChart";
import Template from "@/components/templates/Template";

import prefectures from "@/data/prefectures";
import { statistics } from "@/data/statistics";
import { usePrefectureSelection } from "@/hooks/usePrefectureSelection";

export default function PopulationTrendsPage() {
  const { selectedPrefs, togglePrefecture, toggleRegion } = usePrefectureSelection();
  const [selectedDataSet, setSelectedDataSet] = useState<string>("総人口");
  const [chartData, setChartData] = useState<
    { prefName: string; data: { year: number; value: number }[] }[]
  >([]);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const section = document.getElementById("statistics");
      if (section) {
        const sectionTop = section.getBoundingClientRect().top + scrollY - window.innerHeight / 2;
        setAtTop(window.scrollY < sectionTop);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = () => {
      const seriesData: { prefName: string; data: { year: number; value: number }[] }[] = [];
      for (const pref of selectedPrefs) {
        const data = statistics.result.data.find((d) => d.label === selectedDataSet)?.data || [];
        seriesData.push({
          prefName: pref.prefName,
          data: data.map((point: { year: number; value: number }) => ({
            year: point.year,
            value: point.value,
          })),
        });
      }
      setChartData(seriesData);
    };

    fetchData();
  }, [selectedPrefs, selectedDataSet]);

  const handleButtonClick = () => {
    const targetId = atTop ? "statistics" : "prefecture";
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80; // オフセット値を調整
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <Template
      content={
        <>
          <section id="prefecture">
            <div className="flex justify-start border-l-4 pl-4 text-sm">
              都道府県を選択してください
            </div>
            <SelectedPrefectures
              selectedPrefs={selectedPrefs}
              togglePrefecture={togglePrefecture}
            />
            <RegionSelector
              prefectures={prefectures}
              selectedPrefs={selectedPrefs.map((pref) => pref.prefCode)}
              togglePrefecture={togglePrefecture}
              toggleRegion={toggleRegion}
            />
          </section>
          <section className="mt-6" id="statistics">
            <div className="flex justify-start border-l-4 pl-4 text-sm">都道府県別人口推移</div>
            <div className="w-full p-1 sm:p-4">
              <DataSetSelector onSelect={setSelectedDataSet} selectedDataSet={selectedDataSet} />
              <PopulationChart populationdata={chartData} />
            </div>
          </section>
          <ScrollButton atTop={atTop} onClick={handleButtonClick} />
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
