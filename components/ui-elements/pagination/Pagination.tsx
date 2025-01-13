const Pagination = () => {
  return (
    <ul className="flex items-center flex-row justify-center my-2">
      <li className="ml-3">
        <span>{"<<"}</span>
      </li>
      <li className="ml-3">
        <a
          className="flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black"
          href="/pages/1/"
        >
          <span>1</span>
        </a>
      </li>
      <li className="ml-3">
        {/**isActive hover時の操作がまだ*/}
        <a
          className="flex justify-center items-center flex-wrap w-11 h-11 bg-black border-solid border-2 border-black font-bold transition-all text-white pointer-events-none"
          href="/pages/2/"
        >
          <span>2</span>
        </a>
      </li>
      <li className="ml-3">
        <a
          className="flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black"
          href="/pages/3/"
        >
          <span>3</span>
        </a>
      </li>
      <li className="ml-3">
        <a
          className="flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black"
          href="/pages/4/"
        >
          <span>4</span>
        </a>
      </li>
      <li className="ml-3">
        <a
          className="flex justify-center items-center flex-wrap w-11 h-11 bg-white border-solid border-2 border-black font-bold transition-all text-black"
          href="/pages/5/"
        >
          <span>5</span>
        </a>
      </li>
      <li className="ml-3">
        <span>{">>"}</span>
      </li>
    </ul>
  );
};

export default Pagination;
