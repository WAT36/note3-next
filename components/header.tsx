import Link from "next/link";
import { TITLE } from "../lib/constants";

const Header = () => {
  return (
    <header className="bg-gray-400 text-white mb-2">
      <Link className="font-bold no-underline text-xl mx-3 text-white" href="/">
        {TITLE}
      </Link>
      <span className="float-right">
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href="/posts/"
        >
          Blog
        </Link>
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href="/notes"
        >
          Notes
        </Link>
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href="/about"
        >
          About
        </Link>
        <Link
          className="font-bold no-underline text-xl mx-3 text-white"
          href="/disclaimer"
        >
          免責事項
        </Link>
      </span>
    </header>
  );
};

export default Header;
