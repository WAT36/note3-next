import Layout from "../../components/layout";
import Container from "../../components/container";
import Note from "../../interfaces/note";
import { getAllNotes, getNoteBySlug } from "../../lib/notesApi";
import Intro from "../../components/intro";
import { Bio } from "../../components/bio";
import { ADMINISTRATOR, NOTES_DIR } from "../../lib/constants";
import MoreStories from "../../components/more-stories";
import Link from "next/link";
import { getNoteSlugs } from "../../lib/fileSystem";
import NoteLink from "../../components/note-link";
import NoteDirLink from "../../components/notedir-link";

type Props = {
  allNotes: Note[];
  subPageLinks;
};

export default function NoteIndex({ allNotes, subPageLinks }: Props) {
  return (
    <>
      <Layout>
        <Container>
          <Intro title={"Notes."} />
          <Bio admin={ADMINISTRATOR} />
          Notesのトップページです、計画中・・
          {subPageLinks.map((link) => {
            return link.isDir ? (
              <NoteDirLink slug={link.slug} />
            ) : (
              <NoteLink slug={link.slug} name={link.name} />
            );
          })}
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

  // ページ下へのリンク作成
  const slugs = getNoteSlugs(NOTES_DIR, false);
  const subPageLinks = slugs.map((slug) => {
    const noteTitle = getNoteBySlug(slug.slug, ["title"]).title;
    return {
      slug: "notes/" + slug.slug.join("/"),
      name: noteTitle || slug.slug.join("/"),
      isDir: slug.isDir,
    };
  });

  return {
    props: { allNotes, subPageLinks },
  };
};
