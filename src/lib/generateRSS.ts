import fs from "fs";
import { Feed } from "feed";
import { ADMINISTRATOR, DESCRIPTION, TITLE } from "./constants";
import * as dotenv from "dotenv";
import { getAllArticle } from "./algolia";

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

export async function generateRSSFeed() {
  // TODO any無くしたい
  const posts: Post[] = (await getAllArticle()).map((hit: any) => {
    return {
      title: hit.title,
      link: hit.path + process.env.NEXT_PUBLIC_URL_END,
      date: new Date(hit.date),
      description: hit.excerpt,
    };
  });

  const feed = new Feed({
    title: blogTitle,
    description: blogDescription,
    id: siteUrl,
    link: siteUrl,
    language: "ja",
    updated: new Date(),
    copyright: ADMINISTRATOR.nickname,
  });

  // 記事をフィードに追加
  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: siteUrl + post.link,
      link: siteUrl + post.link,
      date: post.date,
      description: post.description,
    });
  });

  // `public/` ディレクトリに RSS フィードを書き出す
  fs.writeFileSync("public/rss.xml", feed.rss2()); // RSS 2.0 形式

  console.log("✅ RSSフィードを生成しました！");
}

generateRSSFeed().catch((err) => {
  console.error("❌ RSS生成エラー:", err);
});
