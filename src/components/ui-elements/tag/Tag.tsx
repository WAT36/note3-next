import Link from "next/link";

type Props = {
  tagName: string;
  onClick?: () => {};
  pointerAble?: boolean;
  href?: string;
  count?: number;
  isCurrent?: boolean;
  small?: boolean;
};

export const Tag = ({
  tagName,
  onClick,
  pointerAble,
  href,
  count,
  isCurrent,
  small,
}: Props) => {
  const className =
    "postTag" +
    (pointerAble ? " cursor-pointer" : "") +
    (isCurrent ? " postTagCurrent" : "") +
    (small ? " postTagSmall" : "");
  const content = (
    <>
      {tagName}
      {count !== undefined && (
        <span className="ml-2 text-xs opacity-70">{count}</span>
      )}
    </>
  );

  // href指定時はタグ別記事一覧へのリンクにする
  if (href) {
    return (
      <Link
        href={href}
        className={className + " no-underline"}
        aria-current={isCurrent ? "page" : undefined}
      >
        {content}
      </Link>
    );
  }
  return (
    <span className={className} onClick={onClick}>
      {content}
    </span>
  );
};
