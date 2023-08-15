import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { Link, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";

const LoadingLink = ({ href, path, children, ...props }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteComplete);
    };
  }, [router]);

  //set linkcolor to blue
  const linkColor = path === href ? "blue.500" : "gray.500";

  return (
    <>
      <NextLink href={href} passHref scroll={false}>
        <Link
          color={linkColor}
          target="_blank"
          fontSize="12"
          onClick={handleClick}
          {...props}
        >
          {children}
        </Link>
      </NextLink>
      {loading && (
        <div
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 9999,
          }}
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default LoadingLink;
