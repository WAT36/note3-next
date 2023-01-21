import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";
import { ADMINISTRATOR, CMS_NAME } from "../lib/constants";
import Post from "../interfaces/post";
import { Bio } from "../components/bio";

type Props = {
  allPosts: Post[];
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title>Next.js Blog Example with {CMS_NAME}</title>
        </Head>
        <Container>
          <Intro />
          <Bio admin={ADMINISTRATOR} />
          <p>
            このページはわたくしWATが日ごろの業務及び業務外等の活動で得た技術的知見を備忘のために書き記しておく事を目的に開設した、個人的なノート代わりのサイトです。
            たまに自分で作ったプロダクトや雑品などについても書いていけたら良いなあと思っています。
          </p>
          <p>このページはNext.jsを使って作成しております。</p>
          <p>まあ、よろしく</p>
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
};
