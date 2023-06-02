import Link from "next/link";
import { DIR_NAME } from "../lib/constants";

type Props = {
  slug: string;
};

const NoteDirLink = ({ slug }: Props) => {
  const pageName = slug.split("/").slice(-1)[0];
  return (
    <div className="my-4">
      <Link
        className="font-bold text-5xl mx-3 underline"
        href={slug + process.env.NEXT_PUBLIC_URL_END}
      >
        🗂{DIR_NAME[pageName] || pageName}
      </Link>
    </div>
  );
};

export default NoteDirLink;
