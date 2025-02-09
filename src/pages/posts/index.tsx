import Layout from "../../components/ui-pages/layout/Layout";
import Container from "../../components/ui-elements/container/Container";
import Post from "../../interfaces/post";
import { getAllPosts } from "../../lib/api";
import Intro from "../../components/ui-elements/intro/Intro";
import { Bio } from "../../components/ui-elements/bio/Bio";
import { ADMINISTRATOR } from "../../lib/constants";
import MoreStories from "../../components/ui-parts/more-stories/MoreStories";
import { useRouter } from "next/router";

type Props = {
  allPosts: Post[];
};

export default function PostIndex({ allPosts }: Props) {
  const router = useRouter();
  const { pageNum } = router.query;
  return (
    <>
      <Layout>
        <Container>
          <Intro title={"Blog Posts."} />
          <Bio admin={ADMINISTRATOR} />
          {allPosts.length > 0 && (
            <MoreStories
              posts={allPosts}
              pageNum={
                +pageNum &&
                0 < +pageNum &&
                +pageNum <= Math.ceil(allPosts.length / 5)
                  ? +pageNum
                  : 1
              }
            />
          )}
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
