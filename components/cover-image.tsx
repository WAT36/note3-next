import cn from "classnames";
import Link from "next/link";
import { ALT_IMAGE } from "../lib/constants";

type Props = {
  title: string;
  src: string | null;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = src ? (
    <img
      src={src}
      className={cn("shadow-sm max-h-full w-auto mx-auto", {
        "hover:shadow-lg transition-shadow duration-200": slug,
      })}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = ALT_IMAGE;
      }}
      width={1300}
      height={300}
    />
  ) : (
    <></>
  );
  return (
    <div className="sm:mx-0 h-48">
      {src && slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
