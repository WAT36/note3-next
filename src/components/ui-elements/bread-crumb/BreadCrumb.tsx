import { NextPage } from "next";
import Link from "next/link";
import { DIR_NAME } from "../../../lib/constants";
import { usePath } from "../../../hooks/usePath";

type Props = {
  getNowPath: () => string;
};

export const BreadCrumb: NextPage = ({ getNowPath = usePath }: Props) => {
  // ハッシュを削除
  const nowPath = getNowPath().split("#")[0];
  // クエリパラメータ取得・削除(「/」で分解する前に行わないと末尾の「/?xxx」が消えてしまう)
  const queryIndex = nowPath.indexOf("?");
  const queryParam = queryIndex >= 0 ? nowPath.substring(queryIndex) : "";
  const pathname = queryIndex >= 0 ? nowPath.substring(0, queryIndex) : nowPath;

  // pathを「/」で分解
  const paths = pathname.substring(1).split("/");
  // 末尾がindex.html・空文字だった場合それは削除
  if (
    paths.slice(-1)[0].startsWith("index.html") ||
    paths.slice(-1)[0] === ""
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
