import Link from "next/link";
import { TITLE } from "../lib/constants";

const Header = () => {
  return (
    <header className="bg-gray-400 text-white mb-2">
      <Link className="font-bold no-underline text-xl mx-3 text-white" href="/">
        {TITLE}
      </Link>
      <span className="float-right">
        {/* <Link className="header-link-home white-text" to="/blog_top"> */}
        Blog
        {/* </Link>
            <Link className="header-link-home white-text" to="/notes"> */}
        Notes
        {/* </Link>
            <Link className="header-link-home white-text" to="/about"> */}
        About
        {/* </Link>
            <Link className="header-link-home white-text" to="/disclaimer"> */}
        免責事項
        {/* </Link> */}
      </span>
    </header>
  );
};

export default Header;
