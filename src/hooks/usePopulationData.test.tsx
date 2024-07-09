import { renderHook, act } from "@testing-library/react-hooks";
import { Prefecture } from "../types";
import usePopulationData from "./usePopulationData";

// モックデータ
const selectedPrefs: Prefecture[] = [{ prefCode: 1, prefName: "北海道" }];
const populationData = {
  result: {
    data: [
      {
        label: "総人口",
        data: [
          { year: 1960, value: 5000000 },
          { year: 1965, value: 5100000 },
        ],
      },
      {
        label: "年少人口",
        data: [
          { year: 1960, value: 1500000 },
          { year: 1965, value: 1400000 },
        ],
      },
    ],
  },
};

// モックされたfetch関数
const mockFetchResponse = (data: any) =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(data),
  } as Response);

describe("usePopulationData フック", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => mockFetchResponse(populationData));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("初期状態でチャートデータが空であること", () => {
    const { result } = renderHook(() => usePopulationData(selectedPrefs, "総人口"));
    expect(result.current).toEqual([]);
  });

  it("APIデータが正常にフェッチされた後にチャートデータが設定されること", async () => {
    const { result, waitFor } = renderHook(() => usePopulationData(selectedPrefs, "総人口"));

    await waitFor(() => result.current.length > 0);

    expect(result.current).toEqual([
      {
        prefName: "北海道",
        data: [
          { year: 1960, value: 5000000 },
          { year: 1965, value: 5100000 },
        ],
      },
    ]);
  });

  it("キャッシュされたデータが正しく使用されること", async () => {
    const { result, waitFor, rerender } = renderHook(
      ({ prefs, dataSet }) => usePopulationData(prefs, dataSet),
      {
        initialProps: { prefs: selectedPrefs, dataSet: "総人口" },
      },
    );

    await waitFor(() => result.current.length > 0);

    // 再レンダリングしてキャッシュが使用されるか確認
    rerender({ prefs: selectedPrefs, dataSet: "総人口" });

    // キャッシュが使用されていれば、fetchは呼ばれない
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("新たなデータセットを選択した場合、チャートデータが更新されること", async () => {
    const { result, waitFor, rerender } = renderHook(
      ({ prefs, dataSet }) => usePopulationData(prefs, dataSet),
      {
        initialProps: { prefs: selectedPrefs, dataSet: "総人口" },
      },
    );

    await waitFor(() => result.current.length > 0);

    // データセットを変更して再レンダリング
    await act(async () => {
      rerender({ prefs: selectedPrefs, dataSet: "年少人口" });
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => result.current.some((data) => data.data.some((d) => d.value === 1400000)));

    expect(result.current).toEqual([
      {
        prefName: "北海道",
        data: [
          { year: 1960, value: 1500000 },
          { year: 1965, value: 1400000 },
        ],
      },
    ]);
  });
});
