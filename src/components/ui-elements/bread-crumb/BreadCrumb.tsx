import { NextPage } from "next";
import Link from "next/link";
import { DIR_NAME } from "../../../lib/constants";
import { getPath } from "../../../lib/path";

type Props = {
  getNowPath: () => string;
};

export const BreadCrumb: NextPage = ({ getNowPath = getPath }: Props) => {
  // pathを「/」で分解
  const paths = getNowPath().substring(1).split("/");
  // 末尾がindex.html・クエリパラメータ類だった場合それは削除
  if (
    paths.slice(-1)[0].startsWith("index.html") ||
    paths.slice(-1)[0] === "" ||
    paths.slice(-1)[0].startsWith("#") ||
    paths.slice(-1)[0].startsWith("?")
  ) {
    paths.pop();
  }

  // クエリパラメータ取得・削除
  const queryParam = paths.slice(-1)[0].includes("?")
    ? paths.slice(-1)[0].substring(paths.slice(-1)[0].indexOf("?"))
    : "";
  if (paths.slice(-1)[0].includes("?")) {
    paths[paths.length - 1] = paths
      .slice(-1)[0]
      .substring(0, paths.slice(-1)[0].indexOf("?"));
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
                (roots[i + 1].includes("/notes") ? queryParam : "") // /notes以下のページにいる場合はクエリパラメータ保持
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
