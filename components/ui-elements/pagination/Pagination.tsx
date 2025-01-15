type Props = {
  pageNum: number;
  postTotal: number;
};

const Pagination = ({ pageNum, postTotal }: Props) => {
  // 表示する最大・最小ページ番号
  let minPageNum = pageNum - 2 > 0 ? pageNum - 2 : 1;
  let maxPageNum =
    minPageNum === 1
      ? Math.min(5, Math.ceil(postTotal / 5))
      : pageNum + 2 < Math.ceil(postTotal / 5)
      ? pageNum + 2
      : Math.ceil(postTotal / 5);
  if (maxPageNum - minPageNum < 5) {
    minPageNum = 1;
  }
  const displayPage = [];
  for (let i = minPageNum; i <= maxPageNum; i++) {
    displayPage.push(i);
  }

  return (
    <ul className="flex items-center flex-row justify-center my-2">
      {pageNum !== 1 && (
        <li className="ml-3">
          <a
            className="flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black"
            href={`/posts/?pageNum=${pageNum - 1}`}
          >
            <span>{"<<"}</span>
          </a>
        </li>
      )}
      {displayPage.map((value) => {
        return (
          <li className="ml-3">
            {pageNum === value ? (
              <span
                className={
                  "flex justify-center items-center flex-wrap w-11 h-11 border-solid border-2 border-black font-bold transition-all bg-black text-white "
                }
              >
                {value}
              </span>
            ) : (
              <a
                className={
                  "flex justify-center items-center flex-wrap w-11 h-11 border-solid border-2 border-black font-bold transition-all bg-white text-black "
                }
                href={`/posts/?pageNum=${value}`}
              >
                <span>{value}</span>
              </a>
            )}
          </li>
        );
      })}
      {pageNum !== Math.ceil(postTotal / 5) && (
        <li className="ml-3">
          <a
            className="flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black"
            href={`/posts/?pageNum=${pageNum + 1}`}
          >
            <span>{">>"}</span>
          </a>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
