import cn from "classnames";
import Link from "next/link";
import { ALT_IMAGE } from "../../../lib/constants";

type Props = {
  title: string;
  src?: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <img
      src={src || ALT_IMAGE}
      className={cn("shadow-sm w-auto mx-auto h-full object-contain", {
        "hover:shadow-lg transition-shadow duration-200 dark:bg-white": slug,
      })}
    />
  );
  return (
    <div className="sm:mr-2 h-48 w-48 shrink-0">
      {src && slug ? (
        <Link
          as={`/posts${slug}${process.env.NEXT_PUBLIC_URL_END}`}
          href={`/posts[slug]${process.env.NEXT_PUBLIC_URL_END}`}
          aria-label={title}
        >
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
