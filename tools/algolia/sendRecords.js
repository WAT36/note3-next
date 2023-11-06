const fs = require("fs");
const path = require("path");
const algoliasearch = require("algoliasearch");
const ENV_PATH = path.join(__dirname, "../../.env.local");
require("dotenv").config({ path: ENV_PATH });

// mdファイルリストを読み込む（別シェルで実施だが、できればこのjsファイルで完結させたい・・）
const text = fs.readFileSync("filelist.txt", "utf-8");
const files = text.split("\n");

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
  let extractedData = data.match(/excerpt:.*\n/);
  const title =
    extractedData && extractedData.length > 0
      ? extractedData[0]
          .replace("excerpt:", "")
          .replaceAll(/(\"|\')/g, "")
          .trim()
      : "";

  // 概要抜き出し
  extractedData = data.match(/title:.*\n/);
  const excerpt =
    extractedData && extractedData.length > 0
      ? extractedData[0]
          .replace("title:", "")
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

  // ファイルパス　レコード用に書き換え
  const fileSlug = filepath
    .replace("../../_notes", "/notes")
    .replace("../../_posts", "/posts");

  // レコード群にデータを追加する
  records.push({
    title,
    excerpt,
    tags,
    path: fileSlug.replace(".md", ""),
    objectID: fileSlug,
  });
}

// algoliaに送り込む
const appId = process.env.APP_ID;
const indexName = process.env.INDEX_NAME;
const addDataApiKey = process.env.ADD_DATA_API_KEY;

const client = algoliasearch(appId, addDataApiKey);
const index = client.initIndex(indexName);
index.saveObjects(records, { autoGenerateObjectIDIfNotExist: true });

console.log("OK!! Done.");
