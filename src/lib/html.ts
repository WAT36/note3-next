import type { TagData } from "../interfaces/html";

// HTML文字列から見出しタグを抽出（サーバーサイドのみで実行）
export const extractHeadings = async (html: string): Promise<TagData[]> => {
  const { JSDOM } = await import("jsdom");
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // 見出しタグを抽出
  const headings: TagData[] = [];
  const elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6"); // タグに対応する全要素を取得
  elements.forEach((element) => {
    headings.push({
      tag: element.tagName,
      id: element.id || "",
      content: element.textContent || "",
    });
  });

  return headings;
};
