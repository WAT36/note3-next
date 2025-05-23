import path from "path";
import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

// _notesフォルダの場所(constant.tsに置くとstorybookでエラー起きるのでここに配置する)
export const NOTES_DIR = path.join(process.cwd(), "_notes");

// 指定slugがディレクトリかmdファイルであるか判定
export function isDirectory(path: string) {
  // ディレクトリか判定
  try {
    if (fs.existsSync(path) && fs.statSync(path).isDirectory()) {
      return true;
    }
  } catch (error) {
    // 存在しないエラー → 次の.mdファイルであるか判定へ
  } finally {
    // .mdファイルであるか判定
    const mdPath = path + ".md";
    if (fs.existsSync(mdPath)) {
      return false;
    }
    // それでも存在しない → エラーが投げられる
  }
}

type FileSlugs = {
  slug: string[];
  isDir: boolean;
};

// 指定ディレクトリ以下の全ディレクトリ・ファイル(.md)名を取得
export function getNoteUnderDirSlugs(
  rootDirectory: string,
  isRecursive: boolean,
  includeMySelf?: boolean
) {
  // rootDirectory直下のファイル・ディレクトリ取得
  const rootEnts = fs.readdirSync(rootDirectory, { withFileTypes: true });

  const files: (FileSlugs | FileSlugs[])[] = [];
  for (const dirent of rootEnts) {
    if (dirent.isDirectory()) {
      // ディレクトリのパス
      const fp = path.join(rootDirectory, dirent.name);
      files.push({
        slug: fp.replace(new RegExp(NOTES_DIR + "/"), "").split("/"),
        isDir: true,
      });
      if (isRecursive) {
        files.push(getNoteUnderDirSlugs(fp, isRecursive));
      }
    } else if (dirent.isFile() && [".md"].includes(path.extname(dirent.name))) {
      const dir = path.join(rootDirectory, dirent.name);

      // _index.mdは数えない
      if (dir.endsWith("_index.md")) {
        continue;
      }

      files.push({
        slug: dir
          .replace(new RegExp(NOTES_DIR + "/"), "")
          .replace(/\.md$/, "")
          .split("/"),
        isDir: false,
      });
    }
  }

  // 自分も含む場合の処理
  if (includeMySelf && isDirectory(rootDirectory)) {
    files.push({
      slug:
        rootDirectory === NOTES_DIR
          ? [""]
          : rootDirectory.replace(new RegExp(NOTES_DIR + "/"), "").split("/"),
      isDir: true,
    });
  }
  return files.flat();
}

const postsDirectory = join(process.cwd(), "_posts");

// _postsフォルダ以下全ファイルのpath取得
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // .mdでdraft: trueとなっているものは作成しない（非表示）
  if (data["draft"] === true) {
    return null;
  }

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
  });

  return items;
}

// postsトップページに表示する記事の詳細情報を取得
export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    .filter((item) => {
      return item;
    })
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
