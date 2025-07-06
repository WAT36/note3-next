type Props = {
  tagName: string;
};

export const Tag = ({ tagName }: Props) => {
  return <span className="postTag">{tagName}</span>;
};
