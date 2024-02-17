import { existsSync, readFileSync, statSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { NOTES_DIR } from "./constants";
import { getNoteUnderDirSlugs, isDirectory } from "./fileSystem";

// 記事のパス(string[])から
export function getNoteBySlug(slug: string[], fields: string[] = []) {
  const realSlug = slug.join("/");
  const isDir = isDirectory(join(NOTES_DIR, `${realSlug}`));
  const fullPath = join(NOTES_DIR, `${realSlug}${isDir ? "" : ".md"}`);

  // ファイル(ディレクトリ)データ
  type Items = {
    [key: string]: string;
  } & {
    link?: object;
    isDir?: boolean;
  };

  const items: Items = {};

  if (isDir) {
    // ディレクトリの場合（デザイン要考案）
    items["slug"] = realSlug;
    items.isDir = true;

    // ディレクトリ直下に「_index.md」ファイルがある場合、その内容を読み込む
    const indexFilePath = fullPath + "/_index.md";
    if (existsSync(indexFilePath) && statSync(indexFilePath).isFile()) {
      const fileContents = readFileSync(indexFilePath, "utf8");
      const { data, content } = matter(fileContents);
      items["dirPreface"] = content;
    }
  } else {
    // .mdファイルの場合、ファイルパスから.mdファイルを読み込む
    const fileContents = readFileSync(fullPath, "utf8");
    // .mdファイル冒頭の注釈を読み込む
    const { data, content } = matter(fileContents);
    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
      if (field === "slug") {
        items[field] = realSlug;
      }
      if (field === "content") {
        items[field] = content;
      }

      if (typeof data[field] !== "undefined") {
        items[field] = data[field];
      }
      items.isDir = false;
    });

    // mode指定時の処理(programming)
    if (items.mode && items.mode === "programming") {
      // programming用css類ファイル指定
      items.link = {
        css: ["/assets/note/programming/css/programming.css"],
        javascript: ["/assets/note/programming/javascript/programming.js"],
      };
    }
  }
  return items;
}

export function getAllNotes() {
  const slugs: { slug: string[]; isDir: boolean }[] = getNoteUnderDirSlugs(
    NOTES_DIR,
    true
  );
  return slugs;
}
