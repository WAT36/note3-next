import { useRecoilState } from "recoil";
import { programmingLanguageState } from "../../../atoms/ProgrammingLanguage";
import { PROGRAMMING_LANGUAGE_NAME } from "../../../lib/constants";

const ProgrammingLanguageSelector = () => {
  // Recoilのステートとして利用する(localStorageへの保存はatom側で行う)
  const [programmingLanguage, setProgrammingLanguage] = useRecoilState(
    programmingLanguageState
  );

  return (
    <div className="inline-block float-right mx-3 my-4">
      <select
        id="programmingLanguageSelector"
        className="text-black"
        name="programmingLanguage"
        value={programmingLanguage.language}
        onChange={(e) => {
          setProgrammingLanguage({ language: e.target.value });
        }}
      >
        {PROGRAMMING_LANGUAGE_NAME.map((pl) => (
          <option key={pl} value={pl}>
            {pl}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProgrammingLanguageSelector;
