import Footer from "../../ui-elements/footer/Footer";
import Header from "../../ui-parts/header/Header";
import { Meta } from "../../ui-elements/meta/Meta";
import SubHeader from "../../ui-parts/subheader/SubHeader";
import { CSSProperties } from "react";
import { ADSENSE_CLIENT_ID, GA_ID, GTAG_ID } from "../../../lib/gtag";
import { GoogleAnalytics } from "@next/third-parties/google";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
  canChangeProgrammingLanguage?: boolean;
};

const gtagNoscriptStyle: CSSProperties = {
  display: "none",
  visibility: "hidden",
};
const gtagUrl = "https://www.googletagmanager.com/ns.html?id=" + GTAG_ID;
const adsenseUrl =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
  ADSENSE_CLIENT_ID;

const Layout = ({ preview, children, canChangeProgrammingLanguage }: Props) => {
  return (
    <>
      <Meta />
      {process.env.NEXT_PUBLIC_APP_ENV === "prd" ? (
        <>
          {/* <!-- Google Tag Manager (noscript) --> */}
          <noscript>
            <iframe
              src={gtagUrl}
              height="0"
              width="0"
              style={gtagNoscriptStyle}
            ></iframe>
          </noscript>
          {/* <!-- End Google Tag Manager (noscript) --> */}
          {/* <!-- Google Adsense--> */}
          <script async src={adsenseUrl} crossOrigin="anonymous"></script>
          {/* <!-- End Google Adsense--> */}
        </>
      ) : (
        <></>
      )}
      <Header />
      <div className="min-h-screen">
        <SubHeader
          canChangeProgrammingLanguage={canChangeProgrammingLanguage}
        />
        {process.env.NEXT_PUBLIC_APP_ENV === "prd" && GA_ID && (
          <GoogleAnalytics gaId={GA_ID} />
        )}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
