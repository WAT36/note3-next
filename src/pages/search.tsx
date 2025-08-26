import Link from "next/link";
import { Bio } from "../components/ui-elements/bio/Bio";
import Container from "../components/ui-elements/container/Container";
import Intro from "../components/ui-elements/intro/Intro";
import Layout from "../components/ui-pages/layout/Layout";
import { ADMINISTRATOR } from "../lib/constants";
import algoliasearch from "algoliasearch/lite";
import { useEffect, useState } from "react";
import { Tag } from "../components/ui-elements/tag/Tag";

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_APP_ID || "",
  process.env.NEXT_PUBLIC_SEARCH_DATA_API_KEY || ""
);
const indexName = process.env.NEXT_PUBLIC_INDEX_NAME || "";
const index = searchClient.initIndex(indexName);

type HitType = {
  path: string;
  title: string;
  excerpt: string;
  date: string;
};

type HitProps = {
  hit: HitType;
};

// TODO 別ファイルに置きたい・デザイン変えたい
function Hit({ hit }: HitProps) {
  return (
    <div className="mb-12">
      <h3 className="text-3xl mb-3 leading-snug">
        <Link
          as={`/posts/${hit.path}${process.env.NEXT_PUBLIC_URL_END}`}
          href={`/posts/[slug]${process.env.NEXT_PUBLIC_URL_END}`}
          className="underline"
        >
          {hit.title}
        </Link>
      </h3>
      <p className="text-lg leading-relaxed mb-4">{hit.excerpt}</p>
    </div>
  );
}

export default function SearchResult() {
  const [articles, setArticles] = useState<HitType[]>([]);
  const [tagList, setTagList] = useState<string[]>([]);
  useEffect(() => {
    // タグリスト取得
    index
      .searchForFacetValues("_tags", "", {
        filters: "isPost:true",
      })
      .then(({ facetHits }) => {
        setTagList(
          facetHits.map((hit) => {
            return hit.value;
          })
        );
      });
  }, []);

  const searchByQuery = async (query) => {
    index
      .search<HitType>(query, {
        filters: "isPost:true",
      })
      .then(({ hits }) => {
        setArticles(
          hits.slice(0, 5).map((h) => {
            return {
              title: h.title,
              path: h.path.replace("/posts/", ""),
              excerpt: h.excerpt,
              date: h.date,
            };
          })
        );
      });
  };

  const searchByTag = async (tagName) => {
    index
      .search<HitType>("", {
        filters: "isPost:true AND _tags:" + tagName,
      })
      .then(({ hits }) => {
        console.log(hits);
        setArticles(
          hits.slice(0, 5).map((h) => {
            return {
              title: h.title,
              path: h.path.replace("/posts/", ""),
              excerpt: h.excerpt,
              date: h.date,
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
                className="text-black border border-black"
                size={25}
                placeholder="キーワード検索"
                onChange={async (e) => {
                  await searchByQuery(e.target.value);
                }}
              />
            </div>
            {/**TODO ここは別コンポーネント化する */}
            <div className="w-full flex flex-wrap my-4">
              <span className="flex items-center">{"タグ："}</span>
              {tagList.length > 0 ? (
                tagList.map((tag) => {
                  return (
                    <Tag
                      tagName={tag}
                      onClick={async () => {
                        await searchByTag(tag);
                      }}
                      pointerAble={true}
                    />
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
