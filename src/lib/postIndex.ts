import { format, parseISO } from "date-fns";

// タグ・年月アーカイブ用の集計処理（fsを使わないのでstorybookからも参照可）

export type TagCount = {
  name: string;
  slug: string;
  count: number;
};

export type MonthCount = {
  month: string; // "01"〜"12"
  count: number;
};

export type YearArchive = {
  year: string;
  count: number;
  months: MonthCount[];
};

export type ArchivePost = {
  slug: string;
  title: string;
  date: string;
  tag: string[];
};

export type MonthPosts = {
  month: string;
  posts: ArchivePost[];
};

// タグ名をURLに使える形にする（"CI/CD"の「/」がパス区切りにならないように）
export const tagToSlug = (tag: string) => tag.replace(/\//g, "-");

export const getYear = (date: string) => format(parseISO(date), "yyyy");
export const getMonth = (date: string) => format(parseISO(date), "MM");

// タグごとの記事数を集計（記事数の多い順）
export function countTags(posts: { tag?: string[] }[]): TagCount[] {
  const counts = new Map<string, number>();
  posts.forEach((post) => {
    (post.tag ?? []).forEach((t) => {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    });
  });
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: tagToSlug(name), count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, "ja"));
}

// 年・月ごとの記事数を集計（新しい順）
export function countByYear(posts: { date: string }[]): YearArchive[] {
  const years = new Map<string, Map<string, number>>();
  posts.forEach((post) => {
    const year = getYear(post.date);
    const month = getMonth(post.date);
    const months = years.get(year) ?? new Map<string, number>();
    months.set(month, (months.get(month) ?? 0) + 1);
    years.set(year, months);
  });
  return [...years.entries()]
    .sort(([a], [b]) => (a > b ? -1 : 1))
    .map(([year, months]) => {
      const monthCounts = [...months.entries()]
        .sort(([a], [b]) => (a > b ? -1 : 1))
        .map(([month, count]) => ({ month, count }));
      return {
        year,
        count: monthCounts.reduce((sum, m) => sum + m.count, 0),
        months: monthCounts,
      };
    });
}

// 指定年の記事を月ごとにまとめる（新しい順）
export function groupPostsByMonth(
  posts: ArchivePost[],
  year: string
): MonthPosts[] {
  const months = new Map<string, ArchivePost[]>();
  posts
    .filter((post) => getYear(post.date) === year)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
    .forEach((post) => {
      const month = getMonth(post.date);
      months.set(month, [...(months.get(month) ?? []), post]);
    });
  return [...months.entries()]
    .sort(([a], [b]) => (a > b ? -1 : 1))
    .map(([month, posts]) => ({ month, posts }));
}
