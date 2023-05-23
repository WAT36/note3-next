import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPosts, getAuthTokens } from "../lib/api";
import Head from "next/head";
import { ADMINISTRATOR, TITLE } from "../lib/constants";
import Post from "../interfaces/post";
import { Bio } from "../components/bio";

type Props = {
  allPosts: Post[];
  tokenProps: TokenProps;
};

type TokenProps = {
  access_token?: string;
  id_token?: string;
  refresh_token?: string;
  error?: string;
};

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <>
      <Layout>
        <Head>
          <title> {TITLE} </title>
        </Head>
        <Container>
          <Intro title={TITLE} />
          <Bio admin={ADMINISTRATOR} />
          <div className="my-4">
            <p>
              このページはわたくしWATが日ごろの業務及び業務外等の活動で得た技術的知見を備忘のために書き記しておく事を目的に開設した、個人的なノート代わりのサイトです。
              たまに自分で作ったプロダクトや雑品などについても書いていけたら良いなあと思っています。
            </p>
            <p>このページはNext.jsを使って作成しております。</p>
            <p>まあ、よろしく</p>
          </div>
          <h3 className="text-6xl font-bold my-4 tracking-tighter leading-tight md:pr-8">
            Posts Pick Up
          </h3>
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
        </Container>
      </Layout>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);
  const tokenProps = getAuthTokens(context.query.code);
  return {
    props: {
      allPosts,
      tokenProps,
    },
  };
};
