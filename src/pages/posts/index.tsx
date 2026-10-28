import Layout from "../../components/ui-pages/layout/Layout";
import Container from "../../components/ui-elements/container/Container";
import Post from "../../interfaces/post";
import { getAllPosts, getPostSidebarData } from "../../lib/fileSystem";
import Intro from "../../components/ui-elements/intro/Intro";
import { Bio } from "../../components/ui-elements/bio/Bio";
import { ADMINISTRATOR } from "../../lib/constants";
import MoreStories from "../../components/ui-parts/moreStories/MoreStories";
import { useRouter } from "next/router";
import PostSidebar from "../../components/ui-parts/postSidebar/PostSidebar";
import type { TagCount, YearArchive } from "../../lib/postIndex";

type Props = {
  allPosts: Post[];
  tags: TagCount[];
  years: YearArchive[];
};

export default function PostIndex({ allPosts, tags, years }: Props) {
  const router = useRouter();
  const { pageNum } = router.query;
  return (
    <>
      <Layout>
        <Container>
          <Intro title={"Blog Posts."} />
          <Bio admin={ADMINISTRATOR} />
          <div className="flex flex-col lg:flex-row-reverse lg:gap-10">
            <PostSidebar tags={tags} years={years} />
            <div className="min-w-0 flex-grow">
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
            </div>
          </div>
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
    props: { allPosts, ...getPostSidebarData() },
  };
};
