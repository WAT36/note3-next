// ブログ記事の本文からOpenAI APIでタイトル（title）と概略文（excerpt）を生成し、Front Matterを更新する
// --copyを付けるとAPIは呼ばず、プロンプトと記事をクリップボードにコピーする（ChatGPT画面に貼り付ける用）
// 使い方: pnpm meta <記事ファイル or 記事名> [--prompt <プロンプトファイル>] [--copy] [--yes]
import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import OpenAI from "openai";
import { MODEL, ROOT_DIR, copyToClipboard, exitWithError, resolvePostPath } from "../lib/post";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DEFAULT_PROMPT_PATH = path.join(__dirname, "prompts/default.md");
const EXCERPT_MAX_LENGTH = 100;
const USAGE = "使い方: pnpm meta <記事ファイル or 記事名> [--prompt <プロンプトファイル>] [--copy] [--yes]";

// --copy時にプロンプト末尾へ付ける出力形式の指示（API時はJSON Schemaで形式を指定する）
const COPY_OUTPUT_FORMAT = `
## 出力形式

Front Matterにそのまま貼り付けられるよう、以下の2行のみを出力してください（説明文は不要）。

\`\`\`yaml
title: "タイトル"
excerpt: "概略文"
\`\`\`
`;

type Meta = { title: string; excerpt: string };

// 引数を解析する
const parseArgs = (args: string[]) => {
  let target: string | undefined;
  let promptPath = DEFAULT_PROMPT_PATH;
  let copy = false;
  let yes = false;
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--prompt") {
      promptPath = path.resolve(args[++i] ?? exitWithError("--prompt にファイルを指定してください"));
    } else if (args[i] === "--copy") {
      copy = true;
    } else if (args[i] === "--yes" || args[i] === "-y") {
      yes = true;
    } else {
      target = args[i];
    }
  }
  if (!target) exitWithError(`対象の記事を指定してください\n${USAGE}`);
  return { target: target!, promptPath, copy, yes };
};

// 文字数を数える（絵文字などのサロゲートペアも1文字として数える）
const countChars = (text: string) => [...text].length;

// Front Matter内の指定キーの行（複数行の値も含む）を置き換える。キーがなければ末尾に追加する
const replaceFrontMatterValue = (frontMatter: string, key: string, value: string) => {
  const line = `${key}: ${JSON.stringify(value)}`;
  const pattern = new RegExp(`^${key}:[^\\n]*(\\n[ \\t]+[^\\n]*)*`, "m");
  return pattern.test(frontMatter) ? frontMatter.replace(pattern, () => line) : `${frontMatter}\n${line}`;
};

// title・excerptの行だけを書き換え、それ以外のFront Matterの記述はそのまま残す
const updateFrontMatter = (source: string, meta: Meta) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) exitWithError("Front Matterが見つかりません");
  let frontMatter = match![1];
  frontMatter = replaceFrontMatterValue(frontMatter, "title", meta.title);
  frontMatter = replaceFrontMatterValue(frontMatter, "excerpt", meta.excerpt);
  return source.replace(match![1], () => frontMatter);
};

const confirm = async (question: string) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await rl.question(question);
  rl.close();
  return /^y(es)?$/i.test(answer.trim());
};

const main = async () => {
  const { target, promptPath, copy, yes } = parseArgs(process.argv.slice(2));
  // 入力ファイルの存在確認を最初に行う
  const postPath = resolvePostPath(target);
  if (!fs.existsSync(promptPath)) exitWithError(`プロンプトファイルが見つかりません: ${promptPath}`);
  if (!copy && !process.env.OPENAI_API_KEY) exitWithError(".env に OPENAI_API_KEY を設定してください");

  const source = fs.readFileSync(postPath, "utf-8");
  const { data, content } = matter(source);
  if (!content.trim()) exitWithError(`記事の本文が空です（Front Matterのみ）: ${path.relative(ROOT_DIR, postPath)}`);
  const current: Meta = { title: data.title ?? "", excerpt: data.excerpt ?? "" };

  const instructions = fs.readFileSync(promptPath, "utf-8");
  const input = `# 現在の値\n- タイトル: ${current.title || "（未設定）"}\n- 概略文: ${current.excerpt || "（未設定）"}\n\n# 記事本文\n\n${content}`;

  // --copy: プロンプトと記事をまとめてクリップボードへコピーして終了する
  if (copy) {
    const text = `${instructions.trimEnd()}\n${COPY_OUTPUT_FORMAT}\n---\n\n${input}`;
    copyToClipboard(text);
    console.log(`クリップボードにコピーしました (記事: ${path.relative(ROOT_DIR, postPath)}, 約${text.length.toLocaleString()}字)`);
    console.log("ChatGPTに貼り付けて送信し、出力されたtitle・excerptを記事のFront Matterに反映してください");
    return;
  }

  console.log(`生成中... (記事: ${path.relative(ROOT_DIR, postPath)}, モデル: ${MODEL})`);
  const client = new OpenAI({ timeout: 5 * 60 * 1000 });
  const response = await client.responses.create({
    model: MODEL,
    instructions,
    input,
    text: {
      format: {
        type: "json_schema",
        name: "post_meta",
        strict: true,
        schema: {
          type: "object",
          properties: {
            title: { type: "string", description: "記事のタイトル" },
            excerpt: { type: "string", description: `記事の概略文（${EXCERPT_MAX_LENGTH}字以内）` },
          },
          required: ["title", "excerpt"],
          additionalProperties: false,
        },
      },
    },
  });
  const generated: Meta = JSON.parse(response.output_text);
  generated.title = generated.title.trim();
  generated.excerpt = generated.excerpt.trim();
  if (!generated.title || !generated.excerpt) exitWithError(`生成結果が空です: ${response.output_text}`);

  console.log("\n[変更前]");
  console.log(`  title:   ${current.title || "（未設定）"}`);
  console.log(`  excerpt: ${current.excerpt || "（未設定）"}`);
  console.log("[変更後]");
  console.log(`  title:   ${generated.title}`);
  console.log(`  excerpt: ${generated.excerpt} (${countChars(generated.excerpt)}字)`);
  if (countChars(generated.excerpt) > EXCERPT_MAX_LENGTH) {
    console.warn(`\n注意: excerptが${EXCERPT_MAX_LENGTH}字を超えています。必要に応じて再実行するか手動で調整してください`);
  }

  if (!yes && !(await confirm("\nこの内容で記事を更新しますか？ (y/N): "))) {
    console.log("更新を中止しました");
    return;
  }
  fs.writeFileSync(postPath, updateFrontMatter(source, generated));
  console.log(`更新しました: ${path.relative(ROOT_DIR, postPath)}`);
};

main().catch((error) => {
  exitWithError(error instanceof Error ? error.message : String(error));
});
