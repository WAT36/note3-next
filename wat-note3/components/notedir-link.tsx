import Link from "next/link";

type Props = {
  slug: string;
  name: string;
};

const NoteDirLink = ({ slug, name }: Props) => {
  return (
    <div className="my-4">
      <Link className="font-bold text-5xl mx-3 underline" href={slug}>
        🗂{name}
      </Link>
    </div>
  );
};

export default NoteDirLink;
