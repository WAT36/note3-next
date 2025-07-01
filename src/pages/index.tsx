import Container from "../components/ui-elements/container/Container";
import HeroPost from "../components/ui-parts/heroPost/HeroPost";
import Intro from "../components/ui-elements/intro/Intro";
import Layout from "../components/ui-pages/layout/Layout";
import Head from "next/head";
import { ADMINISTRATOR, AUTHOR, TITLE } from "../lib/constants";
import { Bio } from "../components/ui-elements/bio/Bio";
import { getNewestPost, getRandomPost, HitType } from "../lib/algolia";
import LastUpdatedDate from "../components/ui-elements/lastUpdatedDate/LastUpdatedDate";

type Props = {
  newestPost: HitType;
  randomPost: HitType;
};

export default function Index({ newestPost, randomPost }: Props) {
  return (
    <>
      <Layout>
        <Head>
          <title>{TITLE}</title>
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
          {/** TODO この辺別コンポーネント作って分けたい New PostとかはHeroPostにまとめられないか？ */}
          <h3 className="text-6xl font-bold my-4 tracking-tighter leading-tight md:pr-8">
            New Posts
          </h3>
          {newestPost && (
            <HeroPost
              title={newestPost.title}
              coverImage={newestPost.coverImage}
              date={newestPost.date}
              author={AUTHOR}
              slug={newestPost.path.replace("/posts", "")}
              excerpt={newestPost.excerpt}
            />
          )}

          <h3 className="text-6xl font-bold my-4 tracking-tighter leading-tight md:pr-8">
            Posts Pick Up
          </h3>
          {randomPost && (
            <HeroPost
              title={randomPost.title}
              coverImage={randomPost.coverImage}
              date={randomPost.date}
              author={AUTHOR}
              slug={randomPost.path.replace("/posts", "")}
              excerpt={randomPost.excerpt}
            />
          )}
          <LastUpdatedDate />
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async (context) => {
  const newestPost = await getNewestPost();
  const randomPost = await getRandomPost();
  return {
    props: {
      newestPost,
      randomPost,
    },
  };
};
