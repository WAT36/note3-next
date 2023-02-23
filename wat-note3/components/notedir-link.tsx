import Link from "next/link";
import { DIR_NAME } from "../lib/constants";

type Props = {
  slug: string;
};

const NoteDirLink = ({ slug }: Props) => {
  return (
    <div className="my-4">
      <Link className="font-bold text-5xl mx-3 underline" href={slug}>
        🗂{DIR_NAME[slug] || slug}
      </Link>
    </div>
  );
};

export default NoteDirLink;
