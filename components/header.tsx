import Link from "next/link";
import { TITLE } from "../lib/constants";

const Header = () => {
  return (
    <header className="bg-gray-400 text-white z-50">
      <Link
        className="font-bold no-underline text-xl mx-3 text-white"
        href="/index.html"
      >
        {TITLE}
      </Link>
      <span className="float-right">
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href="/posts/index.html"
        >
          Blog
        </Link>
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href="/notes/index.html"
        >
          Notes
        </Link>
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href="/about/index.html"
        >
          About
        </Link>
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href="/disclaimer/index.html"
        >
          免責事項
        </Link>
      </span>
    </header>
  );
};

export default Header;
