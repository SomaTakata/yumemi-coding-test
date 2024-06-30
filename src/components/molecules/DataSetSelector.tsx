import React from "react";

import Button from "../atoms/Button";

interface DataSetSelectorProps {
  selectedDataSet: string;
  onSelect: (dataSet: string) => void;
}

const DataSetSelector: React.FC<DataSetSelectorProps> = ({ selectedDataSet, onSelect }) => {
  const dataSets = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  return (
    <div className="mb-4 flex gap-1 sm:gap-2">
      {dataSets.map((dataSet) => (
        <Button
          className={
            selectedDataSet === dataSet
              ? "w-full border-blue-600 text-[10px] text-blue-600 sm:text-sm"
              : "w-full text-[10px] text-slate-600 sm:text-sm"
          }
          key={dataSet}
          onClick={() => onSelect(dataSet)}
        >
          {dataSet}
        </Button>
      ))}
    </div>
  );
};

export default DataSetSelector;
