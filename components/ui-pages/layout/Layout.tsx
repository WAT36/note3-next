import Footer from "../../ui-elements/footer/Footer";
import Header from "../../ui-parts/header/Header";
import { Meta } from "../../ui-elements/meta/Meta";
import SubHeader from "../../ui-parts/subheader/SubHeader";

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
