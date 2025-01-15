import PostPreview from "../post-preview/PostPreview";
import type Post from "../../../interfaces/post";
import Pagination from "../../ui-elements/pagination/Pagination";

type Props = {
  posts: Post[];
  pageNum: number;
};

const MoreStories = ({ posts, pageNum }: Props) => {
  return (
    <section>
      <Pagination pageNum={pageNum} postTotal={posts.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
};

export default MoreStories;
