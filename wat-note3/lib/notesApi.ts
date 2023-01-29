import fs from "fs";
import path from "path";
import { join } from "path";
import matter from "gray-matter";
import { isDirectory } from "./fs";

const notesDirectory = join(process.cwd(), "_notes");

// 指定ディレクトリ以下の全ファイル名を取得
export function getAllNoteSlugs(rootDirectory: string) {
  const rootEnts = fs.readdirSync(rootDirectory, { withFileTypes: true });

  const files = [];
  for (const dirent of rootEnts) {
    if (dirent.isDirectory()) {
      const fp = path.join(rootDirectory, dirent.name);
      // ディレクトリのパス
      files.push({
        slug: fp.replace(new RegExp(notesDirectory + "/"), "").split("/"),
      });
      files.push(getAllNoteSlugs(fp));
    } else if (dirent.isFile() && [".md"].includes(path.extname(dirent.name))) {
      const dir = path.join(rootDirectory, dirent.name);
      files.push({
        slug: dir
          .replace(new RegExp(notesDirectory + "/"), "")
          .replace(/\.md$/, "")
          .split("/"),
      });
    }
  }
  return files.flat();
}

export function getNoteBySlug(slug: string[], fields: string[] = []) {
  const realSlug = slug.join("/");
  const isDir = isDirectory(join(notesDirectory, `${realSlug}`));
  const fullPath = join(notesDirectory, `${realSlug}${isDir ? "" : ".md"}`);

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
    const fileContents = fs.readFileSync(fullPath, "utf8");
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
  const slugs: { slug: string; isDir: boolean }[] =
    getAllNoteSlugs(notesDirectory);
  return slugs;
}
