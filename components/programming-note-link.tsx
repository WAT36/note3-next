import Link from "next/link";

type Props = {
  slug: string;
  name: string;
  abst?: { [key: string]: string[] };
};

const ProgrammingNoteLink = ({ slug, name, abst }: Props) => {
  return (
    <div className="p-3 border border-double border-green-400">
      <div className="w-3/6 inline-block">
        <Link
          className="underline text-green-400"
          href={slug + process.env.NEXT_PUBLIC_URL_END}
        >
          {name}
        </Link>
      </div>
      <div className="w-3/6 inline-block">{abst && abst["java"]}</div>
    </div>
  );
};

export default ProgrammingNoteLink;
