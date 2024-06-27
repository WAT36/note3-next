import algoliasearch from "algoliasearch";
import "dotenv/config";

// 指定したタグ名を持つ記事を取得する
export const tagFilterSearch = async (tagName: string) => {
  const appID = process.env.NEXT_PUBLIC_APP_ID;
  const apiKey = process.env.NEXT_PUBLIC_SEARCH_DATA_API_KEY;

  // Connect and authenticate with your Algolia app
  const client = algoliasearch(appID, apiKey);

  const index = client.initIndex(process.env.NEXT_PUBLIC_INDEX_NAME);

  await index
    .search("query", {
      query: "",
      tagFilters: [tagName],
    })
    .then(({ hits }) => {
      console.log(hits);
    });
};

// // test
// tagFilterSearch("AWS");
