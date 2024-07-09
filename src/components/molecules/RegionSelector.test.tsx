import { render, screen } from "@testing-library/react";
import React from "react";

import regions from "@/data/regions";
import { Prefecture } from "@/types";

// 相対パスに修正

import RegionSelector from "./RegionSelector";

// Mock the child components
jest.mock("./LoadingPlaceholder", () => () => <div>Loading...</div>);
jest.mock(
  "../organisms/RegionList", // 相対パスに修正
  () =>
    ({ region, prefectures, selectedPrefs, togglePrefecture, toggleRegion }: any) => (
      <div>
        RegionList Component for {region}
        {prefectures.map((pref: Prefecture) => (
          <div key={pref.prefCode}>{pref.prefName}</div>
        ))}
      </div>
    ),
);

describe("RegionSelectorコンポーネントのテスト", () => {
  const mockTogglePrefecture = jest.fn();
  const mockToggleRegion = jest.fn();
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 13, prefName: "東京都" },
    { prefCode: 27, prefName: "大阪府" },
  ];
  const selectedPrefs = [1, 13];

  test("ローディング中にLoadingPlaceholderが表示されること", () => {
    render(
      <RegionSelector
        loading={true}
        prefectures={mockPrefectures}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("ローディング完了後にRegionListが表示されること", () => {
    render(
      <RegionSelector
        loading={false}
        prefectures={mockPrefectures}
        selectedPrefs={selectedPrefs}
        togglePrefecture={mockTogglePrefecture}
        toggleRegion={mockToggleRegion}
      />,
    );

    // 地域リストの表示を確認
    Object.keys(regions).forEach((region) => {
      expect(screen.getByText(`RegionList Component for ${region}`)).toBeInTheDocument();
    });

    // 都道府県名の表示を確認
    mockPrefectures.forEach((pref) => {
      expect(screen.getByText(pref.prefName)).toBeInTheDocument();
    });
  });
});
