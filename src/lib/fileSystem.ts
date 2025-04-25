import { existsSync, readdirSync, statSync } from "fs";
import path from "path";

// _notesフォルダの場所(constant.tsに置くとstorybookでエラー起きるのでここに配置する)
export const NOTES_DIR = path.join(process.cwd(), "_notes");

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
  const rootEnts = readdirSync(rootDirectory, { withFileTypes: true });

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
