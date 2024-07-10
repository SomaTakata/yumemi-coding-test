import { render, screen } from "@testing-library/react";
import React from "react";

import PopulationChart from ".";

jest.mock("highcharts-react-official", () => (props: any) => (
  <div data-testid="highcharts-react-mock">{JSON.stringify(props.options)}</div>
));

describe("PopulationChartコンポーネントのテスト", () => {
  const mockPopulationData = [
    {
      prefName: "東京都",
      data: [
        { year: 2000, value: 12000000 },
        { year: 2005, value: 13000000 },
      ],
    },
    {
      prefName: "大阪府",
      data: [
        { year: 2000, value: 8000000 },
        { year: 2005, value: 8500000 },
      ],
    },
  ];

  test("人口データが正しく表示されること", () => {
    render(<PopulationChart populationdata={mockPopulationData} />);

    const highchartsElement = screen.getByTestId("highcharts-react-mock");
    expect(highchartsElement).toBeInTheDocument();

    const chartOptions = JSON.parse(highchartsElement.textContent || "");

    // タイトルの検証
    expect(chartOptions.title.text).toBe("");

    // x軸のカテゴリの検証
    expect(chartOptions.xAxis.categories).toEqual(["2000", "2005"]);

    // y軸のタイトルの検証
    expect(chartOptions.yAxis.title.text).toBe("人口数");

    // シリーズデータの検証
    expect(chartOptions.series).toEqual([
      { type: "line", name: "東京都", data: [12000000, 13000000] },
      { type: "line", name: "大阪府", data: [8000000, 8500000] },
    ]);
  });

  test("人口データがない場合、デフォルトのシリーズが表示されること", () => {
    render(<PopulationChart populationdata={[]} />);

    const highchartsElement = screen.getByTestId("highcharts-react-mock");
    expect(highchartsElement).toBeInTheDocument();

    const chartOptions = JSON.parse(highchartsElement.textContent || "");

    // デフォルトのシリーズの検証
    expect(chartOptions.series).toEqual([{ type: "line", name: "都道府県名", data: [] }]);
  });
});
