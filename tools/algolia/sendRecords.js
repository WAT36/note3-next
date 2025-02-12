import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import algoliasearch from "algoliasearch";
import * as dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ENV_PATH = path.join(__dirname, "../../.env");
dotenv.config({ path: ENV_PATH });

// mdファイルリストを読み込む
const listFiles = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((dirent) =>
      dirent.isFile()
        ? dirent.name.endsWith(".md")
          ? [`${dir}/${dirent.name}`]
          : []
        : listFiles(`${dir}/${dirent.name}`)
    );

let files = [];
files = files.concat(listFiles("../../_notes"));
files = files.concat(listFiles("../../_posts"));

// algoliaに投入するレコード
const records = [];

// for文で１個１個ファイル名を取っていく
for (let i = 0; i < files.length; i++) {
  let filepath = files[i];
  // それをもとにファイル読み込み
  if (!fs.existsSync(filepath)) {
    console.log(`${filepath}は存在しません`);
    continue;
  }
  const data = fs.readFileSync(filepath, "utf8");

  // .mdの冒頭のタイトルとかを読み込み
  // それで１個１個jsonレコード作る

  // タイトル抜き出し
  let extractedData = data.match(/title:.*\n/);
  const title =
    extractedData && extractedData.length > 0
      ? extractedData[0]
          .replace("title:", "")
          .replaceAll(/(\"|\')/g, "")
          .trim()
      : "";

  // 概要抜き出し
  extractedData = data.match(/excerpt:.*\n/);
  const excerpt =
    extractedData && extractedData.length > 0
      ? extractedData[0]
          .replace("excerpt:", "")
          .replaceAll(/(\"|\')/g, "")
          .trim()
      : "";

  // タグ抜き出し
  extractedData = data.match(/tag:.*\n/);
  const tags =
    extractedData && extractedData.length > 0
      ? extractedData[0]
          .replace("tag:", "")
          .replaceAll(/(\[|\]|\"|\'| )/g, "")
          .trim()
          .split(",")
      : "";

  // 日時抜き出し
  extractedData = data.match(/date:.*\n/);
  const date =
    extractedData && extractedData.length > 0
      ? extractedData[0]
          .replace("date:", "")
          .replaceAll(/(\"|\')/g, "")
          .trim()
      : undefined;

  // 画像ファイル名抜き出し
  extractedData = data.match(/coverImage:.*\n/);
  const coverImage =
    extractedData && extractedData.length > 0
      ? extractedData[0]
          .replace("coverImage:", "")
          .replaceAll(/(\"|\')/g, "")
          .trim()
      : undefined;

  // ファイルパス　レコード用に書き換え
  const fileSlug = filepath
    .replace("../../_notes", "/notes")
    .replace("../../_posts", "/posts");

  // _index.md の場合は登録しない(スキップ)
  if (fileSlug.endsWith("_index.md")) {
    continue;
  }

  // レコード群にデータを追加する
  records.push({
    title,
    excerpt,
    date,
    coverImage,
    _tags: tags,
    path: fileSlug.replace(".md", ""),
    isPost: fileSlug.includes("/posts"), //ブログ用記事か判別するための属性
    objectID: fileSlug,
  });
}

// algoliaに送り込む
const appId = process.env.APP_ID;
const indexName = process.env.INDEX_NAME;
const addDataApiKey = process.env.ADD_DATA_API_KEY;

const client = algoliasearch(appId, addDataApiKey);
const index = client.initIndex(indexName);
index
  .saveObjects(records, { autoGenerateObjectIDIfNotExist: true })
  .then(({}) => {
    console.log("OK!! Done.");
  })
  .catch((err) => console.error(err));
