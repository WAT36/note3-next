import { useRecoilState, useSetRecoilState } from "recoil";
import { BreadCrumb } from "./bread-crumb";
import Footer from "./footer";
import Header from "./header";
import Meta from "./meta";
import { programmingLanguageState } from "../atoms/ProgrammingLanguage";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  canChangeProgrammingLanguage?: boolean;
};

const Layout = ({ preview, children, canChangeProgrammingLanguage }: Props) => {
  // Recoilの Atoms を呼び出して定義
  const setProgrammingLanguage = useSetRecoilState(programmingLanguageState);
  // ステートとして利用する
  const [programmingLanguage] = useRecoilState(programmingLanguageState);

  return (
    <>
      <Meta />
      <Header />
      <div className="min-h-screen">
        <div>
          <BreadCrumb />
          {canChangeProgrammingLanguage ? (
            <div className="inline-block float-right mx-3 my-4">
              <select
                name="programmingLanguage"
                onChange={(e) => {
                  setProgrammingLanguage({ language: e.target.value });
                }}
              >
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">Javascript</option>
              </select>
            </div>
          ) : (
            <></>
          )}
        </div>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
