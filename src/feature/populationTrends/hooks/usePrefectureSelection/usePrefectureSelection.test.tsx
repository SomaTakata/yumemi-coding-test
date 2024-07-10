import { renderHook, act } from "@testing-library/react-hooks";

import { Prefecture } from "@/types/prefecture";
import { Regions } from "@/types/region";
import usePrefectureSelection from ".";

// モックデータ
const mockPrefectures: Prefecture[] = [
  { prefCode: 1, prefName: "北海道" },
  { prefCode: 2, prefName: "青森県" },
  { prefCode: 3, prefName: "岩手県" },
  { prefCode: 4, prefName: "宮城県" },
];

const mockRegions: Regions = {
  "北海道・東北": [1, 2, 3, 4],
};

describe("usePrefectureSelection フック", () => {
  jest.mock("@/data/regions", () => mockRegions);
  it("初期状態で選択された都道府県がないこと", () => {
    const { result } = renderHook(() => usePrefectureSelection(mockPrefectures));
    expect(result.current.selectedPrefs).toEqual([]);
  });

  it("都道府県を選択したときに状態が更新されること", () => {
    const { result } = renderHook(() => usePrefectureSelection(mockPrefectures));

    act(() => {
      result.current.togglePrefecture(1);
    });

    expect(result.current.selectedPrefs).toEqual([{ prefCode: 1, prefName: "北海道" }]);

    act(() => {
      result.current.togglePrefecture(1);
    });

    expect(result.current.selectedPrefs).toEqual([]);
  });

  it("地域を選択したときに状態が更新されること", () => {
    const { result } = renderHook(() => usePrefectureSelection(mockPrefectures));

    act(() => {
      result.current.toggleRegion("北海道・東北");
    });

    expect(result.current.selectedPrefs).toEqual(mockPrefectures);

    act(() => {
      result.current.toggleRegion("北海道・東北");
    });

    expect(result.current.selectedPrefs).toEqual([]);
  });

  it("地域内の一部の都道府県を選択したときに地域を選択したときの動作を確認", () => {
    const { result } = renderHook(() => usePrefectureSelection(mockPrefectures));

    act(() => {
      result.current.togglePrefecture(1);
      result.current.togglePrefecture(2);
    });

    expect(result.current.selectedPrefs).toEqual([
      { prefCode: 1, prefName: "北海道" },
      { prefCode: 2, prefName: "青森県" },
    ]);

    act(() => {
      result.current.toggleRegion("北海道・東北");
    });

    expect(result.current.selectedPrefs).toEqual(mockPrefectures);

    act(() => {
      result.current.toggleRegion("北海道・東北");
    });

    expect(result.current.selectedPrefs).toEqual([]);
  });
});
