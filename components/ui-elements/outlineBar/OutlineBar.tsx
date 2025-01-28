import { JSDOM } from "jsdom";

type Props = {
  content: string;
};

type TagData = {
  tag: string;
  id: string;
  content: string;
};

// TODO 関数は別ファイルにしたい
function extractHeadings(html: string): TagData[] {
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
}

const OutlineBar = ({ content }: Props) => {
  const headings = extractHeadings(content);
  return (
    <div className="hidden lg:block w-72 h-screen sticky top-0 border-l border-black dark:border-white mb-32 pl-4">
      <div className="w-full pt-4 sticky top-0">
        <h1 className="mb-4 text-2xl">{"目次"}</h1>
        <ul>
          {headings.map((value) => (
            <li className="m-2">
              {"　".repeat(+value.tag[1] - 1)}
              <a className="dark:underline" href={"#" + value.id}>
                {value.content}
                <br />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OutlineBar;
