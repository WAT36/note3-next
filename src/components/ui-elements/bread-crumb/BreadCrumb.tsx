import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { DIR_NAME } from "../../../lib/constants";

export const BreadCrumb: NextPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const queryWithPrefix = queryString ? `?${queryString}` : "";

  // pathを「/」で分解
  const paths = decodeURI(router.asPath).substring(1).split("/");
  // 末尾がindex.html・クエリパラメータ類だった場合それは削除
  if (
    paths.slice(-1)[0].startsWith("index.html") ||
    paths.slice(-1)[0] === "" ||
    paths.slice(-1)[0].startsWith("#") ||
    paths.slice(-1)[0].startsWith("?")
  ) {
    paths.pop();
  }

  // リンク先アドレスの取得
  const roots = [""];
  for (let i = 0; i < paths.length; i++) {
    roots.push(roots[i] + "/" + paths[i]);
  }

  if (roots.slice(-1)[0] !== "/" && roots.slice(-1)[0] !== "") {
    // トップページ以外
    return (
      <div className="mx-3 my-4 inline-block">
        {/* Homeのリンク */}
        <Link href={process.env.NEXT_PUBLIC_URL_END}>Top</Link>
        {paths.map((x, i) => (
          <>
            {/* サブページのリンク */}
            {" > "}
            <Link
              href={
                roots[i + 1] +
                process.env.NEXT_PUBLIC_URL_END +
                (roots[i + 1].includes("/notes") ? queryWithPrefix : "") // /notes以下のページにいる場合はクエリパラメータ保持
              }
              key={i}
            >
              {DIR_NAME[x] || (i === paths.length - 1 ? `(本記事)` : x)}
            </Link>
          </>
        ))}
      </div>
    );
  } else {
    return (
      // トップページの時はパンくずリストは表示しない
      <></>
    );
  }
};
