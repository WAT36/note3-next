import Layout from "../../layout/Layout";
import Container from "../../../ui-elements/container/Container";
import Head from "next/head";
import NoteType from "../../../../interfaces/note";
import { TITLE } from "../../../../lib/constants";
import PostHeader from "../../../ui-parts/post-header/PostHeader";
import PostBody from "../../../ui-elements/post-body/PostBody";

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
