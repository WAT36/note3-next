import fs from "fs";

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
