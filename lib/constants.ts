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
export const ALT_IMAGE = "/assets/blog/altImage.png";

export const NOTES_DIR = join(process.cwd(), "_notes");

export const DIR_NAME = {
  posts: "Blog Posts",
  notes: "Notes",

  container: "コンテナ",
  frontend: "フロントエンド",
  programming: "プログラミング",

  "001_html": "HTML",
  "002_css": "CSS",
  "003_javascript": "Javascript",
  "004_webTech": "その他のWeb関連技術",

  "001_stdio": "標準入力・出力",
  "002_string": "文字列",
  "003_number": "数値",
  "004_list": "配列・リスト",
  "005_control": "制御構文",
  "006_map": "辞書(Map)",
  "007_class_func": "クラス・関数(メソッド)",
  "008_exception": "例外処理",
  "009_file": "ファイル処理",
  "099_other": "その他",
  "101_data_process": "グラフ・データ処理",
  "102_machine_learning": "機械学習",

  "001_log": "対数",
  "002_round": "四捨五入",
  "003_operator": "演算子",

  "1021_supervised_learning": "教師あり学習",
  "1022_unsupervised_learning": "教師なし学習",
  "1023_deep_learning": "深層学習(ディープラーニング)",

  "10211_regression": "回帰",
  "10212_classification": "分類",
};
