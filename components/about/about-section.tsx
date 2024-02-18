import H2 from "../headline";

type Props = {
  title: string;
  description: React.ReactNode;
};

export default function AboutSection({ title, description }: Props) {
  return (
    <>
      <div>
        <H2>{title}</H2>
        {description}
      </div>
    </>
  );
}
