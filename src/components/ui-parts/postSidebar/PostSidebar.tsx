import Link from "next/link";
import { Tag } from "../../ui-elements/tag/Tag";
import type { TagCount, YearArchive } from "../../../lib/postIndex";

type Props = {
  tags: TagCount[];
  years: YearArchive[];
  currentTag?: string;
  currentYear?: string;
};

const SidebarContent = ({ tags, years, currentTag, currentYear }: Props) => {
  // 開いておく年（表示中の年、なければ最新年）
  const openYear = currentYear ?? years[0]?.year;
  return (
    <>
      <h2 className="mb-4 text-2xl">{"タグ"}</h2>
      <div className="mb-10 flex flex-wrap">
        {tags.map((t) => (
          <Tag
            key={t.name}
            tagName={t.name}
            count={t.count}
            href={`/posts/tags/${t.slug}${process.env.NEXT_PUBLIC_URL_END}`}
            isCurrent={t.name === currentTag}
            small={true}
          />
        ))}
      </div>
      <h2 className="mb-3 text-2xl">{"アーカイブ"}</h2>
      <ul>
        {years.map((y) => (
          <li
            key={y.year}
            className="border-b border-gray-200 dark:border-gray-700"
          >
            <details open={y.year === openYear}>
              <summary className="cursor-pointer py-2 text-lg">
                <Link
                  href={`/posts/archive/${y.year}${process.env.NEXT_PUBLIC_URL_END}`}
                  className="font-bold no-underline"
                >
                  {y.year}
                </Link>
                <span className="ml-2 text-base text-gray-600 dark:text-gray-400">
                  ({y.count})
                </span>
              </summary>
              <ul className="mb-2 pl-6">
                {y.months.map((m) => (
                  <li key={m.month} className="py-1">
                    <Link
                      href={`/posts/archive/${y.year}${process.env.NEXT_PUBLIC_URL_END}#${y.year}-${m.month}`}
                      className="underline"
                    >
                      {`${+m.month}月`}
                    </Link>
                    <span className="ml-1 text-gray-600 dark:text-gray-400">
                      ({m.count})
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
};

// PCでは右サイドバー、スマホでは記事一覧の上の折りたたみパネルとして表示
const PostSidebar = (props: Props) => {
  return (
    <aside className="lg:w-72 lg:shrink-0">
      <details className="mb-6 border-2 border-black dark:border-white lg:hidden">
        <summary className="cursor-pointer bg-black px-4 py-3 font-bold text-white dark:bg-white dark:text-black">
          {"タグ・アーカイブから探す"}
        </summary>
        <div className="p-4">
          <SidebarContent {...props} />
        </div>
      </details>
      <div className="hidden border-l border-black pl-4 pt-4 dark:border-white lg:block">
        <SidebarContent {...props} />
      </div>
    </aside>
  );
};

export default PostSidebar;
