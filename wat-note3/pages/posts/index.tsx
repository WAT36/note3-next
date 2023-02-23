import Layout from "../../components/layout";
import Container from "../../components/container";
import Post from "../../interfaces/post";
import { getAllPosts } from "../../lib/api";
import Intro from "../../components/intro";
import { Bio } from "../../components/bio";
import { ADMINISTRATOR } from "../../lib/constants";
import MoreStories from "../../components/more-stories";

type Props = {
  allPosts: Post[];
};

export default function PostIndex({ allPosts }: Props) {
  return (
    <>
      <Layout>
        <Container>
          <Intro title={"Blog Posts."} />
          <Bio admin={ADMINISTRATOR} />
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
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
