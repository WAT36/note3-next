import { BreadCrumb } from "./ui-elements/bread-crumb/BreadCrumb";
import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";
import ProgrammingTag from "./ui-elements/programming-tag/ProgrammingTag";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  programmingTag?: string[];
};

const Layout = ({ preview, children, programmingTag }: Props) => {
  return (
    <>
      <Meta />
      <Header />
      <div className="min-h-screen">
        {programmingTag && (
          <div className="programming-language-tagbar">
            {programmingTag &&
              programmingTag.map((lang, index) => {
                return <ProgrammingTag lang={lang} />;
              })}
          </div>
        )}
        <BreadCrumb />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
