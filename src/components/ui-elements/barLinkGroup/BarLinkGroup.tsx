import Link from "next/link";

const BarLinkGroup = () => {
  return (
    <>
      <Link
        className="font-bold no-underline text-xl mx-3 text-white"
        href={"/search" + process.env.NEXT_PUBLIC_URL_END}
      >
        Search
      </Link>
      <Link
        className="font-bold no-underline text-xl mx-3 text-white"
        href={"/posts" + process.env.NEXT_PUBLIC_URL_END}
      >
        Blog
      </Link>
      <Link
        className="font-bold no-underline text-xl mx-3 text-white"
        href={"/about" + process.env.NEXT_PUBLIC_URL_END}
      >
        About
      </Link>
      <Link
        className="font-bold no-underline text-xl mx-3 text-white"
        href={"/disclaimer" + process.env.NEXT_PUBLIC_URL_END}
      >
        免責事項
      </Link>
    </>
  );
};

export default BarLinkGroup;
