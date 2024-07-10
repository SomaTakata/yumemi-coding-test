import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

import Button from "../../../../shared/components/Button";
import Icon from "../../../../shared/components/Icon";

interface PrefectureButtonProps {
  name: string;
  selected: boolean;
  onClick: () => void;
}

const PrefectureButton: React.FC<PrefectureButtonProps> = ({ name, selected, onClick }) => {
  return (
    <Button className={selected ? "border-blue-600" : ""} onClick={onClick}>
      <Icon
        IconComponent={selected ? FaCheckCircle : FaCircle}
        className={selected ? "text-blue-600" : "text-gray-200"}
      />
      <p
        className={
          selected ? "text-xs text-blue-600 sm:text-sm" : "text-xs text-slate-600 sm:text-sm"
        }
      >
        {name}
      </p>
    </Button>
  );
};

export default PrefectureButton;
