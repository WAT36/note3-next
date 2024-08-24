import Link from "next/link";
import { Bio } from "../components/ui-elements/bio/Bio";
import Container from "../components/ui-elements/container/Container";
import Intro from "../components/ui-elements/intro/Intro";
import Layout from "../components/ui-pages/layout/Layout";
import { ADMINISTRATOR } from "../lib/constants";
import algoliasearch from "algoliasearch/lite";
import { Configure, Hits, InstantSearch, SearchBox } from "react-instantsearch";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_APP_ID || "",
  process.env.NEXT_PUBLIC_SEARCH_DATA_API_KEY || ""
);

function Hit({ hit }) {
  return (
    <div className="my-4">
      <Link
        className="font-bold text-xl m-4 text-blue-900"
        href={hit.path + process.env.NEXT_PUBLIC_URL_END}
      >
        {hit.title}
      </Link>
      <p className="m-4 w-full">{hit.excerpt || "　"}</p>
    </div>
  );
}

export default function SearchResult() {
  const indexName = process.env.NEXT_PUBLIC_INDEX_NAME || "";

  return (
    <>
      <Layout>
        <Container>
          <Intro title={"記事検索"} />
          <Bio admin={ADMINISTRATOR} />
          {/**TODO 初期表示時に初期検索が行われないようにする */}
          {/**TODO 検索結果0軒の時の表示どうすれば良いのか？ */}
          <InstantSearch searchClient={searchClient} indexName={indexName}>
            <Configure hitsPerPage={5} />
            <SearchBox
              placeholder={"検索"}
              classNames={{
                input: "text-black border border-black",
                submitIcon: "mx-1",
                resetIcon: "mx-1",
              }}
              resetIconComponent={({ classNames }) => <></>}
            />
            <Hits hitComponent={Hit} />
          </InstantSearch>
        </Container>
      </Layout>
    </>
  );
}
