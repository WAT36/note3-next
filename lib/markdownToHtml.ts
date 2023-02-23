import gfm from "remark-gfm";
import { unified } from "unified";
import remark2rehype from "remark-rehype";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdownContents: string) {
  const result = await unified()
    .use(remarkParse) // markdown -> mdast の変換
    .use(remark2rehype, { allowDangerousHtml: true }) // mdast -> hast の変換
    .use(rehypeStringify, { allowDangerousHtml: true }) // hast -> html の変換
    .use(gfm)
    .process(markdownContents);

  return result.toString();
}
