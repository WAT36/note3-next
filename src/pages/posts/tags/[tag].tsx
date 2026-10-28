import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../components/ui-pages/layout/Layout";
import Container from "../../../components/ui-elements/container/Container";
import { Bio } from "../../../components/ui-elements/bio/Bio";
import MoreStories from "../../../components/ui-parts/moreStories/MoreStories";
import PostSidebar from "../../../components/ui-parts/postSidebar/PostSidebar";
import type Post from "../../../interfaces/post";
import { ADMINISTRATOR, TITLE } from "../../../lib/constants";
import { getAllPosts, getPostSidebarData } from "../../../lib/fileSystem";
import type { TagCount, YearArchive } from "../../../lib/postIndex";

type Props = {
  tagName: string;
  tagSlug: string;
  posts: Post[];
  tags: TagCount[];
  years: YearArchive[];
};

export default function TagPostIndex({
  tagName,
  tagSlug,
  posts,
  tags,
  years,
}: Props) {
  const router = useRouter();
  const { pageNum } = router.query;
  return (
    <Layout>
      <Head>
        <title>
          {tagName} | {TITLE}
        </title>
      </Head>
      <Container>
        <section className="mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-400">{"Tag"}</p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            {tagName}
            <span className="ml-4 text-2xl font-normal tracking-normal text-gray-600 dark:text-gray-400">
              {`${posts.length}件の記事`}
            </span>
          </h1>
        </section>
        <Bio admin={ADMINISTRATOR} />
        <p className="mb-8">
          <Link href={"/posts" + process.env.NEXT_PUBLIC_URL_END}>
            {"← すべての記事に戻る"}
          </Link>
        </p>
        <div className="flex flex-col lg:flex-row-reverse lg:gap-10">
          <PostSidebar tags={tags} years={years} currentTag={tagName} />
          <div className="min-w-0 flex-grow">
            <MoreStories
              posts={posts}
              basePath={`/posts/tags/${tagSlug}`}
              pageNum={
                +pageNum &&
                0 < +pageNum &&
                +pageNum <= Math.ceil(posts.length / 5)
                  ? +pageNum
                  : 1
              }
            />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

type Params = {
  params: {
    tag: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const sidebar = getPostSidebarData();
  const tag = sidebar.tags.find((t) => t.slug === params.tag);
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
    "tag",
  ]).filter((post) =>
    ((post.tag as unknown as string[]) ?? []).includes(tag.name)
  );

  return {
    props: {
      tagName: tag.name,
      tagSlug: tag.slug,
      posts,
      ...sidebar,
    },
  };
};

export async function getStaticPaths() {
  const { tags } = getPostSidebarData();
  return {
    paths: tags.map((t) => ({ params: { tag: t.slug } })),
    fallback: false,
  };
}
