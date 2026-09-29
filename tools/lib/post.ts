// tools配下のAIスクリプト（review / meta）で共通して使う処理
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const ROOT_DIR = path.join(__dirname, "../..");
export const POSTS_DIR = path.join(ROOT_DIR, "_posts");
dotenv.config({ path: path.join(ROOT_DIR, ".env") });

// モデルは環境変数OPENAI_MODELで変更可能
const DEFAULT_MODEL = "gpt-5-mini";
export const MODEL = process.env.OPENAI_MODEL || DEFAULT_MODEL;

export const exitWithError = (message: string): never => {
  console.error(`エラー: ${message}`);
  process.exit(1);
};

// パス指定・記事名指定のどちらでも_posts下の記事ファイルを特定する
export const resolvePostPath = (target: string) => {
  // パスとして指定された場合はそのパスのみ、記事名の場合は_posts下も探す
  const candidates = target.includes("/")
    ? [path.resolve(target)]
    : [path.resolve(target), path.join(POSTS_DIR, target), path.join(POSTS_DIR, `${target}.md`)];
  const found = candidates.find((p) => fs.existsSync(p) && fs.statSync(p).isFile());
  if (!found) {
    const searched = [...new Set(candidates)].map((p) => `  - ${path.relative(ROOT_DIR, p)}`).join("\n");
    exitWithError(`記事ファイルが見つかりません: ${target}\n以下を探しました:\n${searched}`);
  }
  if (!found!.startsWith(POSTS_DIR + path.sep)) exitWithError(`_posts下の記事ファイルを指定してください: ${found}`);
  return found!;
};

// テキストをクリップボードにコピーする（macOSのpbcopyを使用）
export const copyToClipboard = (text: string) => {
  const result = spawnSync("pbcopy", { input: text });
  if (result.error || result.status !== 0) exitWithError("クリップボードへのコピーに失敗しました（pbcopyが使えるか確認してください）");
};
