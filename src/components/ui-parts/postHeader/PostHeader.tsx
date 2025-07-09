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
};

const PostHeader = ({ title, coverImage, date, author, tag }: Props) => {
  console.log("note tags:", JSON.stringify(tag));
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      {coverImage && (
        <div className="mb-8 md:mb-16 flex justify-center">
          <CoverImage title={title} src={coverImage} />
        </div>
      )}
      <div className="max-w-2xl mx-auto">
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
