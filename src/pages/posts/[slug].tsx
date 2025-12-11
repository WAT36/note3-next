import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/ui-elements/container/Container";
import PostBody from "../../components/ui-elements/postBody/PostBody";
import PostHeader from "../../components/ui-parts/postHeader/PostHeader";
import Layout from "../../components/ui-pages/layout/Layout";
import { getPostBySlug, getAllPosts } from "../../lib/fileSystem";
import PostTitle from "../../components/ui-elements/postTitle/PostTitle";
import Head from "next/head";
import { TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import { OutlineBar } from "../../components/ui-elements/outlineBar/OutlineBar";
import hljs from "highlight.js";
import { useEffect } from "react";
import { extractHeadings } from "../../lib/html";
import type { TagData } from "../../interfaces/html";

type Props = {
  post: PostType & { headings: TagData[] };
  morePosts: PostType[];
  preview?: boolean;
};

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  // highlight.js
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
                  tag={post.tag}
                />
                <PostBody content={post.content} />
              </article>
              <OutlineBar headings={post.headings} />
            </div>
          </>
        )}
      </Container>
    </Layout>
  );
}

async function addIdsToHeadings(html: string): Promise<string> {
  const { JSDOM } = await import("jsdom");
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
    "tag",
  ]);
  const content = await addIdsToHeadings(await markdownToHtml(post.content || ""));
  const headings = await extractHeadings(content);

  return {
    props: {
      post: {
        ...post,
        content,
        headings,
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
