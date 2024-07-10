import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import DataSetSelector from ".";

// Mock the Button component
jest.mock("@/shared/components/Button", () => ({ children, onClick, className }: any) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
));

describe("DataSetSelectorコンポーネントのテスト", () => {
  const dataSets = ["総人口", "年少人口", "生産年齢人口", "老年人口"];

  test("全てのデータセットボタンが表示されること", () => {
    render(<DataSetSelector onSelect={jest.fn()} selectedDataSet="" />);
    dataSets.forEach((dataSet) => {
      expect(screen.getByText(dataSet)).toBeInTheDocument();
    });
  });

  test("選択されたデータセットのボタンが正しいクラスを持つこと", () => {
    const selectedDataSet = "総人口";
    render(<DataSetSelector onSelect={jest.fn()} selectedDataSet={selectedDataSet} />);
    const selectedButton = screen.getByText(selectedDataSet);
    expect(selectedButton).toHaveClass("border-blue-600 text-xs text-blue-600 sm:text-sm");
  });

  test("他のデータセットのボタンが正しいクラスを持つこと", () => {
    const selectedDataSet = "総人口";
    render(<DataSetSelector onSelect={jest.fn()} selectedDataSet={selectedDataSet} />);
    dataSets
      .filter((dataSet) => dataSet !== selectedDataSet)
      .forEach((dataSet) => {
        const button = screen.getByText(dataSet);
        expect(button).toHaveClass("text-xs text-slate-600 sm:text-sm");
      });
  });

  test("ボタンクリック時にonSelectが呼ばれること", () => {
    const onSelect = jest.fn();
    render(<DataSetSelector onSelect={onSelect} selectedDataSet="" />);
    const button = screen.getByText("年少人口");
    fireEvent.click(button);
    expect(onSelect).toHaveBeenCalledWith("年少人口");
  });
});
