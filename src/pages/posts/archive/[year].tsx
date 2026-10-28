import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import Layout from "../../../components/ui-pages/layout/Layout";
import Container from "../../../components/ui-elements/container/Container";
import { Bio } from "../../../components/ui-elements/bio/Bio";
import { Tag } from "../../../components/ui-elements/tag/Tag";
import PostSidebar from "../../../components/ui-parts/postSidebar/PostSidebar";
import { ADMINISTRATOR, TITLE } from "../../../lib/constants";
import { getAllPosts, getPostSidebarData } from "../../../lib/fileSystem";
import {
  groupPostsByMonth,
  tagToSlug,
  type ArchivePost,
  type MonthPosts,
  type TagCount,
  type YearArchive,
} from "../../../lib/postIndex";

type Props = {
  year: string;
  postCount: number;
  months: MonthPosts[];
  prevYear: string | null;
  nextYear: string | null;
  tags: TagCount[];
  years: YearArchive[];
};

const yearHref = (year: string) =>
  `/posts/archive/${year}${process.env.NEXT_PUBLIC_URL_END}`;

export default function YearArchivePage({
  year,
  postCount,
  months,
  prevYear,
  nextYear,
  tags,
  years,
}: Props) {
  return (
    <Layout>
      <Head>
        <title>
          {year}年の記事 | {TITLE}
        </title>
      </Head>
      <Container>
        <section className="mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {"Archive"}
          </p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight">
            {year}
            <span className="ml-4 text-2xl font-normal tracking-normal text-gray-600 dark:text-gray-400">
              {`${postCount}件の記事`}
            </span>
          </h1>
        </section>
        <Bio admin={ADMINISTRATOR} />
        <nav className="mb-8 flex gap-6">
          {prevYear && (
            <Link href={yearHref(prevYear)}>{`← ${prevYear}年`}</Link>
          )}
          {nextYear && (
            <Link href={yearHref(nextYear)}>{`${nextYear}年 →`}</Link>
          )}
        </nav>
        <div className="flex flex-col lg:flex-row-reverse lg:gap-10">
          <PostSidebar tags={tags} years={years} currentYear={year} />
          <div className="mb-32 min-w-0 flex-grow">
            {months.map((m) => (
              <section
                key={m.month}
                id={`${year}-${m.month}`}
                className="flex flex-col gap-2 border-t-2 border-black py-5 dark:border-white md:flex-row md:gap-8"
              >
                <h2 className="text-3xl font-bold tracking-tight md:w-24 md:shrink-0">
                  {`${+m.month}月`}
                </h2>
                <ul className="min-w-0 flex-grow">
                  {m.posts.map((post) => (
                    <ArchiveItem key={post.slug} post={post} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const ArchiveItem = ({ post }: { post: ArchivePost }) => {
  return (
    <li className="flex flex-wrap items-baseline gap-x-4 py-1">
      <time
        dateTime={post.date}
        className="w-12 shrink-0 text-gray-600 dark:text-gray-400"
      >
        {format(parseISO(post.date), "d日")}
      </time>
      <Link
        as={`/posts/${post.slug}${process.env.NEXT_PUBLIC_URL_END}`}
        href={`/posts/[slug]${process.env.NEXT_PUBLIC_URL_END}`}
        className="min-w-0 flex-1 text-xl leading-normal hover:underline"
      >
        {post.title}
      </Link>
      <span>
        {post.tag.map((t) => (
          <Tag
            key={t}
            tagName={t}
            href={`/posts/tags/${tagToSlug(t)}${process.env.NEXT_PUBLIC_URL_END}`}
            small={true}
          />
        ))}
      </span>
    </li>
  );
};

type Params = {
  params: {
    year: string;
  };
};

export const getStaticProps = async ({ params }: Params) => {
  const sidebar = getPostSidebarData();
  const posts = (
    getAllPosts(["slug", "title", "date", "tag"]) as unknown as ArchivePost[]
  ).map((post) => ({ ...post, tag: post.tag ?? [] }));
  const index = sidebar.years.findIndex((y) => y.year === params.year);

  return {
    props: {
      year: params.year,
      postCount: sidebar.years[index].count,
      months: groupPostsByMonth(posts, params.year),
      // years は新しい順なので、前年は次の要素・翌年は前の要素
      prevYear: sidebar.years[index + 1]?.year ?? null,
      nextYear: sidebar.years[index - 1]?.year ?? null,
      ...sidebar,
    },
  };
};

export async function getStaticPaths() {
  const { years } = getPostSidebarData();
  return {
    paths: years.map((y) => ({ params: { year: y.year } })),
    fallback: false,
  };
}
