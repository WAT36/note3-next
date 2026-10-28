import Head from "next/head";
import Link from "next/link";
import Layout from "../../../components/ui-pages/layout/Layout";
import Container from "../../../components/ui-elements/container/Container";
import Intro from "../../../components/ui-elements/intro/Intro";
import { Bio } from "../../../components/ui-elements/bio/Bio";
import { ADMINISTRATOR, TITLE } from "../../../lib/constants";
import { getPostSidebarData } from "../../../lib/fileSystem";
import type { YearArchive } from "../../../lib/postIndex";

type Props = {
  years: YearArchive[];
};

export default function ArchiveIndex({ years }: Props) {
  return (
    <Layout>
      <Head>
        <title>Archive | {TITLE}</title>
      </Head>
      <Container>
        <Intro title={"Archive."} />
        <Bio admin={ADMINISTRATOR} />
        <div className="mb-32">
          {years.map((y) => {
            const href = `/posts/archive/${y.year}${process.env.NEXT_PUBLIC_URL_END}`;
            return (
              <section
                key={y.year}
                className="flex flex-col gap-2 border-t-2 border-black py-5 dark:border-white md:flex-row md:gap-8"
              >
                <h2 className="text-3xl font-bold tracking-tight md:w-40 md:shrink-0">
                  <Link href={href} className="no-underline">
                    {y.year}
                  </Link>
                  <span className="ml-2 text-base font-normal text-gray-600 dark:text-gray-400">
                    ({y.count})
                  </span>
                </h2>
                <ul className="flex flex-wrap gap-x-6 gap-y-1 text-lg">
                  {y.months.map((m) => (
                    <li key={m.month}>
                      <Link
                        href={`${href}#${y.year}-${m.month}`}
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
              </section>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { years } = getPostSidebarData();
  return {
    props: { years },
  };
};
