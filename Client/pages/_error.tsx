import { useEffect } from "react";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.back();
  }, []);

  return null;
};

export default Custom404;
