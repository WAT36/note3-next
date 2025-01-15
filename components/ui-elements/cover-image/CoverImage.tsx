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
      className={cn("shadow-sm max-h-full w-auto mx-auto", {
        "hover:shadow-lg transition-shadow duration-200 dark:bg-white": slug,
      })}
      width={1300}
      height={300}
    />
  );
  return (
    <div className="sm:mx-0 h-48">
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
