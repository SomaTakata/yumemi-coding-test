import React, { useEffect, useState } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

interface TemplateProps {
  header: React.ReactNode;
  content: React.ReactNode;
}

const Template: React.FC<TemplateProps> = ({ header, content }) => {
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
    <main className="relative flex min-h-screen w-full flex-col items-center px-4 py-12  sm:px-12">
      <Button
        className="fixed bottom-4 right-4 z-50 bg-slate-600 text-sm text-white"
        onClick={handleButtonClick}
      >
        {atTop ? "統計を見る" : "都道府県を選択する"}
        <Icon
          IconComponent={atTop ? FaAngleDoubleDown : FaAngleDoubleUp}
          className="text-gray-200"
        />
      </Button>
      {header}
      <div className="h-10" />
      <div className="w-full">{content}</div>
    </main>
  );
};

export default Template;
