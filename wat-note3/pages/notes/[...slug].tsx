import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getNoteBySlug, getAllNotes } from "../../lib/notesApi";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { ADMINISTRATOR, CMS_NAME, NOTES_DIR } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type NoteType from "../../interfaces/note";
import Intro from "../../components/intro";
import { Bio } from "../../components/bio";
import NoteDirLink from "../../components/notedir-link";
import NoteLink from "../../components/note-link";
import { getNoteSlugs } from "../../lib/fileSystem";

type Props = {
  note: NoteType;
  subPageLinks;
};

export default function Note({ note, subPageLinks }: Props) {
  const router = useRouter();
  if (!router.isFallback && !note?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : Boolean(note.isDir) ? (
          NoteDirContents(subPageLinks)
        ) : (
          NoteContents(note)
        )}
      </Container>
    </Layout>
  );
}

function NoteContents(note: NoteType) {
  return (
    <>
      <article className="mb-32">
        <Head>
          <title>
            {note.title} | Next.js Blog Example with {CMS_NAME}
          </title>
          <meta property="og:image" content={note.ogImage.url} />
        </Head>
        <PostHeader
          title={note.title}
          coverImage={note.coverImage}
          date={note.date}
          author={note.author}
        />
        <PostBody content={note.content} />
      </article>
    </>
  );
}

function NoteDirContents(subPageLinks) {
  return (
    <>
      <Container>
        <Intro title={"Notes."} />
        <Bio admin={ADMINISTRATOR} />
        {subPageLinks.map((link) => {
          return link.isDir ? (
            <NoteDirLink slug={link.slug} name={link.name} />
          ) : (
            <NoteLink slug={link.slug} name={link.name} />
          );
        })}
      </Container>
    </>
  );
}

type Params = {
  params: {
    slug: string[];
  };
};

export async function getStaticProps({ params }: Params) {
  const note = getNoteBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const content = await markdownToHtml(note.content || "");

  // ページ下へのリンク作成
  const slugs = getNoteSlugs(NOTES_DIR + "/" + params.slug.join("/"), false);
  const subPageLinks = slugs.map((slug) => {
    return {
      slug: "notes/" + slug.slug.join("/"),
      name: slug.slug.join("/"),
      isDir: slug.isDir,
    };
  });

  return {
    props: {
      note: {
        ...note,
        content,
      },
      subPageLinks,
    },
  };
}

export async function getStaticPaths() {
  const notes = getAllNotes(["slug"]);

  return {
    paths: notes.map((note) => {
      return {
        params: {
          slug: note.slug,
        },
      };
    }),
    fallback: false,
  };
}
