import Link from "next/link";
import { useRecoilState } from "recoil";
import { programmingLanguageState } from "../../../atoms/ProgrammingLanguage";
import { useRouter } from "next/router";
import { LINK_QUERY_PARAM } from "../../../lib/constants";

type Props = {
  slug: string;
  name: string;
  abst?: { [key: string]: string };
};

const ProgrammingNoteLink = ({ slug, name, abst }: Props) => {
  const router = useRouter();
  const { query } = router;
  // ステートとして利用する
  const [programmingLanguage] = useRecoilState(programmingLanguageState);

  return (
    <div className="p-3 border border-double border-green-400">
      <div className="w-2/6 inline-block">
        <Link
          className="underline text-green-400"
          href={{
            pathname: slug + process.env.NEXT_PUBLIC_URL_END,
            query: LINK_QUERY_PARAM(query),
          }}
        >
          {name}
        </Link>
      </div>
      <div className="w-4/6 inline-block">
        <pre>
          <code>{abst && abst[programmingLanguage.language]}</code>
        </pre>
      </div>
    </div>
  );
};

export default ProgrammingNoteLink;
