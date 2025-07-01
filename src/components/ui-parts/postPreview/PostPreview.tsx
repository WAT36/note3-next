import Avatar from "../../ui-elements/avatar/Avatar";
import DateFormatter from "../../ui-elements/date-formatter/DateFormatter";
import CoverImage from "../../ui-elements/cover-image/CoverImage";
import Link from "next/link";
import type Author from "../../../interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <div className="my-10 flex flex-col items-center md:flex-row md:items-start">
      <CoverImage slug={slug} title={title} src={coverImage} />
      <div className="mt-6 md:mt-0 md:ml-6 w-full md:w-auto text-center md:text-left flex flex-col items-center md:items-start">
        <h3 className="text-3xl mb-3 leading-snug">
          <Link
            as={`/posts/${slug}${process.env.NEXT_PUBLIC_URL_END}`}
            href={`/posts/[slug]${process.env.NEXT_PUBLIC_URL_END}`}
            className="hover:underline"
          >
            {title}
          </Link>
        </h3>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </div>
  );
};

export default PostPreview;
