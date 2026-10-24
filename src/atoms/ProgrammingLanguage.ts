import { atom, AtomEffect } from "recoil";
import { PROGRAMMING_LANGUAGE_NAME } from "../lib/constants";

type ProgrammingLanguage = { language: string };

const STORAGE_KEY = "programmingLanguage";

// localStorageと同期させる(保存済みの言語を初期値にし、変更時に保存)
const localStorageEffect: AtomEffect<ProgrammingLanguage> = ({
  setSelf,
  onSet,
}) => {
  if (typeof window === "undefined") return;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && PROGRAMMING_LANGUAGE_NAME.includes(saved)) {
    setSelf({ language: saved });
  }
  onSet((newValue) => {
    localStorage.setItem(STORAGE_KEY, newValue.language);
  });
};

export const programmingLanguageState = atom<ProgrammingLanguage>({
  key: "ProgrammingLanguage",
  default: {
    language: PROGRAMMING_LANGUAGE_NAME[0],
  },
  effects: [localStorageEffect],
});
