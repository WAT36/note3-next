import Link from "next/link";
import { TITLE } from "../lib/constants";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const searchButtonClick = () => {
    const element = document.getElementById(
      "search-textbox"
    ) as HTMLInputElement;

    router.push({
      pathname: "/search",
      query: { query: element.value },
    });
  };

  return (
    <header className="bg-gray-400 text-white z-50">
      <Link
        className="font-bold no-underline text-xl mx-3 text-white"
        href={"" + process.env.NEXT_PUBLIC_URL_END}
      >
        {TITLE}
      </Link>

      {/*検索ボックス */}
      <input
        type="text"
        id="search-textbox"
        className="text-black ml-2"
        placeholder="Search"
      />
      <button
        type="button"
        className="ml-2 border-white rounded-sm"
        onClick={searchButtonClick}
      >
        検索
      </button>

      <span className="float-right">
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href={"/posts" + process.env.NEXT_PUBLIC_URL_END}
        >
          Blog
        </Link>
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href={"/notes" + process.env.NEXT_PUBLIC_URL_END}
        >
          Notes
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
      </span>
    </header>
  );
};

export default Header;
