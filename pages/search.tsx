import Link from "next/link";
import { Bio } from "../components/bio";
import Container from "../components/container";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { ADMINISTRATOR } from "../lib/constants";
import algoliasearch from "algoliasearch/lite";
import { Configure, Hits, InstantSearch } from "react-instantsearch";

type Props = {
  query: string;
};

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_APP_ID || "",
  process.env.NEXT_PUBLIC_SEARCH_DATA_API_KEY || ""
);

function Hit({ hit }) {
  return (
    <>
      <Link
        className="font-bold text-xl my-5 text-blue-900"
        href={hit.path + process.env.NEXT_PUBLIC_URL_END}
      >
        {hit.title}
      </Link>
    </>
  );
}

// const queryHook: SearchBoxProps["queryHook"] = (query, search) => {
//   search(query);
// };

export default function SearchResult({ query }: Props) {
  return (
    <>
      <Layout>
        <Container>
          <Intro title={"記事検索"} />
          <Bio admin={ADMINISTRATOR} />
          <p>検索結果「{query}」</p>

          <InstantSearch
            searchClient={searchClient}
            indexName={process.env.NEXT_PUBLIC_INDEX_NAME}
            initialUiState={{
              YourIndexName: {
                query: "S3",
              },
            }}
          >
            <Configure hitsPerPage={5} />
            {/* <SearchBox
              placeholder={"Search for posts/notes"}
              queryHook={queryHook}
              className={"text-black"}
            /> */}
            <Hits hitComponent={Hit} />
          </InstantSearch>
        </Container>
      </Layout>
    </>
  );
}
