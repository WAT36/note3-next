type Props = {
  tagName: string;
  onClick?: () => {};
  pointerAble?: boolean;
};

export const Tag = ({ tagName, onClick, pointerAble }: Props) => {
  const className = "postTag" + (pointerAble ? " cursor-pointer" : "");
  return (
    <span className={className} onClick={onClick}>
      {tagName}
    </span>
  );
};
