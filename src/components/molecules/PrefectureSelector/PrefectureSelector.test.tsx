import { render, screen } from "@testing-library/react";
import React from "react";

import { Prefecture } from "@/types";

import PrefectureSelector from ".";

// 相対パスに修正
// 相対パスに修正

// Mock the child components
jest.mock(
  "../molecules/RegionSelector", // 相対パスに修正
  () =>
    ({ loading, prefectures, selectedPrefs, togglePrefecture, toggleRegion }: any) => (
      <div>
        RegionSelector Component
        {loading && <div>Loading...</div>}
        {prefectures.map((pref: Prefecture) => (
          <div key={pref.prefCode}>{pref.prefName}</div>
        ))}
      </div>
    ),
);

jest.mock(
  "../molecules/SelectedPrefectures", // 相対パスに修正
  () =>
    ({ selectedPrefs, togglePrefecture }: any) => (
      <div>
        SelectedPrefectures Component
        {selectedPrefs.map((pref: Prefecture) => (
          <div key={pref.prefCode}>{pref.prefName}</div>
        ))}
      </div>
    ),
);

describe("PrefectureSelectorコンポーネントのテスト", () => {
  const mockTogglePrefecture = jest.fn();
  const mockToggleRegion = jest.fn();
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 13, prefName: "東京都" },
    { prefCode: 27, prefName: "大阪府" },
  ];
  const selectedPrefs = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 13, prefName: "東京都" },
  ];

  test("ヘッダーのテキストが表示されること", () => {
    render(
      <PrefectureSelector
        loading={false}
        prefectures={mockPrefectures}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText("都道府県を選択してください")).toBeInTheDocument();
  });

  test("RegionSelectorコンポーネントが正しく表示されること", () => {
    render(
      <PrefectureSelector
        loading={false}
        prefectures={mockPrefectures}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText("RegionSelector Component")).toBeInTheDocument();
    mockPrefectures.forEach((pref) => {
      const elements = screen.getAllByText(pref.prefName);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test("SelectedPrefecturesコンポーネントが正しく表示されること", () => {
    render(
      <PrefectureSelector
        loading={false}
        prefectures={mockPrefectures}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText("SelectedPrefectures Component")).toBeInTheDocument();
    selectedPrefs.forEach((pref) => {
      const elements = screen.getAllByText(pref.prefName);
      expect(elements.length).toBeGreaterThan(0);
    });
  });

  test("ローディング中にLoadingPlaceholderが表示されること", () => {
    render(
      <PrefectureSelector
        loading={true}
        prefectures={mockPrefectures}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
