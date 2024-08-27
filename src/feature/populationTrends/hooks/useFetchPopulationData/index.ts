import { useEffect, useState, useRef } from "react";

interface PopulationData {
  year: number;
  value: number;
}

interface PopulationDataSet {
  label: string;
  data: PopulationData[];
}

interface ApiResponse {
  result: {
    data: PopulationDataSet[];
  };
}

// 選択された都道府県の人口データを取得するカスタムフック
const useFetchPopulationData = (selectedPrefs: number[], selectedDataSet: string) => {
  // 人口データの状態を管理するステート
  const [populationData, setPopulationData] = useState<
    { prefCode: number; data: PopulationData[] }[]
  >([]);

  // APIから取得したデータをキャッシュするためのMapを参照するためのuseRef
  const cachedData = useRef<Map<number, ApiResponse>>(new Map());

  useEffect(() => {
    const fetchData = async () => {
      // 都道府県が選択されていない場合、既存のデータがあるならクリアする
      if (selectedPrefs.length === 0) {
        if (populationData.length > 0) {
          setPopulationData([]); // データをクリア
        }
        return;
      }

      // 新たに選択されたが、まだキャッシュされていない都道府県をフィルタリング
      const newPrefs = selectedPrefs.filter((prefCode) => !cachedData.current.has(prefCode));

      // 新しい都道府県がある場合、APIからデータを取得
      if (newPrefs.length > 0) {
        const prefCodes = newPrefs.join(",");
        const response = await fetch(`/api/population?prefCodes=${prefCodes}`);
        if (!response.ok) {
          throw new Error(`都道府県コード ${prefCodes} の人口データの取得に失敗しました`);
        }
        const results = (await response.json()) as ApiResponse[];

        // 取得したデータをキャッシュに保存
        results.forEach((result, index) => {
          const prefCode = newPrefs[index];
          if (prefCode !== undefined) {
            cachedData.current.set(prefCode, result);
          }
        });
      }

      // キャッシュからデータを取得し、チャート表示用のデータを作成
      const updatedData = selectedPrefs.map((prefCode) => {
        const cachedResult = cachedData.current.get(prefCode);
        if (cachedResult) {
          const data =
            cachedResult.result.data.find((d) => d.label === selectedDataSet)?.data || [];
          return { prefCode, data };
        }
        // キャッシュにデータがない場合は空のデータを返す
        return { prefCode, data: [] };
      });

      // データが実際に変更されたかを確認し、変更があった場合のみステートを更新
      setPopulationData((prevData) => {
        const hasDataChanged = JSON.stringify(prevData) !== JSON.stringify(updatedData);
        return hasDataChanged ? updatedData : prevData;
      });
    };

    // 非同期関数を実行し、エラーハンドリングを行う
    fetchData().catch((error) => console.error(error));

    // 必要な依存関係のみを依存配列に指定する
  }, [selectedPrefs, selectedDataSet, populationData.length]);

  // 最終的な人口データを返す
  return populationData;
};

export default useFetchPopulationData;
