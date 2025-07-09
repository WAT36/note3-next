import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getNoteBySlug, getAllNotes } from "../../lib/notesApi";
import PostTitle from "../../components/ui-elements/postTitle/PostTitle";
import { PROGRAMMING_LANGUAGE_NAME } from "../../lib/constants";
import markdownToHtml from "../../lib/markdownToHtml";
import type NoteType from "../../interfaces/note";
import { getNoteUnderDirSlugs, NOTES_DIR } from "../../lib/fileSystem";
import { useEffect, useState } from "react";
import NotePage from "../../components/ui-pages/pages/notePage/NotePage";
import NoteDirPage from "../../components/ui-pages/pages/notedirPage/NoteDirPage";
import hljs from "highlight.js";

type Props = {
  note: NoteType;
  subPageLinks?: SubPageLink[];
};

const Note = ({ note, subPageLinks }: Props) => {
  const router = useRouter();
  const { query } = router;
  if (!router.isFallback && !note?.slug) {
    return <ErrorPage statusCode={404} />;
  } else if (
    !query ||
    query.validationToken !== process.env.NEXT_PUBLIC_NOTES_TOKEN
  ) {
    return <ErrorPage statusCode={403} />;
  }

  useEffect(() => {
    hljs.highlightAll();
  }, []);

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

  // フロントエンド CodePen用(ローカル)
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const script = document.createElement("script");
    script.src = "https://cpwebassets.codepen.io/assets/embed/ei.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  if (!isClient) {
    return null; // サーバーサイドでは何も表示しない
  }

  return router.isFallback ? (
    <PostTitle>Loading…</PostTitle>
  ) : Boolean(note.isDir) ? (
    <NoteDirPage subPageLinks={subPageLinks} preface={note.content} />
  ) : (
    <NotePage note={note} />
  );
};

// getStaticPathsの返り値、各文書のファイルパス(catch-all dynamic routingのためstring[])
type Params = {
  params: {
    slug: string[];
  };
};

export type SubPageLink = {
  slug: string;
  name: string;
  isDir: boolean;
  date?: string;
  mode?: string;
  programmingAbst?: { [key: string]: string };
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
    "tag",
  ]);
  // MarkdownコンテンツをHTMLに変換（ディレクトリの場合_index.mdを、記事の場合***.mdを読む）
  const content = await markdownToHtml(
    note.isDir ? note.dirPreface || "" : note.content || ""
  );

  // ディレクトリの場合の処理
  let subPageLinks: SubPageLink[];
  if (note.isDir) {
    const dirSlug =
      NOTES_DIR + "/" + (params.slug ? params.slug.join("/") : "");
    // 指定ディレクトリ直下にあるファイル・ディレクトリを取得
    const slugs = getNoteUnderDirSlugs(dirSlug, false);
    subPageLinks = slugs
      .map((slug) => {
        const noteConfig = getNoteBySlug(slug.slug, [
          "title",
          "date",
          "draft",
          "mode",
          "content",
        ]);
        // null(draftタグtrue)の場合は作成しない
        if (!slug.isDir && noteConfig["draft"]) {
          return null;
        }

        const programmingAbst = {};
        if (noteConfig["mode"] === "programming") {
          for (let i = 0; i < PROGRAMMING_LANGUAGE_NAME.length; i++) {
            // 記事内の指定した言語で書かれているコード部分を抜き出してくる
            const extractAbst = noteConfig["content"].match(
              new RegExp("```" + PROGRAMMING_LANGUAGE_NAME[i] + "[\\s\\S]*?```")
            );
            programmingAbst[PROGRAMMING_LANGUAGE_NAME[i]] = extractAbst
              ? extractAbst
                  .map((data) =>
                    data
                      .replace("```" + PROGRAMMING_LANGUAGE_NAME[i], "")
                      .replace("```", "")
                  )
                  .join("")
              : null;
          }
        }
        return {
          slug: slug.slug.join("/"),
          name: noteConfig["title"] || slug.slug.join("/"),
          date: noteConfig["date"] || null,
          isDir: slug.isDir,
          mode: noteConfig["mode"] || null,
          programmingAbst:
            Object.keys(programmingAbst).length === 0 ? null : programmingAbst,
        };
      })
      // 上記のnull(draftタグtrue)と_index.mdを省く
      .filter((subPageLink) => {
        return subPageLink && !subPageLink.slug.endsWith("_index");
      })
      // 日付でソートする
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

// 一番最初に実行される関数
export async function getStaticPaths() {
  // _notes下の全ファイルのファイルパスを取得
  const notes = getAllNotes();
  return {
    // paths: 生成したいページのパスパラメータの組み合わせ、配列の要素1つ1つが１ページになる
    paths: notes.map((note) => {
      return {
        params: {
          slug: note.slug, // [...slug]なのでここはstring[]
        },
      };
    }),
    // 生成するページが存在しない場合の処理、404ページを出す
    fallback: false,
  };
  // pathsのぞれぞれの要素に対して、getStaticPropsが呼ばれる
}

export default Note;
