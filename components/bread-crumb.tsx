import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { DIR_NAME } from "../lib/constants";

export const BreadCrumb: NextPage = () => {
  const router = useRouter();

  // pathを「/」で分解
  const paths = decodeURI(router.asPath).substring(1).split("/");
  // 末尾がindex.htmlだった場合それは削除
  if (paths.slice(-1)[0] === "index.html" || paths.slice(-1)[0] === "") {
    paths.pop();
  }

  // リンク先アドレスの取得
  const roots = [""];
  for (let i = 0; i < paths.length; i++) {
    roots.push(roots[i] + "/" + paths[i]);
  }

  if (roots.slice(-1)[0] !== "/") {
    // トップページ以外
    return (
      <div className="mx-3 my-4">
        {/* Homeのリンク */}
        <Link href={process.env.NEXT_PUBLIC_URL_END}>Top</Link>
        {paths.map((x, i) => (
          <>
            {/* サブページのリンク */}
            {" > "}
            <Link href={roots[i + 1] + process.env.NEXT_PUBLIC_URL_END} key={i}>
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
