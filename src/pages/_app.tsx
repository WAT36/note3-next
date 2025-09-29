import { AppProps } from "next/app";
import "highlight.js/styles/github-dark.css";
import "../styles/index.css";
import { RecoilRoot, RecoilEnv } from "recoil";
import Script from "next/script";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Script
        src="https://cdn.jsdelivr.net/npm/jsxgraph/distrib/jsxgraphcore.js"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
