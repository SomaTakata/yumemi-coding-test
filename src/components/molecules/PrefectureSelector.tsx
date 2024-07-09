import RegionSelector from "@/components/molecules/RegionSelector";
import SelectedPrefectures from "@/components/molecules/SelectedPrefectures";

import { Prefecture } from "@/types";

interface PrefectureSelectorProps {
  selectedPrefs: Prefecture[];
  togglePrefecture: (prefCode: number) => void;
  toggleRegion: (region: string) => void;
  prefectures: Prefecture[];
  loading: boolean;
}

const PrefectureSelector: React.FC<PrefectureSelectorProps> = ({
  selectedPrefs,
  togglePrefecture,
  toggleRegion,
  prefectures,
  loading,
}) => {
  return (
    <>
      <div className="flex justify-start border-l-4 pl-4 text-sm">都道府県を選択してください</div>
      <RegionSelector
        loading={loading}
        prefectures={prefectures}
        selectedPrefs={selectedPrefs.map((pref) => pref.prefCode)}
        togglePrefecture={togglePrefecture}
        toggleRegion={toggleRegion}
      />
      <SelectedPrefectures selectedPrefs={selectedPrefs} togglePrefecture={togglePrefecture} />
    </>
  );
};

export default PrefectureSelector;
