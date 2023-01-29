import Layout from "../../components/layout";
import Container from "../../components/container";
import Note from "../../interfaces/note";
import { getAllNotes } from "../../lib/notesApi";
import Intro from "../../components/intro";
import { Bio } from "../../components/bio";
import { ADMINISTRATOR } from "../../lib/constants";
import MoreStories from "../../components/more-stories";
import Link from "next/link";

type Props = {
  allNotes: Note[];
};

export default function PostIndex({ allNotes }: Props) {
  return (
    <>
      <Layout>
        <Container>
          <Intro title={"Notes."} />
          <Bio admin={ADMINISTRATOR} />
          Notesのトップページです、計画中・・
          <Link href="/notes/notes-tests">テスト記事</Link>
          <Link href="/notes/directory_test">ディレクトリテスト</Link>
          <Link href="/notes/directory_test/dynamic-routing">
            Dynamic Roouting
          </Link>
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const allNotes = getAllNotes([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allNotes },
  };
};
