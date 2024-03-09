import { atom } from "recoil";

export const programmingLanguageState = atom({
  key: "ProgrammingLanguage",
  default: {
    language: "java",
  },
});
