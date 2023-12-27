import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/container";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import Layout from "../../components/layout";
import { getNoteBySlug, getAllNotes } from "../../lib/notesApi";
import PostTitle from "../../components/post-title";
import Head from "next/head";
import { ADMINISTRATOR, NOTES_DIR, TITLE } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type NoteType from "../../interfaces/note";
import Intro from "../../components/intro";
import { Bio } from "../../components/bio";
import NoteDirLink from "../../components/notedir-link";
import NoteLink from "../../components/note-link";
import { getNoteSlugs } from "../../lib/fileSystem";
import { useEffect } from "react";

type Props = {
  note: NoteType;
  subPageLinks?;
};

export default function Note({ note, subPageLinks }: Props) {
  const router = useRouter();
  if (!router.isFallback && !note?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  useEffect(() => {
    const jsClass = "md_link_js";
    const jsClassElement = document.getElementsByClassName(jsClass);
    if (jsClassElement.length > 0) {
      Array.from(jsClassElement).forEach((v) => {
        return v.remove();
      });
    }

    if (note.link?.javascript) {
      for (const jsPath of note.link?.javascript) {
        const id = jsPath.split("/").pop().split(".").shift() + "_js";
        if (!document.getElementById(id)) {
          const body = document.getElementsByTagName("body")[0] as HTMLElement;
          const scriptUrl = document.createElement("script");
          scriptUrl.type = "text/javascript";
          scriptUrl.src = jsPath;
          scriptUrl.id = id;
          scriptUrl.className = jsClass;
          scriptUrl.defer = true;
          body.appendChild(scriptUrl);
        }
      }
    }
  }, [router.isReady, router.asPath]);

  const NoteContents = (note: NoteType) => {
    return (
      <>
        <article className="mb-32">
          <Head>
            <title>
              {note.title} | {TITLE}
            </title>
            {note.ogImage ? (
              <meta property="og:image" content={note.ogImage.url} />
            ) : (
              <></>
            )}
            {note.link?.css &&
              note.link.css.map((cssPath) => {
                return <link rel="stylesheet" type="text/css" href={cssPath} />;
              })}
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
  };

  const NoteDirContents = (subPageLinks) => {
    return (
      <>
        <Container>
          <Intro title={"Notes."} />
          <Bio admin={ADMINISTRATOR} />
          {subPageLinks.length > 0 ? (
            subPageLinks.map((link) => {
              return link.isDir ? (
                <NoteDirLink slug={link.slug} />
              ) : (
                <NoteLink slug={link.slug} name={link.name} />
              );
            })
          ) : (
            <p className="text-4xl">ここにはまだ記事が存在しません。</p>
          )}
        </Container>
      </>
    );
  };

  return (
    <>
      <Layout programmingTag={note.programming}>
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
    "programming",
    "slug",
    "link",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "mode",
  ]);
  const content = await markdownToHtml(note.content || "");

  // ページ下へのリンク作成
  let subPageLinks;
  if (note.isDir) {
    const dirSlug = NOTES_DIR + "/" + params.slug.join("/");
    const slugs = getNoteSlugs(dirSlug, false);
    subPageLinks = slugs
      .map((slug) => {
        const noteConfig = getNoteBySlug(slug.slug, ["title", "date", "draft"]);
        // null(draftタグtrue)の場合は作成しない
        if (!slug.isDir && noteConfig["draft"]) {
          return null;
        }
        return {
          slug: slug.slug.join("/"),
          name: noteConfig["title"] || slug.slug.join("/"),
          date: noteConfig["date"] || null,
          isDir: slug.isDir,
        };
      })
      .filter((link) => {
        return link;
      })
      // sort posts by date in ascending order
      .sort((link1, link2) =>
        link1.isDir && link2.isDir
          ? link1.name > link2.name
            ? 1
            : -1
          : link1.isDir || link2.isDir
          ? link1.isDir
            ? -1
            : 1
          : link1.date > link2.date
          ? 1
          : -1
      );
  }

  return {
    props: {
      note: {
        ...note,
        content,
      },
      subPageLinks: subPageLinks || null,
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
