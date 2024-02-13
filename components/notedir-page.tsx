import Layout from "./layout";
import Container from "./container";
import Head from "next/head";
import NoteType from "../interfaces/note";
import { ADMINISTRATOR, TITLE } from "../lib/constants";
import PostHeader from "./post-header";
import PostBody from "./post-body";
import Intro from "./intro";
import { Bio } from "./bio";
import NoteDirLink from "./notedir-link";
import NoteLink from "./note-link";

type Props = {
  subPageLinks?;
};

const NoteDirPage = ({ subPageLinks }: Props) => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default NoteDirPage;
