import html from "rehype-stringify";
import gfm from "remark-gfm";
import { unified } from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";

export default async function markdownToHtml(markdownContents: string) {
  const result = await unified()
    .use(markdown)
    .use(remark2rehype)
    .use(html)
    .use(gfm)
    .process(markdownContents);

  return result.toString();
}
