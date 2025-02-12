import PostPreview from "../post-preview/PostPreview";
import type Post from "../../../interfaces/post";
import Pagination from "../../ui-elements/pagination/Pagination";

type Props = {
  posts: Post[];
  pageNum: number;
};

const MoreStories = ({ posts, pageNum }: Props) => {
  // 表示する最大・最小ページ番号
  let minPageNum = pageNum - 2 > 0 ? pageNum - 2 : 1;
  let maxPageNum =
    minPageNum === 1
      ? Math.min(5, Math.ceil(posts.length / 5))
      : pageNum + 2 < Math.ceil(posts.length / 5)
      ? pageNum + 2
      : Math.ceil(posts.length / 5);
  if (maxPageNum - minPageNum < 5) {
    minPageNum = 1;
  }
  const pageNumAdjusted =
    minPageNum <= pageNum && pageNum <= maxPageNum ? pageNum : 1;

  return (
    <section>
      <Pagination
        pageNum={pageNumAdjusted}
        minPageNum={minPageNum}
        maxPageNum={maxPageNum}
      />
      <div className="mb-32">
        {posts
          .slice((pageNumAdjusted - 1) * 5, pageNumAdjusted * 5)
          .map((post) => (
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
      <Pagination
        pageNum={pageNumAdjusted}
        minPageNum={minPageNum}
        maxPageNum={maxPageNum}
      />
    </section>
  );
};

export default MoreStories;
