import { useSetRecoilState } from "recoil";
import { programmingLanguageState } from "../atoms/ProgrammingLanguage";
import { PROGRAMMING_LANGUAGE_NAME } from "../lib/constants";

type Props = {};

const ProgrammingLanguageSelector = ({}: Props) => {
  // Recoilの Atoms を呼び出して定義
  const setProgrammingLanguage = useSetRecoilState(programmingLanguageState);
  return (
    <div className="inline-block float-right mx-3 my-4">
      <select
        className="text-black"
        name="programmingLanguage"
        onChange={(e) => {
          setProgrammingLanguage({ language: e.target.value });
        }}
      >
        {PROGRAMMING_LANGUAGE_NAME.map((pl) => {
          return <option value={pl}>{pl}</option>;
        })}
      </select>
    </div>
  );
};

export default ProgrammingLanguageSelector;
