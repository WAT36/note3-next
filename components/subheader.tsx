import { BreadCrumb } from "./bread-crumb";
import ProgrammingLanguageSelector from "./programming-language-selector";

type Props = { canChangeProgrammingLanguage?: boolean };

const SubHeader = ({ canChangeProgrammingLanguage }: Props) => {
  return (
    <div>
      <BreadCrumb />
      {canChangeProgrammingLanguage ? <ProgrammingLanguageSelector /> : <></>}
    </div>
  );
};

export default SubHeader;
