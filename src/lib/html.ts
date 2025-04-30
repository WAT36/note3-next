import { JSDOM } from "jsdom";

// TODO 型管理のファイルに移す？
export type TagData = {
  tag: string;
  id: string;
  content: string;
};

// HTML文書の文字列から見出しタグを抜き出す関数
export const extractHeadings = (html: string): TagData[] => {
  // DOMParserでHTML文字列を解析
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
