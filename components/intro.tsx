import { CMS_NAME } from "../lib/constants";

type Props = {
  title: string;
};

const Intro = ({ title }: Props) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}
      </h1>
    </section>
  );
};

export default Intro;
