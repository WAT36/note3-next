import { useRouter } from "next/router";

export const usePath = () => {
  const router = useRouter();
  return decodeURI(router.asPath);
};
