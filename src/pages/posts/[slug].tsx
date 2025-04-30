import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/ui-elements/container/Container";
import PostBody from "../../components/ui-elements/post-body/PostBody";
import PostHeader from "../../components/ui-parts/post-header/PostHeader";
import Layout from "../../components/ui-pages/layout/Layout";
import { getPostBySlug, getAllPosts } from "../../lib/fileSystem";
import PostTitle from "../../components/ui-elements/post-title/PostTitle";
import Head from "next/head";
import { TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { OutlineBar } from "../../components/ui-elements/outlineBar/OutlineBar";
import { JSDOM } from "jsdom";
import hljs from "highlight.js";
import { useEffect } from "react";
import { extractHeadings } from "../../lib/html";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <div className="flex min-h-screen">
              <article className="mb-32 flex-grow overflow-y-auto">
                <Head>
                  <title>
                    {post.title} | {TITLE}
                  </title>
                  <meta property="og:image" content={post.ogImage.url} />
                </Head>
                <PostHeader
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                />
                <PostBody content={post.content} />
              </article>
              <OutlineBar headings={extractHeadings(post.content)} />
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
}

// TODO 関数は別ファイルに入れたい
function addIdsToHeadings(html: string): string {
  // DOMParserでHTML文字列を解析
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  if (!doc.body) {
    throw new Error("Invalid HTML input");
  }

  // h1～h6要素をすべて取得
  const headings = doc.body.querySelectorAll("h1, h2, h3, h4, h5, h6");

  // カウンタでIDを割り振る
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index + 1}`;
    }
  });

  // 最終的にHTML文字列を返す
  return doc.body.innerHTML;
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = addIdsToHeadings(await markdownToHtml(post.content || ""));

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
