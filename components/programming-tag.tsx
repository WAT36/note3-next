type Props = {
  lang: string;
};

export const ProgrammingTag = ({ lang }: Props) => {
  return (
    <span className="right-placed">
      <input
        type="radio"
        className="plang_radio"
        name="programming_language"
        id={lang}
      />
      <label htmlFor={lang} className="programming-language-tag">
        {lang}
      </label>
    </span>
  );
};
