import algoliasearch from "algoliasearch/lite";
import * as dotenv from "dotenv";

dotenv.config();

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_APP_ID || "",
  process.env.NEXT_PUBLIC_SEARCH_DATA_API_KEY || ""
);
const indexName = process.env.NEXT_PUBLIC_INDEX_NAME || "";
const index = searchClient.initIndex(indexName);

// TODO type用のファイルを作ってそこに定義したい
export type HitType = {
  title: string;
  date: string;
  coverImage: string;
  _tags: string[];
  isPost: boolean;
  path: string;
  excerpt: string;
};

// 全記事本数を取得
export const getAllArticleCount = async () => {
  const nbHits = await index
    .search("", {
      hitsPerPage: 1,
    })
    .then(({ nbHits }) => {
      return nbHits;
    });
  return nbHits;
};

// 全記事を取得(RSS用)
export const getAllArticle = async () => {
  const hits = await index.search("", {}).then(({ hits }) => {
    return hits;
  });
  return hits;
};

// ブログ用記事本数を取得
export const getAllPostsCount = async () => {
  const nbHits = await index
    .search("", {
      filters: "isPost:true",
      hitsPerPage: 1,
    })
    .then(({ nbHits }) => {
      return nbHits;
    });
  return nbHits;
};

// 最新のブログ記事を取得
export const getNewestPost = async () => {
  const hit = await index
    .search<HitType>("", {
      filters: "isPost:true",
      hitsPerPage: 1,
    })
    .then(({ hits }) => {
      return hits;
    });
  return hit.length > 0 ? hit[0] : null;
};

// ブログ記事をランダム取得
export const getRandomPost = async () => {
  const nbHits = await getAllPostsCount();
  const randomPageNum = Math.floor(Math.random() * nbHits);
  // TODO 記事が一個もない時の対処法
  const hit = await index
    .search<HitType>("", {
      filters: "isPost:true",
      page: randomPageNum === 0 ? 1 : randomPageNum,
      hitsPerPage: 1,
    })
    .then(({ hits }) => {
      return hits;
    });
  return hit.length > 0 ? hit[0] : null;
};
