import { AppProps } from "next/app";
import "../styles/index.css";
import { RecoilRoot } from "recoil";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
