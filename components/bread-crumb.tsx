import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { DIR_NAME } from "../lib/constants";

export const BreadCrumb: NextPage = () => {
  const router = useRouter();

  // pathを「/」で分解
  const paths = decodeURI(router.asPath).substring(1).split("/");

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
        <Link href={"/index.html"}>Top</Link>
        {paths.map((x, i) => (
          <>
            {/* サブページのリンク */}
            {" > "}
            <Link href={roots[i + 1] + "/index.html"} key={i}>
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
