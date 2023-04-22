import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

export const BreadCrumb: NextPage = () => {
  const router = useRouter();

  // pathを「/」で分解
  const paths = decodeURI(router.asPath).substring(1).split("/");

  // リンク先アドレスの取得
  const roots = [""];
  for (let i = 0; i < paths.length; i++) roots.push(roots[i] + "/" + paths[i]);

  return (
    <div className="mx-3 my-4">
      {/* Homeのリンク */}
      <Link href={"/"}>Top</Link>
      {paths.map((x, i) => (
        <>
          {/* サブページのリンク */}
          {" > "}
          <Link href={roots[i + 1]} key={i}>
            {x}
          </Link>
        </>
      ))}
    </div>
  );
};
