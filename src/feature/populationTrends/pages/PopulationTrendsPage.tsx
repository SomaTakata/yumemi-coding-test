"use client";

import React, { useEffect, useState } from "react";

import DataSetSelector from "@/feature/populationTrends/components/DataSetSelector";
import PopulationChart from "@/feature/populationTrends/components/PopulationChart";
import PrefectureSelector from "@/feature/populationTrends/components/PrefectureSelector";
import ScrollButton from "@/feature/populationTrends/components/ScrollButton";
import usePopulationData from "@/feature/populationTrends/hooks/usePopulationData";
import usePrefectureSelection from "@/feature/populationTrends/hooks/usePrefectureSelection";
import { Prefecture } from "@/types/prefecture";

interface PopulationTrendsPageProps {
  prefectures: Prefecture[];
}

export default function PopulationTrendsPage({ prefectures }: PopulationTrendsPageProps) {
  const { selectedPrefs, togglePrefecture, toggleRegion } = usePrefectureSelection(prefectures);

  const [selectedDataSet, setSelectedDataSet] = useState<string>("総人口");
  const [atTop, setAtTop] = useState(true);

  const chartData = usePopulationData(selectedPrefs, selectedDataSet);

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
    <main className="relative flex min-h-screen w-full flex-col items-center px-4 py-12 sm:px-12">
      <h1 className="absolute top-0 flex h-12 w-full items-center justify-center border-b text-sm sm:text-base">
        都道府県別人口推移
      </h1>
      <div className="h-10" />
      <div className="w-full">
        <section id="prefecture">
          <PrefectureSelector
            loading={false}
            prefectures={prefectures}
            selectedPrefs={selectedPrefs}
            togglePrefecture={togglePrefecture}
            toggleRegion={toggleRegion}
          />
        </section>
        <section className="mt-6" id="statistics">
          <div className="flex justify-start border-l-4 pl-4 text-sm">都道府県別人口推移</div>
          <div className="w-full p-1 sm:p-4">
            <DataSetSelector onSelect={setSelectedDataSet} selectedDataSet={selectedDataSet} />
            <PopulationChart populationData={chartData} />
          </div>
        </section>
        <ScrollButton atTop={atTop} onClick={handleButtonClick} />
      </div>
    </main>
  );
}
