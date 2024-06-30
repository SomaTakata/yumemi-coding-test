import React from "react";
import { FaCheckCircle, FaCircle } from "react-icons/fa";

import Button from "../atoms/Button";
import Icon from "../atoms/Icon";

interface RegionToggleButtonProps {
  region: string;
  allSelected: boolean;
  toggleRegion: (region: string) => void;
}

const RegionToggleButton: React.FC<RegionToggleButtonProps> = ({
  region,
  allSelected,
  toggleRegion,
}) => {
  return (
    <Button onClick={() => toggleRegion(region)}>
      <Icon
        IconComponent={allSelected ? FaCheckCircle : FaCircle}
        className={allSelected ? "text-blue-600" : "text-gray-200"}
      />
      <p
        className={
          allSelected ? "text-xs text-blue-600 sm:text-sm" : "text-xs text-slate-600 sm:text-sm"
        }
      >
        全て
      </p>
    </Button>
  );
};

export default RegionToggleButton;
