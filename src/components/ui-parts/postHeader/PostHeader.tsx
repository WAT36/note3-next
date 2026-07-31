import Avatar from "../../ui-elements/avatar/Avatar";
import DateFormatter from "../../ui-elements/date-formatter/DateFormatter";
import CoverImage from "../../ui-elements/cover-image/CoverImage";
import PostTitle from "../../ui-elements/postTitle/PostTitle";
import type Author from "../../../interfaces/author";
import { Tag } from "../../ui-elements/tag/Tag";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
  tag?: string[];
  postNumber?: number;
};

const PostHeader = ({ title, coverImage, date, author, tag, postNumber }: Props) => {
  return (
    <>
      <div className="max-w-2xl mx-auto">
        {postNumber && (
          <div className="mb-2 text-sm text-gray-400">#{postNumber}</div>
        )}
        <PostTitle>{title}</PostTitle>
        <div className="hidden md:block md:mb-12">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        {coverImage && (
          <div className="mb-8 md:mb-16 flex justify-center">
            <CoverImage title={title} src={coverImage} />
          </div>
        )}
        <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
        <div className="">{tag && tag.map((t) => <Tag tagName={t} />)}</div>
      </div>
    </>
  );
};

export default PostHeader;
