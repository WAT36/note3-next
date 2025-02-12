import Link from "next/link";
import { DIR_NAME, LINK_QUERY_PARAM } from "../../../lib/constants";
import { useRouter } from "next/router";

type Props = {
  slug: string;
};

const NoteDirLink = ({ slug }: Props) => {
  const router = useRouter();
  const { query } = router;

  const pageName = slug.split("/").slice(-1)[0];
  return (
    <div className="my-4">
      <Link
        className="font-bold text-5xl mx-3 underline"
        href={{
          pathname: slug + process.env.NEXT_PUBLIC_URL_END,
          query: LINK_QUERY_PARAM(query),
        }}
      >
        🗂{DIR_NAME[pageName] || pageName}
      </Link>
    </div>
  );
};

export default NoteDirLink;
