import Layout from "./layout";
import Container from "./ui-elements/container/Container";
import { ADMINISTRATOR } from "../lib/constants";
import Intro from "./intro";
import { Bio } from "./ui-elements/bio/Bio";
import NoteDirLink from "./notedir-link";
import NoteLink from "./note-link";
import { SubPageLink } from "../pages/notes/[[...slug]]";
import markdownStyles from "./markdown-styles.module.css";
import ProgrammingNoteLink from "./programming-note-link";

type Props = {
  subPageLinks?: SubPageLink[];
  preface?: string;
};

const NoteDirPage = ({ subPageLinks, preface }: Props) => {
  return (
    <Layout canChangeProgrammingLanguage={true}>
      <Container>
        <Intro title={"Notes."} />
        <Bio admin={ADMINISTRATOR} />
        {preface && (
          <div className="mx-auto">
            <div
              className={markdownStyles["markdown"]}
              dangerouslySetInnerHTML={{ __html: preface }}
            />
          </div>
        )}
        {subPageLinks.length > 0 ? (
          subPageLinks.map((link) => {
            return link.isDir ? (
              <NoteDirLink slug={link.slug} />
            ) : link.mode && link.mode === "programming" ? (
              <ProgrammingNoteLink
                slug={link.slug}
                name={link.name}
                abst={link.programmingAbst}
              />
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
