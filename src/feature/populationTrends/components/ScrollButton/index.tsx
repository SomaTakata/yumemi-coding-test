import React from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

import Button from "../../../../shared/components/Button";
import Icon from "../../../../shared/components/Icon";

interface ScrollButtonProps {
  atTop: boolean;
  onClick: () => void;
}

const ScrollButton: React.FC<ScrollButtonProps> = ({ atTop, onClick }) => {
  return (
    <Button className="fixed bottom-4 right-4 bg-slate-600 text-sm text-white" onClick={onClick}>
      {atTop ? "統計を見る" : "都道府県を選択する"}
      <Icon IconComponent={atTop ? FaAngleDoubleDown : FaAngleDoubleUp} className="text-gray-200" />
    </Button>
  );
};

export default ScrollButton;
