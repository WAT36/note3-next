import { readFileSync } from "fs";
import { join } from "path";
import matter from "gray-matter";
import { NOTES_DIR } from "./constants";
import { getNoteSlugs, isDirectory } from "./fileSystem";

export function getNoteBySlug(slug: string[], fields: string[] = []) {
  const realSlug = slug.join("/");
  const isDir = isDirectory(join(NOTES_DIR, `${realSlug}`));
  const fullPath = join(NOTES_DIR, `${realSlug}${isDir ? "" : ".md"}`);

  type Items = {
    [key: string]: string;
  } & {
    isDir?: boolean;
  };

  const items: Items = {};

  if (isDir) {
    // ディレクトリの場合（デザイン要考案）
    items["slug"] = realSlug;
    items.isDir = true;
  } else {
    const fileContents = readFileSync(fullPath, "utf8");
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
  }
  return items;
}

export function getAllNotes(fields: string[] = []) {
  const slugs: { slug: string }[] = getNoteSlugs(NOTES_DIR, true);
  return slugs;
}
