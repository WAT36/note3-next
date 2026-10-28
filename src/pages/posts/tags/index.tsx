import Head from "next/head";
import Layout from "../../../components/ui-pages/layout/Layout";
import Container from "../../../components/ui-elements/container/Container";
import Intro from "../../../components/ui-elements/intro/Intro";
import { Bio } from "../../../components/ui-elements/bio/Bio";
import { Tag } from "../../../components/ui-elements/tag/Tag";
import { ADMINISTRATOR, TITLE } from "../../../lib/constants";
import { getPostSidebarData } from "../../../lib/fileSystem";
import type { TagCount } from "../../../lib/postIndex";

type Props = {
  tags: TagCount[];
};

export default function TagIndex({ tags }: Props) {
  return (
    <Layout>
      <Head>
        <title>Tags | {TITLE}</title>
      </Head>
      <Container>
        <Intro title={"Tags."} />
        <Bio admin={ADMINISTRATOR} />
        <div className="mb-32 flex flex-wrap">
          {tags.map((t) => (
            <Tag
              key={t.name}
              tagName={t.name}
              count={t.count}
              href={`/posts/tags/${t.slug}${process.env.NEXT_PUBLIC_URL_END}`}
            />
          ))}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { tags } = getPostSidebarData();
  return {
    props: { tags },
  };
};
