import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

import RegionToggleButton from "./RegionToggleButton";

// Mock the Button and Icon components
jest.mock("../atoms/Button", () => ({ children, onClick, className }: any) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
));

jest.mock("../atoms/Icon", () => ({ IconComponent, className }: any) => (
  <div className={className}>{IconComponent === FaCheckCircle ? "FaCheckCircle" : "FaCircle"}</div>
));

describe("RegionToggleButtonコンポーネントのテスト", () => {
  const region = "関東";
  const mockToggleRegion = jest.fn();

  test("ボタンが正しく表示されること", () => {
    render(
      <RegionToggleButton allSelected={false} region={region} toggleRegion={mockToggleRegion} />,
    );
    expect(screen.getByText("全て")).toBeInTheDocument();
  });

  test("未選択状態のアイコンとクラスが正しく適用されること", () => {
    render(
      <RegionToggleButton allSelected={false} region={region} toggleRegion={mockToggleRegion} />,
    );
    expect(screen.getByText("FaCircle")).toBeInTheDocument();
    expect(screen.getByText("全て")).toHaveClass("text-xs text-slate-600 sm:text-sm");
  });

  test("選択状態のアイコンとクラスが正しく適用されること", () => {
    render(
      <RegionToggleButton allSelected={true} region={region} toggleRegion={mockToggleRegion} />,
    );
    expect(screen.getByText("FaCheckCircle")).toBeInTheDocument();
    expect(screen.getByText("全て")).toHaveClass("text-xs text-blue-600 sm:text-sm");
  });

  test("ボタンクリック時にtoggleRegionが呼ばれること", () => {
    render(
      <RegionToggleButton allSelected={false} region={region} toggleRegion={mockToggleRegion} />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggleRegion).toHaveBeenCalledWith(region);
  });
});
