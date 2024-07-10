import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import { IoCloseCircle } from "react-icons/io5";

import { Prefecture } from "@/types";

import SelectedPrefectures from ".";

// Mock the Button and Icon components
jest.mock("@/shared/components/Button", () => ({ children, onClick, className }: any) => (
  <button className={className} onClick={onClick}>
    {children}
  </button>
));

jest.mock("@/shared/components/Icon", () => ({ IconComponent, className, size }: any) => (
  <div className={className}>{IconComponent === IoCloseCircle ? "IoCloseCircle" : "Icon"}</div>
));

describe("SelectedPrefecturesコンポーネントのテスト", () => {
  const mockTogglePrefecture = jest.fn();
  const mockSelectedPrefs: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 13, prefName: "東京都" },
  ];

  test("選択された都道府県がない場合、「選択なし」が表示されること", () => {
    render(<SelectedPrefectures selectedPrefs={[]} togglePrefecture={mockTogglePrefecture} />);
    expect(screen.getByText("選択なし")).toBeInTheDocument();
  });

  test("選択された都道府県が表示されること", () => {
    render(
      <SelectedPrefectures
        selectedPrefs={mockSelectedPrefs}
        togglePrefecture={mockTogglePrefecture}
      />,
    );
    expect(screen.getByText("北海道")).toBeInTheDocument();
    expect(screen.getByText("東京都")).toBeInTheDocument();
  });

  test("選択された都道府県の削除ボタンが表示されること", () => {
    render(
      <SelectedPrefectures
        selectedPrefs={mockSelectedPrefs}
        togglePrefecture={mockTogglePrefecture}
      />,
    );
    expect(screen.getAllByText("IoCloseCircle")).toHaveLength(2);
  });

  test("削除ボタンをクリックしたときにtogglePrefectureが呼ばれること", () => {
    render(
      <SelectedPrefectures
        selectedPrefs={mockSelectedPrefs}
        togglePrefecture={mockTogglePrefecture}
      />,
    );
    fireEvent.click(screen.getByText("北海道"));
    expect(mockTogglePrefecture).toHaveBeenCalledWith(1);
    fireEvent.click(screen.getByText("東京都"));
    expect(mockTogglePrefecture).toHaveBeenCalledWith(13);
  });
});
