import Link from "next/link";
import { useRouter } from "next/router";
import { LINK_QUERY_PARAM } from "../../../lib/constants";

type Props = {
  slug: string;
  name: string;
};

const NoteLink = ({ slug, name }: Props) => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className="my-4">
      <Link
        className="font-bold text-5xl mx-3 underline"
        href={{
          pathname: slug + process.env.NEXT_PUBLIC_URL_END,
          query: LINK_QUERY_PARAM(query),
        }}
      >
        {name}
      </Link>
    </div>
  );
};

export default NoteLink;
