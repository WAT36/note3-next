import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getNoteBySlug, getAllNotes } from "../../lib/notesApi";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type NoteType from "../../interfaces/note";

type Props = {
  note: NoteType;
  moreNotes: NoteType[];
  preview?: boolean;
};

export default function Note({ note, moreNotes, preview }: Props) {
  const router = useRouter();
  if (!router.isFallback && !note?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : Boolean(note.isDir) ? (
          <>
            <p>ここはディレクトリ用のページです(作成中)</p>
            <p>{note.slug}</p>
            <p>{note.isDir}</p>
            <p>{JSON.stringify(note)}</p>
          </>
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

  return {
    props: {
      note: {
        ...note,
        content,
      },
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
