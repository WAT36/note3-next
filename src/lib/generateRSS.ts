import fs from "fs";
import { Feed } from "feed";
import { ADMINISTRATOR, DESCRIPTION, TITLE } from "./constants";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();

// サイトの基本情報
const siteUrl = process.env.NEXT_PUBLIC_SERVER_ADDRESS; // ここに自分のサイトURLを入れる
const blogTitle = TITLE;
const blogDescription = DESCRIPTION;

// 仮の投稿データ（実際にはデータベースやCMSから取得する）
interface Post {
  title: string;
  link: string;
  date: Date;
  description: string;
}

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

// 現在のカレントディレクトリを記憶
const originalDir = process.cwd();

export async function generateRSSFeed() {
  if (process.env.NEXT_PUBLIC_APP_ENV === "prd") {
    try {
      // このファイルがあるディレクトリのパスを取得
      const __filename = fileURLToPath(import.meta.url);
      const scriptDir = path.dirname(__filename);

      // スクリプトのディレクトリに移動
      process.chdir(scriptDir);

      let files = [];
      files = files.concat(listFiles("../../_posts"));

      const feed = new Feed({
        title: blogTitle,
        description: blogDescription,
        id: siteUrl,
        link: siteUrl,
        language: "ja",
        updated: new Date(),
        copyright: ADMINISTRATOR.nickname,
      });

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
        // TODO algoliaとほぼ同じなので　統一するか共通化したい

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

        feed.addItem({
          title,
          id: siteUrl + fileSlug.replace(".md", ""),
          link: siteUrl + fileSlug.replace(".md", ""),
          date: new Date(date),
          description: excerpt,
        });
      }

      // `public/` ディレクトリに RSS フィードを書き出す
      fs.writeFileSync("../../out/rss.xml", feed.rss2()); // RSS 2.0 形式

      console.log("✅ RSSフィードを生成しました！");
    } catch (error) {
      console.error("エラーが発生しました ❌:", error);
    } finally {
      // 元のディレクトリに戻る
      process.chdir(originalDir);
    }
  } else {
    console.log("この環境ではRSSフィードは生成しません");
  }
}

generateRSSFeed().catch((err) => {
  console.error("❌ RSS生成エラー:", err);
});
