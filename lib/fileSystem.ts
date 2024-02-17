import { existsSync, readdirSync, statSync } from "fs";
import path from "path";
import { NOTES_DIR } from "./constants";

// 指定slugがディレクトリかmdファイルであるか判定
export function isDirectory(path: string) {
  // ディレクトリか判定
  try {
    if (existsSync(path) && statSync(path).isDirectory()) {
      return true;
    }
  } catch (error) {
    // 存在しないエラー → 次の.mdファイルであるか判定へ
  } finally {
    // .mdファイルであるか判定
    const mdPath = path + ".md";
    if (existsSync(mdPath)) {
      return false;
    }
    // それでも存在しない → エラーが投げられる
  }
}

// 指定ディレクトリ以下の全ディレクトリ・ファイル(.md)名を取得
export function getNoteSlugs(rootDirectory: string, isRecursive: boolean) {
  // rootDirectory直下のファイル・ディレクトリ取得
  const rootEnts = readdirSync(rootDirectory, { withFileTypes: true });

  const files: { slug: string[]; isDir: boolean }[] = [];
  for (const dirent of rootEnts) {
    if (dirent.isDirectory()) {
      // ディレクトリのパス
      const fp = path.join(rootDirectory, dirent.name);
      files.push({
        slug: fp.replace(new RegExp(NOTES_DIR + "/"), "").split("/"),
        isDir: true,
      });
      if (isRecursive) {
        files.concat(getNoteSlugs(fp, isRecursive));
      }
    } else if (dirent.isFile() && [".md"].includes(path.extname(dirent.name))) {
      const dir = path.join(rootDirectory, dirent.name);
      files.push({
        slug: dir
          .replace(new RegExp(NOTES_DIR + "/"), "")
          .replace(/\.md$/, "")
          .split("/"),
        isDir: false,
      });
    }
  }
  return files;
}
