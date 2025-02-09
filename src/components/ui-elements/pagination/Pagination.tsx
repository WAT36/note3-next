type Props = {
  pageNum: number;
  minPageNum: number;
  maxPageNum: number;
};

const Pagination = ({ pageNum, minPageNum, maxPageNum }: Props) => {
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
            href={`/posts${process.env.NEXT_PUBLIC_URL_END}?pageNum=${
              pageNum - 1
            }`}
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
                href={`/posts${process.env.NEXT_PUBLIC_URL_END}?pageNum=${value}`}
              >
                <span>{value}</span>
              </a>
            )}
          </li>
        );
      })}
      {pageNum !== maxPageNum && (
        <li className="ml-3">
          <a
            className="flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black"
            href={`/posts${process.env.NEXT_PUBLIC_URL_END}?pageNum=${
              pageNum + 1
            }`}
          >
            <span>{">>"}</span>
          </a>
        </li>
      )}
    </ul>
  );
};

export default Pagination;
