import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

import { Prefecture } from "@/types";

import RegionList from "./RegionList";

// Mock the child components
jest.mock("../molecules/RegionToggleButton", () => ({ allSelected, region, toggleRegion }: any) => (
  <button onClick={() => toggleRegion(region)}>{allSelected ? "全て選択解除" : "全て選択"}</button>
));

jest.mock("../molecules/PrefectureButton", () => ({ name, onClick, selected }: any) => (
  <button className={selected ? "selected" : ""} onClick={onClick}>
    {name}
  </button>
));

describe("RegionListコンポーネントのテスト", () => {
  const mockTogglePrefecture = jest.fn();
  const mockToggleRegion = jest.fn();
  const region = "関東";
  const prefectures: Prefecture[] = [
    { prefCode: 13, prefName: "東京都" },
    { prefCode: 14, prefName: "神奈川県" },
  ];
  const selectedPrefs = [13];

  test("地域名が正しく表示されること", () => {
    render(
      <RegionList
        prefectures={prefectures}
        region={region}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText(region)).toBeInTheDocument();
  });

  test("RegionToggleButtonが正しく表示されること", () => {
    render(
      <RegionList
        prefectures={prefectures}
        region={region}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText("全て選択")).toBeInTheDocument();
  });

  test("PrefectureButtonが正しく表示されること", () => {
    render(
      <RegionList
        prefectures={prefectures}
        region={region}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText("東京都")).toBeInTheDocument();
    expect(screen.getByText("神奈川県")).toBeInTheDocument();
  });

  test("PrefectureButtonが選択状態を反映すること", () => {
    render(
      <RegionList
        prefectures={prefectures}
        region={region}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText("東京都")).toHaveClass("selected");
    expect(screen.getByText("神奈川県")).not.toHaveClass("selected");
  });

  test("RegionToggleButtonをクリックしたときにtoggleRegionが呼ばれること", () => {
    render(
      <RegionList
        prefectures={prefectures}
        region={region}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    fireEvent.click(screen.getByText("全て選択"));
    expect(mockToggleRegion).toHaveBeenCalledWith(region);
  });

  test("PrefectureButtonをクリックしたときにtogglePrefectureが呼ばれること", () => {
    render(
      <RegionList
        prefectures={prefectures}
        region={region}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    fireEvent.click(screen.getByText("東京都"));
    expect(mockTogglePrefecture).toHaveBeenCalledWith(13);
    fireEvent.click(screen.getByText("神奈川県"));
    expect(mockTogglePrefecture).toHaveBeenCalledWith(14);
  });
});
