import { join } from "path";

import { Administrator } from "../interfaces/author";

export const EXAMPLE_PATH = "blog-starter";
export const CMS_NAME = "Markdown";
export const HOME_OG_IMAGE_URL =
  "https://og-image.vercel.app/Next.js%20Blog%20Starter%20Example.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg";
export const TITLE = "WAT Note(III).";
export const ADMINISTRATOR: Administrator = {
  name: "Tatsuroh Wakasugi",
  nickname: "WAT",
};

export const NOTES_DIR = join(process.cwd(), "_notes");

export const DIR_NAME = {
  "notes/container": "コンテナ",
  "notes/frontend": "フロントエンド",
  "notes/programming": "プログラミング",

  "frontend/001_html": "HTML",
  "frontend/002_css": "CSS",
  "frontend/003_javascript": "Javascript",
  "frontend/004_webTech": "その他のWeb関連技術",

  "programming/001_stdio": "標準入力・出力",
  "programming/002_string": "文字列",
  "programming/003_number": "数値",

  "programming/003_number/001_log": "対数",
  "programming/003_number/002_round": "四捨五入",
  "programming/003_number/003_operator": "演算子",
};
