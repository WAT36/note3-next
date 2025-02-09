import Link from "next/link";
import { TITLE } from "../../../lib/constants";
import BarLinkGroup from "../../ui-elements/barLinkGroup/BarLinkGroup";

const Header = () => {
  return (
    <header className="bg-gray-400 text-white z-50 dark:bg-slate-900">
      <Link
        className="font-bold no-underline text-xl mx-3 text-white"
        href={"" + process.env.NEXT_PUBLIC_URL_END}
      >
        {TITLE}
      </Link>

      <span className="float-right hidden lg:block">
        <BarLinkGroup />
      </span>
    </header>
  );
};

export default Header;
