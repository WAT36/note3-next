import { useState } from "react";
import { PROGRAMMING_LANGUAGE_NAME } from "../../../lib/constants";

const ProgrammingLanguageSelector = () => {
  // localStorageから初期値を取得、デフォルトは最初の言語
  const [programmingLanguage, setProgrammingLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("programmingLanguage");
      return saved
        ? { language: saved }
        : { language: PROGRAMMING_LANGUAGE_NAME[0] };
    }
    return { language: PROGRAMMING_LANGUAGE_NAME[0] };
  });

  // 言語が変更されたときにlocalStorageに保存
  const handleLanguageChange = (newLanguage: string) => {
    setProgrammingLanguage({ language: newLanguage });
    if (typeof window !== "undefined") {
      localStorage.setItem("programmingLanguage", newLanguage);
    }
  };

  return (
    <div className="inline-block float-right mx-3 my-4">
      <select
        id="programmingLanguageSelector"
        className="text-black"
        name="programmingLanguage"
        value={programmingLanguage.language}
        onChange={(e) => {
          handleLanguageChange(e.target.value);
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
