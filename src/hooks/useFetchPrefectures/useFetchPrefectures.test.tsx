import { renderHook } from "@testing-library/react-hooks";
import { act } from "react";

import useFetchPrefectures from "../../hooks/useFetchPrefectures";

// モックのAPIレスポンスデータ
const mockPrefectures = {
  message: null,
  result: [
    { prefCode: 1, prefName: "北海道" },
    { prefCode: 2, prefName: "青森県" },
  ],
};

// グローバルフェッチ関数のモック
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockPrefectures),
  }),
) as jest.Mock;

describe("useFetchPrefectures フック", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("都道府県データを正しくフェッチする", async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetchPrefectures());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.prefectures).toEqual(mockPrefectures.result);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it("フェッチが失敗した場合にエラーメッセージが設定されること", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch prefectures")),
    );

    const { result, waitForNextUpdate } = renderHook(() => useFetchPrefectures());

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.prefectures).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Failed to fetch prefectures");
  });
});
