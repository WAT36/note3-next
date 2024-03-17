import { BreadCrumb } from "./bread-crumb";
import ProgrammingLanguageSelector from "./ui-elements/programming-language-selector/ProgrammingLanguageSelector";

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
