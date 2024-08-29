import Link from "next/link";
import { Bio } from "../components/ui-elements/bio/Bio";
import Container from "../components/ui-elements/container/Container";
import Intro from "../components/ui-elements/intro/Intro";
import Layout from "../components/ui-pages/layout/Layout";
import { ADMINISTRATOR } from "../lib/constants";
import algoliasearch from "algoliasearch/lite";
import {
  Configure,
  Hits,
  Index,
  InstantSearch,
  SearchBox,
} from "react-instantsearch";
import { useEffect, useState } from "react";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_APP_ID || "",
  process.env.NEXT_PUBLIC_SEARCH_DATA_API_KEY || ""
);
const indexName = process.env.NEXT_PUBLIC_INDEX_NAME || "";
const index = searchClient.initIndex(indexName);

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
  const [tagList, setTagList] = useState<string[]>([]);
  useEffect(() => {
    index.searchForFacetValues("_tags", "").then(({ facetHits }) => {
      setTagList(
        facetHits.map((hit) => {
          return hit.value;
        })
      );
    });
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <Intro title={"記事検索"} />
          <Bio admin={ADMINISTRATOR} />
          {/**TODO 初期表示時に初期検索が行われないようにする */}
          {/**TODO 検索結果0軒の時の表示どうすれば良いのか？ */}
          <InstantSearch searchClient={searchClient} indexName={indexName}>
            <Index indexName={indexName}>{/* Widgets */}</Index>
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
            {/**TODO ここは別コンポーネント化する */}
            <div className="w-full flex flex-wrap">
              <span className="py-4">{"タグ："}</span>
              {tagList.length > 0
                ? tagList.map((tag) => {
                    return <span className="p-4 border-blue-500">{tag}</span>;
                  })
                : ""}
            </div>
            <Hits hitComponent={Hit} />
          </InstantSearch>
        </Container>
      </Layout>
    </>
  );
}
