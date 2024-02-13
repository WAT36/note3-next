import H2 from "../headline";

type Props = {
  title: string;
  href?: string;
  description?: string;
};

export default function AboutList({ title, href, description }: Props) {
  return (
    <>
      <ul className="list-disc">
        <li>
          {href ? (
            <a href={href} className="underline">
              {title}
            </a>
          ) : (
            <p>{title}</p>
          )}
        </li>
      </ul>
      <p>{description}</p>
    </>
  );
}
