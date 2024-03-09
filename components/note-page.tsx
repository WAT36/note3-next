import Layout from "./layout";
import Container from "./container";
import Head from "next/head";
import NoteType from "../interfaces/note";
import { TITLE } from "../lib/constants";
import PostHeader from "./post-header";
import PostBody from "./post-body";

type Props = {
  note: NoteType;
};

const NotePage = ({ note }: Props) => {
  return (
    <Layout canChangeProgrammingLanguage={true}>
      <Container>
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
      </Container>
    </Layout>
  );
};

export default NotePage;
