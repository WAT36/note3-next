// ブログ記事をOpenAI APIでレビューし、結果をtools/review/results/に保存する
// --copyを付けるとAPIは呼ばず、プロンプトと記事をクリップボードにコピーする（ChatGPT画面に貼り付ける用）
// 使い方: pnpm review <記事ファイル or 記事名> [--prompt <プロンプトファイル>] [--copy]
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
import * as dotenv from "dotenv";
import matter from "gray-matter";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "../..");
const POSTS_DIR = path.join(ROOT_DIR, "_posts");
const RESULTS_DIR = path.join(__dirname, "results");
const DEFAULT_PROMPT_PATH = path.join(__dirname, "prompts/default.md");
dotenv.config({ path: path.join(ROOT_DIR, ".env") });

// モデルは環境変数OPENAI_MODELで変更可能
const DEFAULT_MODEL = "gpt-5-mini";
const MODEL = process.env.OPENAI_MODEL || DEFAULT_MODEL;

const exitWithError = (message: string): never => {
  console.error(`エラー: ${message}`);
  process.exit(1);
};

// 引数を解析する
const parseArgs = (args: string[]) => {
  let target: string | undefined;
  let promptPath = DEFAULT_PROMPT_PATH;
  let copy = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--prompt") {
      promptPath = path.resolve(args[++i] ?? exitWithError("--prompt にファイルを指定してください"));
    } else if (args[i] === "--copy") {
      copy = true;
    } else {
      target = args[i];
    }
  }
  if (!target) {
    exitWithError("レビューする記事を指定してください\n使い方: pnpm review <記事ファイル or 記事名> [--prompt <プロンプトファイル>] [--copy]");
  }
  return { target: target!, promptPath, copy };
};

// パス指定・記事名指定のどちらでも_posts下の記事ファイルを特定する
const resolvePostPath = (target: string) => {
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

// 実行日時をYYYYMMDD-HHmmss形式にする
const formatTimestamp = (date: Date) => {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-` +
    `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`
  );
};

const main = async () => {
  const { target, promptPath, copy } = parseArgs(process.argv.slice(2));
  // 入力ファイルの存在確認を最初に行う
  const postPath = resolvePostPath(target);
  if (!fs.existsSync(promptPath)) exitWithError(`プロンプトファイルが見つかりません: ${promptPath}`);
  if (!copy && !process.env.OPENAI_API_KEY) exitWithError(".env に OPENAI_API_KEY を設定してください");

  const slug = path.basename(postPath, ".md");
  const { data, content } = matter(fs.readFileSync(postPath, "utf-8"));
  if (!content.trim()) exitWithError(`記事の本文が空です（Front Matterのみ）: ${path.relative(ROOT_DIR, postPath)}`);
  const title: string = data.title ?? "";
  const tags: string = Array.isArray(data.tag) ? data.tag.join(", ") : "";

  // プロンプト内の{{title}}等を記事情報で置換する
  const instructions = fs
    .readFileSync(promptPath, "utf-8")
    .replaceAll("{{title}}", title)
    .replaceAll("{{excerpt}}", data.excerpt ?? "")
    .replaceAll("{{tags}}", tags);
  const input = `# 記事情報\n- タイトル: ${title}\n- 概要: ${data.excerpt ?? ""}\n- タグ: ${tags}\n\n# 記事本文\n\n${content}`;

  // --copy: プロンプトと記事をまとめてクリップボードへコピーして終了する
  if (copy) {
    const text = `${instructions.trimEnd()}\n\n---\n\n${input}`;
    const result = spawnSync("pbcopy", { input: text });
    if (result.error || result.status !== 0) exitWithError("クリップボードへのコピーに失敗しました（pbcopyが使えるか確認してください）");
    console.log(`クリップボードにコピーしました (記事: ${path.relative(ROOT_DIR, postPath)}, 約${text.length.toLocaleString()}字)`);
    console.log("ChatGPTに貼り付けて送信してください");
    return;
  }

  console.log(`レビュー中... (記事: ${path.relative(ROOT_DIR, postPath)}, モデル: ${MODEL})`);
  const client = new OpenAI({ timeout: 5 * 60 * 1000 });
  const response = await client.responses.create({ model: MODEL, instructions, input });

  const now = new Date();
  const header = [
    `# レビュー結果: ${title}`,
    "",
    `- 対象記事: ${path.relative(ROOT_DIR, postPath)}`,
    `- モデル: ${response.model}`,
    `- プロンプト: ${path.relative(ROOT_DIR, promptPath)}`,
    `- 実行日時: ${now.toLocaleString("ja-JP")}`,
    `- トークン: 入力 ${response.usage?.input_tokens ?? "-"} / 出力 ${response.usage?.output_tokens ?? "-"}`,
    "",
    "---",
    "",
  ].join("\n");

  fs.mkdirSync(RESULTS_DIR, { recursive: true });
  const resultPath = path.join(RESULTS_DIR, `${slug}_${formatTimestamp(now)}.md`);
  fs.writeFileSync(resultPath, header + response.output_text + "\n");
  console.log(`レビュー結果を保存しました: ${path.relative(ROOT_DIR, resultPath)}`);
};

main().catch((error) => {
  exitWithError(error instanceof Error ? error.message : String(error));
});
