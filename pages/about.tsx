import { Bio } from "../components/bio";
import Container from "../components/container";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { ADMINISTRATOR } from "../lib/constants";

export default function About() {
  return (
    <>
      <Layout>
        <Container>
          <Intro title={"About"} />
          <Bio admin={ADMINISTRATOR} />
          <p>作成中・・・</p>
        </Container>
      </Layout>
    </>
  );
}
