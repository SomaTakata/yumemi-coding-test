import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

type PopulationData = {
  year: number;
  value: number;
};

type Props = {
  populationData: {
    prefName: string;
    data: PopulationData[];
  }[];
};

const PopulationChart: React.FC<Props> = ({ populationData }) => {
  const series: Highcharts.SeriesOptionsType[] = [];
  const categories: string[] = [];

  if (Array.isArray(populationData)) {
    for (const p of populationData) {
      const data: number[] = [];

      for (const pd of p.data) {
        data.push(pd.value);
        if (!categories.includes(String(pd.year))) {
          categories.push(String(pd.year));
        }
      }

      series.push({
        type: "line",
        name: p.prefName,
        data: data,
      });
    }
  }

  const options: Highcharts.Options = {
    title: {
      text: "",
    },
    xAxis: {
      title: {
        text: "年度",
      },
      categories: categories,
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    series: series.length === 0 ? [{ type: "line", name: "都道府県名", data: [] }] : series,
  };

  return (
    <div className="-ml-4 mt-6 sm:-ml-8 sm:p-3">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PopulationChart;
