import Layout from "../components/layouts/main";
import Fonts from "../components/fonts";
import { AnimatePresence } from "framer-motion";
import Chakra from "../components/chakra";
import { ApolloProvider } from "@apollo/client";
import { getApolloClient } from "../lib/wordpress";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}

function Website({ Component, pageProps, router }) {
  const client = getApolloClient();

  return (
    <Chakra>
      <ApolloProvider client={client}>
        <Fonts />
        <Layout router={router}>
          <AnimatePresence
            mode="wait"
            initial={true}
          >
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Layout>
      </ApolloProvider>
    </Chakra>
  );
}

export default Website;
