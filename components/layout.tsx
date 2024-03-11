import { BreadCrumb } from "./ui-elements/bread-crumb/BreadCrumb";
import Footer from "./ui-elements/footer/Footer";
import Header from "./header";
import { Meta } from "./ui-elements/meta/Meta";
import ProgrammingLanguageSelector from "./programming-language-selector";
import SubHeader from "./subheader";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  canChangeProgrammingLanguage?: boolean;
};

const Layout = ({ preview, children, canChangeProgrammingLanguage }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <div className="min-h-screen">
        <SubHeader
          canChangeProgrammingLanguage={canChangeProgrammingLanguage}
        />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
