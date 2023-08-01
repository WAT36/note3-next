import Link from "next/link";

type Props = {
  slug: string;
  name: string;
};

const NoteLink = ({ slug, name }: Props) => {
  return (
    <div className="my-4">
      <Link
        className="font-bold text-5xl mx-3 underline"
        href={slug + process.env.NEXT_PUBLIC_URL_END}
      >
        {name}
      </Link>
    </div>
  );
};

export default NoteLink;
