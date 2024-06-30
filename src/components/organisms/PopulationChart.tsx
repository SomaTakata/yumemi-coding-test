import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";

type PopulationData = {
  year: number;
  value: number;
};

type Props = {
  populationdata: {
    prefName: string;
    data: PopulationData[];
  }[];
};

const PopulationChart: React.FC<Props> = ({ populationdata }) => {
  const series: Highcharts.SeriesOptionsType[] = [];
  const categories: string[] = [];

  for (const p of populationdata) {
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

  const options: Highcharts.Options = {
    title: {
      text: "総人口推移",
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
    <div className="mt-3 sm:p-3">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default PopulationChart;