import { useRouter } from "next/router";

export const getPath = () => {
  const router = useRouter();
  return decodeURI(router.asPath);
};
