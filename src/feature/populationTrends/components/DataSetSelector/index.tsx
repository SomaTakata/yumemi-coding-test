import React from "react";

import Button from "../../../../shared/components/Button";

interface DataSetSelectorProps {
  selectedDataSet: string;
  onSelect: (dataSet: string) => void;
}

const DataSetSelector: React.FC<DataSetSelectorProps> = ({ selectedDataSet, onSelect }) => {
  const dataSets = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  return (
    <div className="mb-4 mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {dataSets.map((dataSet) => (
        <Button
          className={
            selectedDataSet === dataSet
              ? "border-blue-600 text-xs text-blue-600 sm:text-sm"
              : "text-xs text-slate-600 sm:text-sm"
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
