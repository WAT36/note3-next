import Link from "next/link";
import { Bio } from "../components/ui-elements/bio/Bio";
import Container from "../components/ui-elements/container/Container";
import Intro from "../components/ui-elements/intro/Intro";
import Layout from "../components/ui-pages/layout/Layout";
import { ADMINISTRATOR } from "../lib/constants";
import algoliasearch from "algoliasearch/lite";
import { useEffect, useState } from "react";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_APP_ID || "",
  process.env.NEXT_PUBLIC_SEARCH_DATA_API_KEY || ""
);
const indexName = process.env.NEXT_PUBLIC_INDEX_NAME || "";
const index = searchClient.initIndex(indexName);

type HitType = {
  title: string;
  path: string;
  excerpt: string;
};

type HitProps = {
  hit: HitType;
};

function Hit({ hit }: HitProps) {
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
  const [articles, setArticles] = useState<HitType[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  useEffect(() => {
    // タグリスト取得
    index.searchForFacetValues("_tags", "").then(({ facetHits }) => {
      setTagList(
        facetHits.map((hit) => {
          return hit.value;
        })
      );
    });
  }, []);

  const searchByQuery = async (query) => {
    index.search<HitType>(query).then(({ hits }) => {
      setArticles(
        hits.slice(0, 5).map((h) => {
          return {
            title: h.title,
            path: h.path,
            excerpt: h.excerpt,
          };
        })
      );
    });
  };

  const searchByTag = async (tagName) => {
    index
      .search<HitType>("", {
        filters: "_tags:" + tagName,
      })
      .then(({ hits }) => {
        setArticles(
          hits.slice(0, 5).map((h) => {
            return {
              title: h.title,
              path: h.path,
              excerpt: h.excerpt,
            };
          })
        );
      });
  };

  return (
    <>
      <Layout>
        <Container>
          <Intro title={"記事検索"} />
          <Bio admin={ADMINISTRATOR} />
          <>
            <div>
              <input
                type="text"
                className="text-black"
                size={25}
                placeholder="キーワード検索"
                onChange={async (e) => {
                  await searchByQuery(e.target.value);
                }}
              />
            </div>
            {/**TODO ここは別コンポーネント化する */}
            <div className="w-full flex flex-wrap">
              <span className="my-4">{"タグ："}</span>
              {tagList.length > 0 ? (
                tagList.map((tag) => {
                  return (
                    <span
                      className="m-4 underline cursor-pointer"
                      onClick={async () => {
                        await searchByTag(tag);
                      }}
                    >
                      {tag}
                    </span>
                  );
                })
              ) : (
                <></>
              )}
            </div>
            {articles.map((h) => {
              return <Hit hit={h} />;
            })}
          </>
        </Container>
      </Layout>
    </>
  );
}
