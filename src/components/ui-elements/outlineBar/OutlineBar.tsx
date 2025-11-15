import { TagData } from "../../../interfaces/html";

type Props = {
  headings: TagData[];
};

export const OutlineBar = ({ headings }: Props) => {
  return (
    <div className="hidden lg:block w-72 h-screen sticky top-0 border-l border-black dark:border-white mb-32 pl-4">
      <div className="w-full pt-4 sticky top-0">
        <h1 className="mb-4 text-2xl">{"目次"}</h1>
        <ul>
          {headings.map((value) => (
            <li className="m-2">
              {"　".repeat(+value.tag[1] - 1)}
              <a className="dark:underline" href={"#" + value.id}>
                {value.content}
                <br />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
